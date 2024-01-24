<script>
	export let type;
    import { history } from "$lib/index.js";

	import * as Table from "$lib/components/ui/table";
	import * as Tooltip from "$lib/components/ui/tooltip";

	import { Skeleton } from "$lib/components/ui/skeleton";
	import { relativeDate } from "../util/relativeDate.js";
    import { fade } from "svelte/transition";
</script>
{#if $history[type]?.length > 0}
	<div transition:fade={{ duration: 350 }} class="w-[600px]">
		<Table.Root>
			<Table.Caption>היסטורית ההתרעות</Table.Caption>
			<Table.Header>
				<Table.Head class="text-right">סוג מתפקה</Table.Head>
				<Table.Head class="text-right">מיקום</Table.Head>
				<Table.Head class="text-left">זמן</Table.Head>
			</Table.Header>
			<Table.Body>
				{#each $history[type] as data, i (i)}
					<Table.Row>
						<Table.Cell class="text-right">{data.type}</Table.Cell>
						<Table.Cell class="text-right">{data.location}</Table.Cell>
						<Table.Cell class="text-left">
							<Tooltip.Root>
								<Tooltip.Trigger>{relativeDate(data.date, data.time)}</Tooltip.Trigger>
								<Tooltip.Content><p>{relativeDate(data.date, data.time, true)}</p></Tooltip.Content>
							</Tooltip.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{:else if $history[type]?.length === 0}
	<p class="text-2xl font-semibold m-5">אין התרעות.</p>
{:else}
	<div class="pointer-events-none">
		<Table.Root>
			<Table.Caption><Skeleton class="w-[600px] h-[20px]" /></Table.Caption>
			<Table.Header>
				<Table.Head><Skeleton class="w-full h-[30px]" /></Table.Head>
				<Table.Head><Skeleton class="w-full h-[30px]" /></Table.Head>
				<Table.Head><Skeleton class="w-full h-[30px]" /></Table.Head>
			</Table.Header>
			<Table.Body>
				{#each new Array(12).fill("") as element}
					<Table.Row>
						<Table.Cell><Skeleton class="w-full h-[20px]" /></Table.Cell>
						<Table.Cell><Skeleton class="w-full h-[20px]" /></Table.Cell>
						<Table.Cell><Skeleton class="w-full h-[20px]" /></Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{/if}