<script>
	import "../style/app.css";
	import { areas, users } from "$lib/index.js";

	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { Sun, Moon, Settings2 } from "lucide-svelte";
	import { toggleMode } from "mode-watcher";

	import * as Dialog from "$lib/components/ui/dialog";
	import * as Command from "$lib/components/ui/command";

	let value = "", settings;

	$: {
		value = $areas?.find(f => f.value === value)?.label ?? "בחר אזורי התרעות";
	}
</script>

<div class="flex items-center absolute top-0 w-full backdrop-blur-md p-4 border-b">
	<div class="flex flex-[1]">
		<Badge variant="outline">משתמשים: {$users ?? "0"}</Badge>
	</div>
	<p class="font-mono font-bold text-xl lowercase">oref Client</p>
	<div class="flex flex-[1] justify-end gap-1">
		<Button variant="outline" size="icon" on:click={() => { settings = true }}><Settings2 /></Button>
		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun class="dark:hidden" />
			<Moon class="hidden dark:block" />
		</Button>
	</div>
</div>
<div class="fixed bottom-2 left-2">
	<Dialog.Root bind:open={settings}>
		<Dialog.Trigger />
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title class="text-right flex items-baseline gap-2">
					הגדרות
					<p class="text-sm text text-gray-500">שינויים נשמרים אוטומטית</p>
				</Dialog.Title>
				<Dialog.Description class="text-right">כאן תוכלו להגדיר את הצורה בה האתר מתנהג</Dialog.Description>
			</Dialog.Header>
			{#if $areas}
				<Command.Root class="border h-auto">
					<Command.Input placeholder="התחל להקליד בשביל להראות תוצאות" />
					<Command.List>
						<Command.Empty>לא נמצאו תוצאות</Command.Empty>
						<Command.Group heading="אזורים">
							{#each $areas as area}
								<Command.Item value={area.label} onSelect={(current => { value = current; open = false })}>{area.label}</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			{:else}
				<Skeleton class="rounded-full"></Skeleton>
			{/if}
		</Dialog.Content>
	</Dialog.Root>
</div>

<slot />