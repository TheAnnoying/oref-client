<script>
	import { relativeDate } from "../util/relativeDate.js";
    import { history } from "$lib/index.js";
	import { Skeleton } from "$lib/components/ui/skeleton";
    import * as Table from "$lib/components/ui/table";
    import { fade } from "svelte/transition";
</script>
{#if $history.length > 0}
	<div class="mt-10" transition:fade={{ duration: 350 }}>
		<Table.Root>
			<Table.Caption>היסטורית ההתרעות</Table.Caption>
			<Table.Header>
				<Table.Head class="text-right">סוג מתפקה</Table.Head>
				<Table.Head class="text-right">מיקום</Table.Head>
				<Table.Head>זמן</Table.Head>
			</Table.Header>
			<Table.Body>
				{#each $history as data, i (i)}
					<Table.Row>
						<Table.Cell>{data.type}</Table.Cell>
						<Table.Cell>{data.location}</Table.Cell>
						<Table.Cell>{relativeDate(data.date)}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{:else}
	<div class="mt-10 pointer-events-none">
		<Table.Root>
			<Table.Caption><Skeleton class="w-[500px] h-[20px]" /></Table.Caption>
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