import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  CartesianGrid, ResponsiveContainer, ReferenceArea,
} from "recharts";
import type { GerminatorSensor } from "~/types";
import { formatCoopDate } from "~/utils/dateFormatter";

interface GerminatorHumidityChartProps {
  data: GerminatorSensor[];
}

const GerminatorHumidityChart: React.FC<GerminatorHumidityChartProps> = ({ data }) => {
  const valid = data.filter((e) => e.data.air.humidity !== undefined);
  const chartData = valid.map((e) => ({
    time: formatCoopDate(e.created_date),
    actual: e.data.air.humidity!.actual,
  }));

  const firstValid = valid[0];
  const [targetMin, targetMax] = firstValid?.data.air.humidity?.target ?? [0, 0];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" minTickGap={40} />
        <YAxis
          domain={[0, 100]}
          label={{ value: "Humidity (%)", angle: -90, position: "insideLeft" }}
          tickFormatter={(v) => v.toFixed(0) + "%"}
        />
        <Tooltip formatter={(value) => (typeof value === "number" ? value.toFixed(1) + "%" : value)} />
        <Legend />
        <ReferenceArea y1={targetMin} y2={targetMax} fill="#86efac" fillOpacity={0.2} label="Target" />
        <Line type="monotone" dataKey="actual" stroke="#60a5fa" name="Air Humidity" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GerminatorHumidityChart;
