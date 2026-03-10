import type { Route } from "./+types/index";
import { Card } from "~/components/Card";
import { GerminatorHeader } from "~/components/GerminatorHeader";
import GerminatorTempChart from "~/components/GerminatorTempChart";
import GerminatorHumidityChart from "~/components/GerminatorHumidityChart";
import GerminatorSoilChart from "~/components/GerminatorSoilChart";
import type { GerminatorSensor } from "~/types";

export async function loader(_: Route.LoaderArgs): Promise<any> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/data/device/${import.meta.env.VITE_GERMINATOR_DEVICE_ID}?limit=48`);
  const json = await response.json();
  let readings: GerminatorSensor[];
  if (Array.isArray(json)) {
    readings = json.reverse();
  } else {
    readings = [];
  }

  return { readings };
}

const GerminatorPage = ({ loaderData }: Route.ComponentProps) => {
  const { readings } = loaderData;
  const lastElement = readings.length > 0 ? readings[0] : undefined;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">🌱 Germinator 2: Propagation Day 🌿</h1>
      {lastElement && <GerminatorHeader reading={lastElement} />}
      <Card title="Air Temperature" className="mb-4">
        <GerminatorTempChart data={readings} />
      </Card>
      <Card title="Air Humidity" className="mb-4">
        <GerminatorHumidityChart data={readings} />
      </Card>
      <Card title="Soil" className="mb-4">
        <GerminatorSoilChart data={readings} />
      </Card>
    </section>
  );
};

export default GerminatorPage;
