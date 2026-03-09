import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  CartesianGrid, ResponsiveContainer,
} from "recharts";
import type { GerminatorSensor } from "~/types";
import { formatCoopDate } from "~/utils/dateFormatter";

interface GerminatorSoilChartProps {
  data: GerminatorSensor[];
}

const GerminatorSoilChart: React.FC<GerminatorSoilChartProps> = ({ data }) => {
  const chartData = data
    .filter((e) => e.data.soil.soil_temp !== undefined || e.data.soil.moisture !== undefined)
    .map((e) => ({
      time: formatCoopDate(e.created_date),
      soil_temp: e.data.soil.soil_temp,
      moisture: e.data.soil.moisture,
    }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 20, right: 60, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" minTickGap={40} />
        <YAxis
          yAxisId="temp"
          label={{ value: "Soil Temp (°F)", angle: -90, position: "insideLeft" }}
          tickFormatter={(v) => v.toFixed(0) + "°F"}
        />
        <YAxis
          yAxisId="moisture"
          orientation="right"
          label={{ value: "Moisture", angle: 90, position: "insideRight" }}
        />
        <Tooltip
          formatter={(value, name) => {
            if (typeof value !== "number") return value;
            return name === "Soil Temp" ? value.toFixed(1) + "°F" : value.toFixed(0);
          }}
        />
        <Legend />
        <Line yAxisId="temp" type="monotone" dataKey="soil_temp" stroke="#a78bfa" name="Soil Temp" dot={false} />
        <Line yAxisId="moisture" type="monotone" dataKey="moisture" stroke="#34d399" name="Moisture" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GerminatorSoilChart;
