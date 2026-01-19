import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Design with Chike" },
    {
      name: "description",
      content: "Welcome to the Design with Chike Website",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
