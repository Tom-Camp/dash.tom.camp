import React from "react";
import type { GerminatorSensor } from "~/types";
import { formatCoopDate } from "~/utils/dateFormatter";

type GerminatorHeaderProps = {
  reading: GerminatorSensor;
};

export const GerminatorHeader: React.FC<GerminatorHeaderProps> = ({ reading }) => {
  const { created_date, data: { air, soil, lights } } = reading;
  const created = formatCoopDate(created_date);

  return (
    <header className="w-full border-b border-slate-300 bg-gray-50 text-slate-50 rounded-2xl mb-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl text-slate-950 font-semibold tracking-tight">
            Germinator Environment
          </h1>
          <p className="text-xs text-slate-900">
            Last update:{" "}{created}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs sm:flex sm:flex-wrap sm:justify-end">
          {/* Lights */}
          <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1">
            <span className={`h-2 w-2 rounded-full ${lights ? "bg-yellow-300" : "bg-slate-500"}`} />
            <span className="font-medium">Lights</span>
            <span className="ml-1 text-slate-300">{lights ? "On" : "Off"}</span>
          </div>

          {/* Air Temp */}
          {air.temperature && (
            <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="font-medium">Air Temp</span>
              <span className="ml-1 text-slate-300">
                {air.temperature.actual.toFixed(1)}°
                <span className="text-slate-500 ml-1">
                  ({air.temperature.target[0]}–{air.temperature.target[1]}°)
                </span>
              </span>
            </div>
          )}

          {/* Air Humidity */}
          {air.humidity && (
            <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <span className="font-medium">Humidity</span>
              <span className="ml-1 text-slate-300">
                {air.humidity.actual.toFixed(0)}%
                <span className="text-slate-500 ml-1">
                  ({air.humidity.target[0]}–{air.humidity.target[1]}%)
                </span>
              </span>
            </div>
          )}

          {/* Soil Temp */}
          {soil.soil_temp !== undefined && (
            <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              <span className="font-medium">Soil Temp</span>
              <span className="ml-1 text-slate-300">{soil.soil_temp.toFixed(1)}°</span>
            </div>
          )}

          {/* Soil Moisture */}
          {soil.moisture !== undefined && (
            <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-medium">Moisture</span>
              <span className="ml-1 text-slate-300">{soil.moisture}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
