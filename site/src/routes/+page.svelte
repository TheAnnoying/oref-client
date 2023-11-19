<script>
	import { history, alert, error } from "$lib/index.js";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { Dot } from "lucide-svelte";
	import { fly, fade } from "svelte/transition";
	import { Howl } from "howler";

	import * as Table from "$lib/components/ui/table";
	import * as HoverCard from "$lib/components/ui/hover-card";
	import * as Dialog from "$lib/components/ui/dialog";

	$: {
		if($alert) new Howl({ src: "/alarm.mp3" }).play();
	}
</script>
<Dialog.Root bind:open={$error} closeOnEscape="false" closeOnOutsideClick="false">
	<Dialog.Trigger />
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-right">שגיאה!</Dialog.Title>
			<Dialog.Description class="text-right">
				החיבור לשרת שלנו לא פועל בעת, נא לא לסמוך על המידע שרשום באתר.
				השתמשו <a href="https://oref.org.il/" class="underline" target="_blank">באתר של פיקוד העורף</a> לבינתיים.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>

{#if $alert}
	<div class="fixed top-0 border-destructive border border-t-0 rounded-t-none text-destructive rounded-md px-36 p-5 mb-20" transition:fly={{ y: -5 }}>
		<HoverCard.Root>
			<HoverCard.Trigger>
				<div class="flex items-center hover:underline underline-offset-4">
					<Dot />
					<p>{$alert.data.join(", ")}</p>
				</div>
			</HoverCard.Trigger>
			<HoverCard.Content>
				<h4 class="text-sm font-semibold">{$alert.title}</h4>
				<p class="text-sm">{$alert.desc}</p>
			</HoverCard.Content>
		</HoverCard.Root>
	</div>
{/if}

{#if $history}
	<div class="m-10" transition:fade={{ duration: 350 }}>
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
						<Table.Cell>{data.title}</Table.Cell>
						<Table.Cell>{data.data}</Table.Cell>
						<Table.Cell>{data.alertDate.toLocaleString()}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{:else}
	<div class="m-10">
		<Table.Root>
			<Table.Caption><Skeleton class="w-[451px] h-[20px]" /></Table.Caption>
			<Table.Header>
				<Table.Head><Skeleton class="w-full h-[40px]" /></Table.Head>
				<Table.Head><Skeleton class="w-full h-[40px]" /></Table.Head>
				<Table.Head><Skeleton class="w-full h-[40px]" /></Table.Head>
			</Table.Header>
			<Table.Body>
				{#each new Array(9).fill("") as element}
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