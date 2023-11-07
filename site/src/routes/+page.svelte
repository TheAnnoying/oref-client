<script>
	import socket from "$lib/index.js";
	import * as Alert from "$lib/components/ui/alert";
	import * as Table from "$lib/components/ui/table";

	let history, users, alert, error;
	socket.on("users", msg => users = msg);
	socket.on("alert", msg => alert = msg);
	socket.on("history", msg => {
		let temp = [...msg];
		temp.forEach((element, i) => {
			if(temp[i+1]?.alertDate === element.alertDate && temp[i+1]?.title === element.title) {
				element.data += `, ${temp[i+1].data}`;
				temp.splice(i+1, 1);
			};
		});

		history = temp;
	});

	socket.io.on("error", () => error = true);
	socket.io.on("reconnect", () => error = false);
</script>

{#if error}
	<div class="absolute top-5 m-10">
		<Alert.Root variant="destructive">
			<Alert.Title>שגיאה!</Alert.Title>
			<Alert.Description>החיבור לשרת שלנו לא פועל כעת, נא לא לסמוך על המידע שרשום באתר.<br>השתמשו באתר של <a href="https://oref.org.il/" class="underline" target="_blank">פיקוד העורף</a> לבינתיים.</Alert.Description>
		</Alert.Root>
	</div>
{/if}

<div class="fixed top-5 right-5 drop-shadow-md dark:drop-shadow-none">
	<Alert.Root>
		<Alert.Title>
			משתמשים: {error ? "שגיאה" : (users ?? "טוען...")}
		</Alert.Title>
	</Alert.Root>
</div>

{#if alert}
	<Alert.Root>
		<Alert.Title>אזעקות</Alert.Title>
		<Alert.Description>יש כרגע אזעקות ב-{alert.data}</Alert.Description>
	</Alert.Root>
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
						<Table.Cell>{data.alertDate}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{/if}