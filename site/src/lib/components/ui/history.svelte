<script>
    import { history, localStorage } from "$lib/index.js";
	import { relativeDate } from "../util/relativeDate.js";

	import InfiniteScroll from "svelte-infinite-scroll";
	import Alert from "$lib/components/ui/alert.svelte";
	import AlertTags from "$lib/components/ui/alert-tags.svelte";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Card from "$lib/components/ui/card";
	import * as Select from "$lib/components/ui/select";

	import { Clock, HelpCircle, Asterisk } from "lucide-svelte";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { Separator } from "$lib/components/ui/separator";
	import { fade } from "svelte/transition";
	import { alertIcons } from "$lib/utils";

	let page = 0, size = 12, historyCards = [];

	function loadMoreHistory(reload = false) {
		historyCards = [
			...(reload ? [] : historyCards),
			...(($history ?? [])
				.filter(e => {
					if([null, "כל ההתרעות"].includes(localStorage.get("historyFilter"))) return e;
					else return e.type === localStorage.get("historyFilter");
				}).slice(size*page, size*(page+1)-1))
		];
	}

	history.subscribe(() => loadMoreHistory(true));
	loadMoreHistory(true);
</script>
{#if $history?.length > 0}
	<div class="max-h-screen sm:w-[600px] w-[350px]" in:fade={{ duration: 150 }}>
		<div class="flex flex-row items-center gap-4">
			<Select.Root preventScroll={false} selected={{
				value: localStorage.get("historyFilter") ?? "כל ההתרעות",
				label: localStorage.get("historyFilter") ?? "כל ההתרעות",
				disabled: false
			}} onSelectedChange={value => {
				localStorage.set("historyFilter", value.value);
				size = 12;
				historyCards = [];
				page = 0;
				loadMoreHistory(true);
			}}>
				<Select.Trigger>
					<Select.Value placeholder="כל ההתרעות" />
				</Select.Trigger>
				<Select.Content fitViewport={true}>
					<Select.Item value="כל ההתרעות" class="flex flex-row gap-2">
						<Asterisk class="h-5 w-5 text-destructive" />
						כל ההתרעות
					</Select.Item>
					{#each Object.keys(alertIcons) as type}
						{#if $history.some(e => e.type == type)}
							<Select.Item value={type} label={type} class="flex flex-row gap-2">
								<svelte:component this={alertIcons[type] ?? HelpCircle} class="h-5 w-5 text-destructive" />
								{type}
							</Select.Item>
						{:else}
							<Select.Item value={type} class="flex flex-row gap-2" disabled=true>
								<svelte:component this={alertIcons[type] ?? HelpCircle} class="h-5 w-5 text-muted-foreground" />
								{type}
							</Select.Item>
						{/if}
					{/each}
				</Select.Content>
			</Select.Root>
			<Separator class="sm:w-80 w-24" />
		</div>
		<Alert />
		{#each historyCards as data}
			<a href="/alert/{data.id}">
				<Card.Root class="my-4 shadow-none hover:shadow-sm !shadow-destructive hover:-translate-y-1 duration-150">
					<Card.Header>
						<Card.Title class="flex justify-between">
							<div class="flex flex-row gap-2">
								<div class="flex flex-row gap-2">
									<svelte:component this={alertIcons[data.type] ?? HelpCircle} class="h-5 w-5 text-destructive" />
									{data.type}
								</div>
								<div class="flex sm:flex-wrap flex-row gap-1 max-w-12 sm:max-w-64 overflow-auto">
									<AlertTags alertLocations={data.location} />
								</div>
							</div>
							<Tooltip.Root>
								<Tooltip.Trigger class="flex flex-row items-center gap-2 text-sm text-muted-foreground font-normal">
									{relativeDate(data.date, data.time)}
									<Clock class="h-4 w-4" />
								</Tooltip.Trigger>
								<Tooltip.Content>
									{relativeDate(data.date, data.time, true)}
								</Tooltip.Content>
							</Tooltip.Root>
						</Card.Title>
						<Card.Description>
							{data.location.join(", ")}
						</Card.Description>
					</Card.Header>
				</Card.Root>
			</a>
		{/each}
		<InfiniteScroll window={true} threshold={100} on:loadMore={() => { page++; loadMoreHistory() }} />
	</div>
{:else if $history?.length === 0}
	<p class="text-3xl font-semibold">אין התרעות.</p>
{:else}
	<div class="sm:w-[600px] w-[350px]">
		<div class="flex flex-row items-center gap-7">
			<Select.Root>
				<Select.Trigger>
					<Skeleton class="w-full h-full mx-2"/>
				</Select.Trigger>
			</Select.Root>
			<Separator class="sm:w-80 w-28" />
		</div>
		{#each new Array(12).fill("") as element}
			<Card.Root class="my-4">
				<Card.Header>
					<Card.Title class="flex justify-between">
						<div class="flex flex-row gap-2">
							<Skeleton class="h-5 w-5 rounded-full" />
							<Skeleton class="w-[200px] h-[20px]" />
						</div>
						<Skeleton class="w-[40px] h-[20px]" />
					</Card.Title>
					<Card.Description>
						<Skeleton style="width: {Math.floor(Math.random()*250) + 40}px;" class="h-[20px]" />
					</Card.Description>
				</Card.Header>
			</Card.Root>
		{/each}
	</div>
{/if}