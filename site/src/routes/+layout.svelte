<script>
	import "../style/app.css";
	import { Button } from "$lib/components/ui/button";
	import { Sun, Moon } from "lucide-svelte";
	import { toggleMode } from "mode-watcher";
</script>

<div class="fixed top-5 left-5 drop-shadow-md dark:drop-shadow-none">
	<Button on:click={toggleMode} variant="outline" size="icon">
		<Sun class="dark:hidden" />
		<Moon class="hidden dark:block" />
	</Button>
</div>

<slot />