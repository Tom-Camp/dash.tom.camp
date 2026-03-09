import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import type { CoopSensor } from "~/types";
import { formatCoopDate } from "~/utils/dateFormatter";

interface CoopVocChartProps {
  data: CoopSensor[];
}

const CoopVocChart: React.FC<CoopVocChartProps> = ({ data }) => {
  const chartData = data.map((entry) => ({
    time: formatCoopDate(entry.created_date),
    gas: Number(entry.data.coop.coop_gas),
  }));

  const values = chartData.map((d) => d.gas);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const yDomain = [Math.floor(minVal * 0.9), Math.ceil(maxVal * 1.1)];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" minTickGap={40} />
        <YAxis
          domain={yDomain}
          label={{ value: "VOC Index", angle: -90, position: "insideLeft" }}
        />
        <Tooltip formatter={(value) => (typeof value === "number" ? value.toFixed(0) : value)} />
        <Line type="monotone" dataKey="gas" stroke="#f43f5e" name="VOC" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CoopVocChart;
