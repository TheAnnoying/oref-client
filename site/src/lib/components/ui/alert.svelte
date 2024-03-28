<script>
    import { alert, localStorage } from "$lib/index.js";
	import { sounds } from "$lib/utils";
    import { Radio } from "lucide-svelte";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

    import * as HoverCard from "$lib/components/ui/hover-card";
	import * as Card from "$lib/components/ui/card";

	onMount(async() => {
		const { Howl, Howler } = await import("howler");
		Howler.stop();
		
		let soundPlaying = false;
		const sound = new Howl({ src: sounds.find(s => s.id === (localStorage.get("sound") ?? "beep")).path, loop: true });
		
		alert.subscribe(() => {
			const keyAmount = Object.keys($alert).length;
			const preferredLocations = JSON?.parse(localStorage.get("preferredLocations") ?? "[]");
			
			if(keyAmount > 0 && !soundPlaying && preferredLocations.length === 0 ? true : preferredLocations.some(e => $alert?.locations?.includes(e))) {
				soundPlaying = true;
				sound.play();
			} else if(keyAmount === 0 && soundPlaying) {
				soundPlaying = false;
				sound.stop();
			}
		});
	});
</script>
{#if Object.keys($alert).length > 0}
	<div transition:fade={{ duration: 350 }}>
		<Card.Root class="my-4 border-destructive shadow-[0_0_10px] shadow-destructive sm:w-[600px] w-[350px] hover:scale-110 transition-transform">
			<Card.Header>
				<Card.Title class="flex flex-row items-center gap-2">
					<Radio />
					אזעקה כרגע!
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