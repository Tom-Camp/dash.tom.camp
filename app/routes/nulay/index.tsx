import type { Route } from "./+types/index"
import CoopTempChart from "~/components/CoopTempChart";
import CoopHumidityChart from "~/components/CoopHumidityChart";
import { Card } from "~/components/Card";
import { CoopHeader } from "~/components/CoopHeader";
import type { CoopSensor } from "~/types";

export async function loader({ request }: Route.LoaderArgs):Promise<any> {
  const response = await fetch("https://data.tom.camp/api/devices/6816c8f359096fabba9185db?data_limit=24");
  const data = await response.json();

  return { readings: data.data as CoopSensor[] };
}

const NulayPage = ({ loaderData }: Route.ComponentProps) => {
  const { readings } = loaderData;
  const lastElement = readings.length > 0 ? readings[readings.length - 1] : undefined;
  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">🥚 The NuLay Inn 🐔</h1>
      {lastElement && <CoopHeader reading={lastElement} />}
      <Card title="Temperature" className="mb-4">
        <CoopTempChart data={readings} />
      </Card>
    <Card title="Humidity" className="mb-4">
        <CoopHumidityChart data={readings} />
    </Card>
    </section>
  );
}

export default NulayPage;
