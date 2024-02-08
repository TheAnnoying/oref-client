<script>
	import "../app.css";
	import "nprogress/nprogress.css";
	import Navbar from "$lib/components/ui/navbar.svelte";

	import nProgress from "nprogress";
	import { browser } from "$app/environment";
	import { navigating } from "$app/stores";

	import { connected, connectWebsocket } from "$lib/index.js";
	import { Loader2, Info } from "lucide-svelte";
	import { fade } from "svelte/transition";
	import { ModeWatcher } from "mode-watcher";

	connectWebsocket();
	nProgress.configure({
		minimum: 0.4,
		trickleSpeed: 200,
		showSpinner: false,
		easing: "ease-out",
		speed: 300
	});

	$: if(browser) $navigating ? nProgress.start() : nProgress.done();
</script>

<svelte:head>
	<title>קליינט פיקוד העורף</title>
</svelte:head>

<ModeWatcher />

{#if $connected === true}
	<div class="contents">
		<Navbar />
		<a class="md:block hidden fixed bottom-5 right-5" href="https://www.oref.org.il/12761-he/Pakar.aspx" target="_blank"><Info /></a>
		<slot />
	</div>
{:else}
	<div class="fixed bg-background w-screen h-screen flex flex-row gap-5 justify-center items-center z-20" transition:fade={{ duration: 75 }}>
		<Loader2 class="animate-spin h-11 w-11" />
	</div>
{/if}