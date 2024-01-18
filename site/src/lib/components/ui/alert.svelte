<script>
    import { alert } from "$lib/index.js";
    import { Dot } from "lucide-svelte";
	import { fly } from "svelte/transition";
    import { Howl } from "howler";

    import * as HoverCard from "$lib/components/ui/hover-card";

	let soundPlaying = false;
	alert.subscribe(() => {
		const keyAmount = Object.keys($alert).length;
		const sound = new Howl({ src: "./alarm.mp3", loop: true });
		if(keyAmount > 0 && !soundPlaying) {
			soundPlaying = true;
			sound.play();
		} else if(keyAmount === 0 && soundPlaying) {
			soundPlaying = false;
			sound.stop();
		}
	});
</script>
{#if Object.keys($alert).length > 0}
	<div class="fixed bottom-0 border-destructive border border-b-0 text-destructive rounded-md rounded-br-none rounded-bl-none px-36 p-5" transition:fly={{ y: -5 }}>
		<HoverCard.Root>
			<HoverCard.Trigger>
				<div class="flex items-center hover:underline underline-offset-4">
					<Dot />
					<p>{($alert.locations).join(", ")}</p>
				</div>
			</HoverCard.Trigger>
			<HoverCard.Content>
				<h4 class="text-sm font-semibold">{$alert.type}</h4>
				<p class="text-sm">{$alert.description}</p>
			</HoverCard.Content>
		</HoverCard.Root>
	</div>
{/if}