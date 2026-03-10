import type { Route } from "./+types/index";
import { Link } from "react-router";
import { Card } from "~/components/Card";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Data Tom.Camp" },
    { name: "description", content: "Random data from random sensors." },
  ];
}

export default function Home() {
  return <section>
    <Link to="/germinator">
      <Card title="🌱 Germinator" className="mb-4">
        <p className="mb-2">
          The Germinator is a seed germination station. It uses a warming mat to maintain the proper soil temperature
          and sensors to monitor the air and soil temperature, the station humidity and soil moisture. The system is
          designed to use the science of photobiology— specifically the subfield focused on how light wavelengths affect
          plant growth and development.
        </p>
      </Card>
    </Link>
    <Link to="/nulay">
      <Card title="🐔 NuLay Inn" className="mb-4">
        <p className="mb-2">The NuLay Inn is a sensor package for monitoring the environment in our chicken coop. It is
          designed to be used with the Adafruit Feather RP2040 RFM95, an Adafruit BME680 - Temperature, Humidity, Pressure
          and Gas Sensor, and an Adafruit AHT20 - Temperature & Humidity Sensor Breakout Board.
        </p>
        <p className="mb-2">
          The name NuLay Inn is a nod to the historic NuWray Hotel here in Burnsville, North Carolina.
        </p>
        <p className="mb-2">
          The system is designed to run with a battery and solar panel, and is capable of sending data to a server via LoRa.
          The data is then sent to an API server for storage and analysis. The system is designed to be low power, with a sleep
          mode that sends data every hour. The AHT20 sensor is used for temperature and humidity outside the coop, while the
          BME680 sensor is for temperature, humidity, pressure and gas inside the coop.
        </p>
      </Card>
    </Link>
  </section>;
}
