<script>
	import { interactionBeforeBrowserAudioDialogOpen } from "$lib/index.js";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Button } from "$lib/components/ui/button";
</script>
<Dialog.Root bind:open={$interactionBeforeBrowserAudioDialogOpen}>
	<Dialog.Trigger />
	<Dialog.Content>
		<Dialog.Header class="sm:!text-right">
			<Dialog.Title>נדרשת אינטראקציה</Dialog.Title>
			<Dialog.Description>דפדפנים דורשים אינטראקציה של משתמשים לפני שיהיה ניתן להשמיע קול. פשוט לחץ על אישור כדי להמשיך.</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button class="w-full" type="submit" on:click={() => $interactionBeforeBrowserAudioDialogOpen = false}>אישור</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>