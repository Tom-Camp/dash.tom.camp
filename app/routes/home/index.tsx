import React from "react";
import type { Route } from "./+types/index";
import { Link } from "react-router";
import type { CoopSensor, GardenDevice, GardenSensor, GerminatorSensor } from "~/types";
import { formatCoopDate, coopDateFormatter } from "~/utils/dateFormatter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Data Tom.Camp" },
    { name: "description", content: "Random data from random sensors." },
  ];
}

export async function loader(_: Route.LoaderArgs): Promise<any> {
  const gardenDeviceIds = (import.meta.env.VITE_GARDEN_NET_DEVICE_IDS ?? "")
    .split(",")
    .map((id: string) => id.trim())
    .filter(Boolean);

  const [germinatorRes, nulayRes, ...gardenResults] = await Promise.allSettled([
    fetch(`${import.meta.env.VITE_API_BASE_URL}/data/device/${import.meta.env.VITE_GERMINATOR_DEVICE_ID}?limit=1`),
    fetch(`${import.meta.env.VITE_API_BASE_URL}/data/device/${import.meta.env.VITE_NULAY_DEVICE_ID}?limit=1`),
    ...gardenDeviceIds.map((id: string) =>
      fetch(`${import.meta.env.VITE_API_BASE_URL}/data/device/${id}?limit=1`)
    ),
  ]);

  let germinator: GerminatorSensor | null = null;
  let nulay: CoopSensor | null = null;

  if (germinatorRes.status === "fulfilled" && germinatorRes.value.ok) {
    const json = await germinatorRes.value.json();
    germinator = Array.isArray(json) && json.length > 0 ? json[0] : null;
  }

  if (nulayRes.status === "fulfilled" && nulayRes.value.ok) {
    const json = await nulayRes.value.json();
    nulay = Array.isArray(json) && json.length > 0 ? json[0] : null;
  }

  const deviceInfoResults = await Promise.allSettled(
    gardenDeviceIds.map((id: string) =>
      fetch(`${import.meta.env.VITE_API_BASE_URL}/devices/${id}`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)
    )
  );

  const gardenLatest: { deviceId: string; name: string; reading: GardenSensor | null }[] = await Promise.all(
    gardenResults.map(async (result, i) => {
      const deviceInfo: GardenDevice | null =
        deviceInfoResults[i].status === "fulfilled" ? deviceInfoResults[i].value : null;
      const name = deviceInfo?.name ?? `Sensor ${i + 1}`;
      if (result.status === "fulfilled" && result.value.ok) {
        const json = await result.value.json();
        return {
          deviceId: gardenDeviceIds[i],
          name,
          reading: Array.isArray(json) && json.length > 0 ? json[0] : null,
        };
      }
      return { deviceId: gardenDeviceIds[i], name, reading: null };
    })
  );

  return { germinator, nulay, gardenLatest };
}

type StatProps = {
  label: string;
  value: string;
  sub?: string;
  color: string;
};

function Stat({ label, value, sub, color }: StatProps) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-3">
      <div className="flex items-center gap-1.5 mb-1">
        <span className={`h-2 w-2 flex-shrink-0 rounded-full ${color}`} />
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-base font-semibold text-slate-800">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { germinator, nulay, gardenLatest } = loaderData;

  const gardenHasDevices = Array.isArray(gardenLatest) && gardenLatest.length > 0;
  const gardenMostRecent = gardenHasDevices
    ? gardenLatest.reduce(
        (latest: { deviceId: string; reading: any } | null, d: { deviceId: string; reading: any }) => {
          if (!d.reading) return latest;
          if (!latest?.reading) return d;
          return new Date(d.reading.created_date) > new Date(latest.reading.created_date) ? d : latest;
        },
        null
      )
    : null;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Link to="/germinator" className="block group">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-shadow group-hover:shadow-md">
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">🌱 Germinator</h2>
              {germinator && (
                <p className="text-xs text-slate-400 mt-0.5">
                  Last reading: {formatCoopDate(germinator.created_date)}
                </p>
              )}
            </div>
            <span className="text-slate-400 text-sm group-hover:text-white transition-colors">View →</span>
          </div>
          <div className="px-4 py-4">
            {germinator ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Stat
                  label="Lights"
                  value={germinator.data.lights ? "On" : "Off"}
                  color={germinator.data.lights ? "bg-yellow-300" : "bg-slate-400"}
                />
                {germinator.data.air.temperature && (
                  <Stat
                    label="Air Temp"
                    value={`${germinator.data.air.temperature.actual.toFixed(1)}°`}
                    sub={`target ${germinator.data.air.temperature.target[0]}–${germinator.data.air.temperature.target[1]}°`}
                    color="bg-amber-400"
                  />
                )}
                {germinator.data.air.humidity && (
                  <Stat
                    label="Humidity"
                    value={`${germinator.data.air.humidity.actual.toFixed(0)}%`}
                    sub={`target ${germinator.data.air.humidity.target[0]}–${germinator.data.air.humidity.target[1]}%`}
                    color="bg-sky-400"
                  />
                )}
                {germinator.data.soil.soil_temp !== undefined && (
                  <Stat
                    label="Soil Temp"
                    value={`${germinator.data.soil.soil_temp.toFixed(1)}°`}
                    color="bg-violet-400"
                  />
                )}
                {germinator.data.soil.moisture !== undefined && (
                  <Stat
                    label="Moisture"
                    value={String(germinator.data.soil.moisture)}
                    color="bg-emerald-400"
                  />
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No data available</p>
            )}
          </div>
        </div>
      </Link>

      <Link to="/nulay" className="block group">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-shadow group-hover:shadow-md">
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">🐔 NuLay Inn</h2>
              {nulay && (
                <p className="text-xs text-slate-400 mt-0.5">
                  Last reading:{" "}
                  {coopDateFormatter.format(
                    new Date(nulay.created_date.endsWith("Z") ? nulay.created_date : nulay.created_date + "Z")
                  )}
                </p>
              )}
            </div>
            <span className="text-slate-400 text-sm group-hover:text-white transition-colors">View →</span>
          </div>
          <div className="px-4 py-4">
            {nulay ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Stat
                  label="Battery"
                  value={`${nulay.data.battery.toFixed(1)} V`}
                  color="bg-emerald-400"
                />
                <Stat
                  label="Outside Temp"
                  value={`${nulay.data.outside.air_temp.toFixed(1)}°`}
                  color="bg-sky-400"
                />
                <Stat
                  label="Outside Humidity"
                  value={`${nulay.data.outside.humidity.toFixed(0)}%`}
                  color="bg-sky-300"
                />
                <Stat
                  label="Coop Temp"
                  value={`${nulay.data.coop.coop_temp.toFixed(1)}°`}
                  color="bg-amber-400"
                />
                <Stat
                  label="Coop Humidity"
                  value={`${nulay.data.coop.coop_humidity.toFixed(0)}%`}
                  color="bg-amber-300"
                />
                <Stat
                  label="Gas (VOC)"
                  value={`${nulay.data.coop.coop_gas.toFixed(0)} ppm`}
                  color="bg-rose-400"
                />
              </div>
            ) : (
              <p className="text-sm text-slate-400">No data available</p>
            )}
          </div>
        </div>
      </Link>
      {gardenHasDevices && (
        <Link to="/garden-net" className="block group">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-shadow group-hover:shadow-md">
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">🌿 Garden.net</h2>
                {gardenMostRecent?.reading && (
                  <p className="text-xs text-slate-400 mt-0.5">
                    Last reading: {formatCoopDate(gardenMostRecent.reading.created_date)}
                  </p>
                )}
              </div>
              <span className="text-slate-400 text-sm group-hover:text-white transition-colors">View →</span>
            </div>
            <div className="px-4 py-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gardenLatest.map(
                  ({ deviceId, name, reading }: { deviceId: string; name: string; reading: any }) =>
                    reading ? (
                      <React.Fragment key={deviceId}>
                        <Stat
                          label={`${name} Temp`}
                          value={`${reading.data.temperature.toFixed(1)}°F`}
                          color="bg-orange-400"
                        />
                        <Stat
                          label={`${name} Moisture`}
                          value={String(reading.data.moisture)}
                          color="bg-cyan-400"
                        />
                      </React.Fragment>
                    ) : null
                )}
              </div>
            </div>
          </div>
        </Link>
      )}
    </section>
  );
}
