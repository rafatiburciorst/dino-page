import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import type { Dino } from "~/@types/types";
import data from "~/data/dinosaurs.json" with { type: "json" };
import type { DocumentHead } from "@builder.io/qwik-city";

export const useDinosaurs = routeLoader$(() => {
	return data;
});

export default component$(() => {
	const dinosaursSignal = useDinosaurs();
	return (
		<div class="container mx-auto p-4">
			<h1 class="text-3xl font-bold mb-4">Bem vindo ao App dos dinossauros</h1>
			<p class="mb-4">Clicque em um dinossauro abaixo para aprender mais</p>
			<ul class="space-y-2">
				{dinosaursSignal.value.map((dinosaur: Dino) => (
					<li key={dinosaur.name}>
						<Link
							href={`/${dinosaur.name.toLowerCase()}`}
							class="text-blue-600 hover:underline"
						>
							{dinosaur.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
});

export const head: DocumentHead = {
	title: "Lista de dinossauros",
	meta: [
		{
			name: "descrição",
			content: "dinossauros",
		},
	],
};
