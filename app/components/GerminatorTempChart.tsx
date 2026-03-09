import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  CartesianGrid, ResponsiveContainer, ReferenceArea,
} from "recharts";
import type { GerminatorSensor } from "~/types";
import { formatCoopDate } from "~/utils/dateFormatter";

interface GerminatorTempChartProps {
  data: GerminatorSensor[];
}

const GerminatorTempChart: React.FC<GerminatorTempChartProps> = ({ data }) => {
  const valid = data.filter((e) => e.data.air.temperature !== undefined);
  const chartData = valid.map((e) => ({
    time: formatCoopDate(e.created_date),
    actual: e.data.air.temperature!.actual,
  }));

  const firstValid = valid[0];
  const [targetMin, targetMax] = firstValid?.data.air.temperature?.target ?? [0, 0];

  const temps = chartData.map((d) => d.actual);
  const minTemp = Math.min(...temps, targetMin);
  const maxTemp = Math.max(...temps, targetMax);
  const yDomain = [Math.floor(minTemp - 5), Math.ceil(maxTemp + 5)];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" minTickGap={40} />
        <YAxis
          domain={yDomain}
          label={{ value: "Temperature (°F)", angle: -90, position: "insideLeft" }}
          tickFormatter={(v) => v.toFixed(0) + "°F"}
        />
        <Tooltip formatter={(value) => (typeof value === "number" ? value.toFixed(1) + "°F" : value)} />
        <Legend />
        <ReferenceArea y1={targetMin} y2={targetMax} fill="#86efac" fillOpacity={0.2} label="Target" />
        <Line type="monotone" dataKey="actual" stroke="#f59e0b" name="Air Temp" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GerminatorTempChart;
