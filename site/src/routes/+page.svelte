<script lang="ts">
	import History from "$lib/components/ui/history.svelte";
    import { fly } from "svelte/transition";
</script>

<div in:fly={{ y: 5, opacity: 0, duration: 350 }} class="flex flex-col items-center mt-7 mb-10">
    <History />
</div>