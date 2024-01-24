<script>
	import "../app.css";
	import { districts, usercount, connected } from "$lib/index.js";

	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { Sun, Moon, Settings2, RefreshCcw } from "lucide-svelte";
	import { toggleMode } from "mode-watcher";
	import { fade } from "svelte/transition";

	import * as Dialog from "$lib/components/ui/dialog";
	import * as Command from "$lib/components/ui/command";

	let value = "", settings;

	$: {
		value = $districts?.find(f => f.value === value)?.label ?? "בחר אזורי התרעות";
	}
</script>
<svelte:head>
	<title>קליינט פיקוד העורף</title>
</svelte:head>

{#if $connected === true}
	<div class="flex items-center backdrop-blur-md p-4 fixed top-0 w-full border-b z-10" transition:fade={{ delay: 300, duration: 200 }}>
		<div class="flex flex-[1]">
			<Badge variant="outline">משתמשים: {$usercount ?? "0"}</Badge>
		</div>
		<p class="text-xl lowercase">Oref Client</p>
		<div class="flex flex-[1] justify-end gap-1">
			<Button variant="outline" size="icon" on:click={() => { settings = true }}><Settings2 /></Button>
			<Button on:click={toggleMode} variant="outline" size="icon">
				<Sun class="dark:hidden" />
				<Moon class="hidden dark:block" />
			</Button>
		</div>
	</div>
	<Dialog.Root bind:open={settings}>
		<Dialog.Trigger />
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title class="text-right flex items-baseline gap-2">הגדרות</Dialog.Title>
				<Dialog.Description class="text-right">כאן תוכלו להגדיר את הצורה בה האתר מתנהג</Dialog.Description>
			</Dialog.Header>
			{#if $districts}
				<Command.Root class="border h-auto">
					<Command.Input placeholder="התחל להקליד בשביל להראות תוצאות" />
					<Command.List>
						<Command.Empty>לא נמצאו תוצאות</Command.Empty>
						<Command.Group heading="אזורים">
							{#each $districts as area}
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
	<div transition:fade={{ delay: 300, duration: 200 }}><slot/></div>
{:else}
	<div class="fixed bg-background w-screen h-screen flex flex-row gap-5 justify-center items-center z-20" transition:fade={{ duration: 75 }}>
		<RefreshCcw class="animate-spin" />
		<p>מתחבר...</p>
	</div>
{/if}