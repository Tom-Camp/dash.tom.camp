import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import type { CoopSensor } from "~/types";
import { coopDateFormatter } from "~/utils/dateFormatter";

interface CoopHumidityChartProps {
  data: CoopSensor[];
}

const CoopHumidityChart: React.FC<CoopHumidityChartProps> = ({ data }) => {
  const chartData = data.map((entry) => ({
    time: coopDateFormatter.format(new Date(entry.created_date.endsWith("Z") ? entry.created_date : entry.created_date + "Z")),
    outside: Number(entry.data.outside.humidity), // ensure number
    coop: Number(entry.data.coop.coop_humidity),     // ensure number
  }));

  const yDomain = [0, 100]; // Humidity is typically between 0% and 100%

  return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" minTickGap={40} />
          <YAxis
              domain={yDomain}
              label={{ value: "Humidity (%)", angle: -90, position: "insideLeft" }}
              tickFormatter={(v) => v.toFixed(0) + "%"}
          />
          <Tooltip formatter={(value) => (typeof value === 'number' ? value.toFixed(1) + "%" : value)} />
          <Legend />
          <Line type="monotone" dataKey="outside" stroke="#8884d8" name="Outside" dot={false} />
          <Line type="monotone" dataKey="coop" stroke="#ff0000" name="Coop" dot={false} />
        </LineChart>
      </ResponsiveContainer>
  );
};

export default CoopHumidityChart;
