<script>
	import "../style/app.css";
	import socket from "$lib/index.ts";
	import { Button } from "$lib/components/ui/button";
	import { Sun, Moon, Settings } from "lucide-svelte";
	import { toggleMode } from "mode-watcher";
	import * as Command from "$lib/components/ui/command";

	let areas, current;
	socket.on("areas", msg => areas = msg);

	let open = false, value = "";
	$: {
		value = areas?.find(f => f.value === value)?.label ?? "בחר אזורי התרעות";
	}
</script>

<div class="fixed top-5 left-5 drop-shadow-md dark:drop-shadow-none">
	<Button on:click={toggleMode} variant="outline" size="icon">
		<Sun class="dark:hidden" />
		<Moon class="hidden dark:block" />
	</Button>
</div>
<div class="fixed bottom-2 left-2">
	<Button on:click={() => { open = !open; console.log("hello") }}>Open</Button>
	{#if areas}
		<Command.Dialog bind:open>
			<Command.Input placeholder="התחל להקליד בשביל להראות תוצאות" />
			<Command.List>
				<Command.Empty>לא נמצאו תוצאות</Command.Empty>
				<Command.Group heading="אזורים">
					{#each areas as area}
						<Command.Item value={area.label} onSelect={(current => { value = current; open = false })}>{area.label}</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Dialog>
	{/if}
</div>

<slot />