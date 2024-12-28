import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import type { Dino } from "~/@types/types";

export const useDinosaurDetails = routeLoader$(async ({ params }): Promise<Dino> => {
  const { name } = params
  if (!name) {
    throw new Error("Dinosaur name is required")
  }
  const response = await fetch(`http://localhost:5173/api/dinosaurs/${name}`)
  const data = await response.json() as Dino
  return data
});

export default component$(() => {
  const dinosaurSignal = useDinosaurDetails()
	return (
    <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">{dinosaurSignal.value.name}</h1>
    <p class="mb-4">{dinosaurSignal.value.description}</p>
    <Link href="/" class="text-blue-600 hover:underline">
      Retornar
    </Link>
  </div>
  );
});
