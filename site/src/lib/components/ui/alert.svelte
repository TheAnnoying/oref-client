<script>
    import { alert, localStorage, preferredLocations, muted } from "$lib/index.js";
	import { get } from "svelte/store";
	import { sounds } from "$lib/utils";
    import { Radio } from "lucide-svelte";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

    import * as HoverCard from "$lib/components/ui/hover-card";
	import * as Card from "$lib/components/ui/card";
	import AlertTags from "$lib/components/ui/alert-tags.svelte";

	onMount(async() => {
		const { Howl, Howler } = await import("howler");
		Howler.stop();

		let soundPlaying = false;
		const sound = new Howl({ src: sounds.find(s => s.id === (localStorage.get("sound") ?? "beep")).path, loop: true });

		alert.subscribe(() => {
			const keyAmount = Object.keys(get(alert)).length;
			const shouldPlaySound = !get(muted) && keyAmount > 0 && ($preferredLocations.length === 0 ? true : $preferredLocations.some(e => $alert?.locations?.includes(e[0])));

			if (shouldPlaySound && !soundPlaying) {
				soundPlaying = true;
				sound.play();
			} else if (!shouldPlaySound && soundPlaying) {
				soundPlaying = false;
				sound.stop();
			}
		});
	});
</script>
{#if Object.keys($alert).length > 0}
	<div transition:fade={{ duration: 350 }}>
		<Card.Root class="my-4 border-destructive !border-t-destructive !border-b-destructive shadow-[0_0_5px] shadow-destructive sm:w-[600px] w-[350px] transition-transform">
			<Card.Header>
				<Card.Title class="flex flex-row items-center gap-2">
					<Radio />
					התרעה כרגע
					<div class="flex sm:flex-wrap flex-row gap-1 max-w-12 sm:max-w-64 overflow-auto">
						<AlertTags alertLocations={$alert.locations} />
					</div>
				</Card.Title>
				<Card.Description>
					<HoverCard.Root>
						<HoverCard.Trigger class="hover:underline underline-offset-4">{$alert.locations.join(", ")}</HoverCard.Trigger>
						<HoverCard.Content>
							<h4 class="text-sm font-semibold">{$alert.type}</h4>
							<p class="text-sm">{$alert.description}</p>
						</HoverCard.Content>
					</HoverCard.Root>
				</Card.Description>
			</Card.Header>
		</Card.Root>
	</div>
{/if}