<script>
	import "../style/app.css";
	import socket from "$lib/index.ts";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Command from "$lib/components/ui/command";
	import { Sun, Moon, Settings2 } from "lucide-svelte";
	import { toggleMode } from "mode-watcher";

	let areas, users, value = "", settings;
	socket.on("areas", msg => areas = msg);
	socket.on("users", msg => users = msg);

	$: {
		value = areas?.find(f => f.value === value)?.label ?? "בחר אזורי התרעות";
	}
</script>

<div class="flex flex-row-reverse justify-between items-center absolute top-0 w-full backdrop-blur-md p-4 border-b">
	<div>
		<Button variant="outline" size="icon" on:click={() => { settings = true }}><Settings2 /></Button>
		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun class="dark:hidden" />
			<Moon class="hidden dark:block" />
		</Button>
	</div>
	<p class="font-mono font-bold text-xl lowercase">oref Client</p>
	<Badge variant="outline">משתמשים: {users ?? "0"}</Badge>
</div>
<div class="fixed bottom-2 left-2">
	<Dialog.Root bind:open={settings}>
		<Dialog.Trigger />
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title class="text-right">הגדרות</Dialog.Title>
				<Dialog.Description class="text-right">כאן תוכלו להגדיר את הצורה בה האתר מתנהג</Dialog.Description>
			</Dialog.Header>
			{#if areas}		
				<Command.Root class="border h-auto">
					<Command.Input placeholder="התחל להקליד בשביל להראות תוצאות" />
					<Command.List>
						<Command.Empty>לא נמצאו תוצאות</Command.Empty>
						<Command.Group heading="אזורים">
							{#each areas as area}
								<Command.Item value={area.label} onSelect={(current => { value = current; open = false })}>{area.label}</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			{/if}
			<Dialog.Footer>
				<Button type="submit">שמור הגדרות</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</div>

<slot />