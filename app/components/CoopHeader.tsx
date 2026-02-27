// CoopHeader.tsx
import React from "react";
import type { CoopSensor } from "~/types";
import { coopDateFormatter } from "~/utils/dateFormatter";

type CoopHeaderProps = {
    reading: CoopSensor;
};

export const CoopHeader: React.FC<CoopHeaderProps> = ({ reading }) => {
    const {
        created_date,
        data: {
            battery,
            outside: { air_temp, humidity },
            coop: { coop_humidity, coop_temp, coop_gas },
        },
    } = reading;

    const created = coopDateFormatter.format(new Date(created_date.endsWith("Z") ? created_date : created_date + "Z"))

    return (
        <header className="w-full border-b border-slate-300 bg-gray-50 text-slate-50 rounded-2xl mb-4">
            <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Left: title + timestamp */}
                <div className="space-y-1">
                    <h1 className="text-xl text-slate-950 font-semibold tracking-tight">
                        Coop Environment
                    </h1>
                    <p className="text-xs text-slate-900">
                        Last update:{" "}{created}
                    </p>
                </div>

                {/* Right: metric pills */}
                <div className="grid grid-cols-2 gap-2 text-xs sm:flex sm:flex-wrap sm:justify-end">
                    {/* Battery */}
                    <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="font-medium">Battery</span>
                        <span className="ml-1 text-slate-300">{battery.toFixed(1)} V</span>
                    </div>

                    {/* Outside */}
                    <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1">
                        <span className="h-2 w-2 rounded-full bg-sky-400" />
                        <span className="font-medium">Outside</span>
                        <span className="ml-1 text-slate-300">
              {air_temp.toFixed(1)}° · {humidity.toFixed(0)}%
            </span>
                    </div>

                    {/* Coop temp / humidity */}
                    <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1">
                        <span className="h-2 w-2 rounded-full bg-amber-400" />
                        <span className="font-medium">Coop</span>
                        <span className="ml-1 text-slate-300">
              {coop_temp.toFixed(1)}° · {coop_humidity.toFixed(0)}%
            </span>
                    </div>

                    {/* Coop gas */}
                    <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1">
                        <span className="h-2 w-2 rounded-full bg-rose-400" />
                        <span className="font-medium">Gas</span>
                        <span className="ml-1 text-slate-300">
              {coop_gas.toFixed(0)} ppm
            </span>
                    </div>
                </div>
            </div>
        </header>
    );
};
