<script>
	import socket from "$lib/index.ts";
	import { Howl } from "howler";

	import * as Alert from "$lib/components/ui/alert";
	import * as Table from "$lib/components/ui/table";
	import * as HoverCard from "$lib/components/ui/hover-card";

	import { Dot, Settings } from "lucide-svelte";
	import { fly } from "svelte/transition";

	$: {
		if(alert) new Howl({ src: "/alarm.mp3" }).play();
	}

	let history, users, alert, areas, error;
	socket.on("areas", msg => areas = msg);
	socket.on("users", msg => users = msg);
	socket.on("alert", msg => { alert = msg; error = false; });
	socket.on("history", msg => {
		let temp = [...msg];
		temp.forEach((element, i) => {
			if(temp[i+1]?.alertDate === element.alertDate && temp[i+1]?.title === element.title) {
				element.data += `, ${temp[i+1].data}`;
				temp.splice(i+1, 1);
			};
		});

		error = false;
		history = temp;
	});

	socket.on("error", () => error = true);
	socket.io.on("error", () => error = true);
	socket.io.on("reconnect", () => error = false);
</script>

<div class="fixed top-5 right-5 drop-shadow-md dark:drop-shadow-none">
	<Alert.Root><Alert.Title>משתמשים: {error ? "שגיאה" : (users ?? "טוען...")}</Alert.Title></Alert.Root>
</div>
{#if error}
	<div class="fixed top-0 max-w-full" transition:fly={{ y: -5 }}>
		<Alert.Root variant="destructive" class="rounded-t-none border-t-0 bg-background">
			<Alert.Title>שגיאה!</Alert.Title>
			<Alert.Description>החיבור לשרת שלנו לא פועל כעת, נא לא לסמוך על המידע שרשום באתר.<br>השתמשו באתר של <a href="https://oref.org.il/" class="underline" target="_blank">פיקוד העורף</a> לבינתיים.</Alert.Description>
		</Alert.Root>
	</div>
{/if}
{#if alert && !error}
	<div class="fixed top-0 border-destructive border border-t-0 rounded-t-none text-destructive rounded-md px-36 p-5 mb-20" transition:fly={{ y: -5 }}>
		<HoverCard.Root>
			<HoverCard.Trigger>
				<div class="flex items-center hover:underline underline-offset-4">
					<Dot />
					<p>{alert.data.join(", ")}</p>
				</div>
			</HoverCard.Trigger>
			<HoverCard.Content>
				<h4 class="text-sm font-semibold">{alert.title}</h4>
				<p class="text-sm">{alert.desc}</p>
			</HoverCard.Content>
		</HoverCard.Root>
	</div>
{/if}

{#if history}
	<div class="border rounded-lg m-10">
		<Table.Root>
			<Table.Header>
				<Table.Head class="text-right">סוג מתפקה</Table.Head>
				<Table.Head class="text-right">מיקום</Table.Head>
				<Table.Head>זמן</Table.Head>
			</Table.Header>
			<Table.Body>
				{#each history as data, i (i)}
					<Table.Row>
						<Table.Cell>{data.title}</Table.Cell>
						<Table.Cell>{data.data}</Table.Cell>
						<Table.Cell>{data.alertDate.toLocaleString()}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{/if}