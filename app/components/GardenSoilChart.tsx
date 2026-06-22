import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  CartesianGrid, ResponsiveContainer,
} from "recharts";
import type { GardenSensor } from "~/types";
import { formatCoopDate } from "~/utils/dateFormatter";

interface GardenSoilChartProps {
  data: GardenSensor[];
}

const GardenSoilChart: React.FC<GardenSoilChartProps> = ({ data }) => {
  const chartData = data.map((e) => ({
    time: formatCoopDate(e.created_date),
    temperature: e.data.temp,
    soil: e.data.soil,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 20, right: 60, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" minTickGap={40} />
        <YAxis
          yAxisId="temp"
          label={{ value: "Temp (°F)", angle: -90, position: "insideLeft" }}
          tickFormatter={(v) => v.toFixed(0) + "°"}
        />
        <YAxis
          yAxisId="soil"
          orientation="right"
          domain={[200, 2000]}
          label={{ value: "Moisture", angle: 90, position: "insideRight" }}
        />
        <Tooltip
          formatter={(value, name) => {
            if (typeof value !== "number") return value;
            return name === "Temperature" ? value.toFixed(1) + "°F" : String(value);
          }}
        />
        <Legend />
        <Line yAxisId="temp" type="monotone" dataKey="temperature" stroke="#f97316" name="Temperature" dot={false} />
        <Line yAxisId="soil" type="monotone" dataKey="soil" stroke="#22d3ee" name="Moisture" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GardenSoilChart;
