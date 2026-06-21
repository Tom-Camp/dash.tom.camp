import type { Route } from "./+types/index";
import { Card } from "~/components/Card";
import GardenSoilChart from "~/components/GardenSoilChart";
import type { GardenDevice, GardenSensor } from "~/types";
import { formatCoopDate } from "~/utils/dateFormatter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Garden.net — Tom.Camp" },
    { name: "description", content: "Garden soil sensor network." },
  ];
}

export async function loader(_: Route.LoaderArgs): Promise<any> {
  const rawIds = import.meta.env.VITE_GARDEN_NET_DEVICE_IDS ?? "";
  const deviceIds: string[] = rawIds
    .split(",")
    .map((id: string) => id.trim())
    .filter(Boolean);

  const results = await Promise.allSettled(
    deviceIds.map((id, index) =>
      Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}/data/device/${id}?limit=48`).then((r) => r.json()),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/devices/${id}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ]).then(([dataJson, deviceJson]): { deviceId: string; name: string; readings: GardenSensor[] } => ({
        deviceId: id,
        name: (deviceJson as GardenDevice | null)?.name ?? `Sensor ${index + 1}`,
        readings: Array.isArray(dataJson) ? [...dataJson].reverse() : [],
      }))
    )
  );

  const devices = results
    .filter((r): r is PromiseFulfilledResult<{ deviceId: string; name: string; readings: GardenSensor[] }> => r.status === "fulfilled")
    .map((r) => r.value);

  return { devices };
}

type DeviceData = { deviceId: string; name: string; readings: GardenSensor[] };

const GardenNetPage = ({ loaderData }: Route.ComponentProps) => {
  const { devices } = loaderData;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">🌿 Garden.net</h1>
      {devices.length === 0 && (
        <p className="text-slate-400">No devices configured.</p>
      )}
      {devices.map(({ deviceId, name, readings }: DeviceData) => {
        const latest = readings.length > 0 ? readings[readings.length - 1] : null;
        return (
          <Card
            key={deviceId}
            title={name}
            subtitle={latest ? `Last reading: ${formatCoopDate(latest.created_date)} -- Battery: ${latest.data.battery.toFixed(2)}V` : undefined}
            className="mb-4"
          >
            {readings.length > 0 ? (
              <GardenSoilChart data={readings} />
            ) : (
              <p className="text-slate-400 py-4">No data available</p>
            )}
          </Card>
        );
      })}
    </section>
  );
};

export default GardenNetPage;
