import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Data Tom.Camp" },
    { name: "description", content: "Random data from random sensors." },
  ];
}

export default function Home() {
  return <section>
  More to come...
  </section>;
}
