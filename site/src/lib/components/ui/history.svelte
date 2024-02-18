<script>
    import { history } from "$lib/index.js";
	import { relativeDate } from "../util/relativeDate.js";

	import InfiniteScroll from "svelte-infinite-scroll";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Card from "$lib/components/ui/card";

	import { Clock, Rocket, PlaneTakeoff, Sword, Home, Radiation, Waves, AlertOctagon, HelpCircle } from "lucide-svelte";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { fade } from "svelte/transition";

	let page = 0, size = 12, historyCards = [];
	$: historyCards = [...historyCards, ...(($history ?? []).slice(size*page, size*(page+1)-1))];

	const typeIcons = {
		"ירי רקטות וטילים": Rocket,
		"חדירת כלי טיס עוין": PlaneTakeoff,
		"חדירת מחבלים": Sword,
		"רעידת אדמה": Home,
		"אירוע רדיולוגי": Radiation,
		"צונאמי": Waves,
		"אירוע חומרים מסוכנים": AlertOctagon,
	}
</script>
{#if $history?.length > 0}
	<div class="max-h-screen sm:w-[600px] w-[350px]" in:fade={{ duration: 150 }}>
		{#each historyCards as data}
			<Card.Root class="my-4">
				<Card.Header>
					<Card.Title class="flex justify-between">
						<div class="flex flex-row gap-2">
							<svelte:component this={typeIcons[data.type] ?? HelpCircle} class="h-5 w-5 text-destructive" />
							{data.type}
						</div>
						<Tooltip.Root>
							<Tooltip.Trigger class="flex flex-row items-center gap-2 text-sm text-muted-foreground font-normal">
								{relativeDate(data.date, data.time)}
								<Clock class="h-4 w-4" />
							</Tooltip.Trigger>
							<Tooltip.Content>{relativeDate(data.date, data.time, true)}</Tooltip.Content>
						</Tooltip.Root>
					</Card.Title>
					<Card.Description>{data.location}</Card.Description>
				</Card.Header>
			</Card.Root>
		{/each}
		<InfiniteScroll window={true} threshold={100} on:loadMore={() => page++} />
	</div>
{:else if $history?.length === 0}
	<p class="text-3xl font-semibold">אין התרעות.</p>
{:else}
	<div class="sm:w-[600px] w-[350px]">
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
						<Skeleton style="width: {Math.floor(Math.random()*361) + 40}px;" class="h-[20px]" />
					</Card.Description>
				</Card.Header>
			</Card.Root>
		{/each}
	</div>
{/if}