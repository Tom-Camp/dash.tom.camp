import type { Route } from "./+types/index";
import { Card } from "~/components/Card";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Data Tom.Camp" },
    { name: "description", content: "Random data from random sensors." },
  ];
}

export default function Home() {
  return <section>
    <h1 className="text-3xl font-bold mb-2">Data Tom.Camp</h1>
    <Card title="Germinator" className="mb-4">
        <p className="mb-2"></p>
    </Card>
    <Card title="🐔 NuLay Inn" className="mb-4">
      <p className="mb-2">The NuLay Inn is a sensor package for monitoring the environment in our chicken coop. It is
        designed to be used with the Adafruit Feather RP2040 RFM95, an Adafruit BME680 - Temperature, Humidity, Pressure
        and Gas Sensor, and an Adafruit AHT20 - Temperature & Humidity Sensor Breakout Board.
      </p>
      <p className="mb-2">
        The name NuLay Inn is a nod to the historic <a
          href="https://www.nuwray.com/" target="_blank" rel="noopener noreferrer">NuWray Hotel</a> here in Burnsville,
        North Carolina.
      </p>
      <p className="mb-2">
        The system is designed to run with a battery and solar panel, and is capable of sending data to a server via LoRa.
        The data is then sent to an API server for storage and analysis. The system is designed to be low power, with a sleep
        mode that sends data every hour. The AHT20 sensor is used for temperature and humidity outside the coop, while the
        BME680 sensor is for temperature, humidity, pressure and gas inside the coop.
      </p>
    </Card>
  </section>;
}
