<script>
	import "../app.css";
	import "nprogress/nprogress.css";
	import { Button } from "$lib/components/ui/button";
	import Navbar from "$lib/components/ui/navbar.svelte";

	import nProgress from "nprogress";
	import { browser } from "$app/environment";
	import { navigating } from "$app/stores";

	import { connected, connectWebsocket } from "$lib/index.js";
	import { Loader2, Info, FastForward } from "lucide-svelte";
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

<Button class="fixed -top-16 focus:top-4 left-4 z-50 transition-all gap-2" href="#main">
	Skip Navigation
	<FastForward class="w-3 h-3" />
</Button>

{#if $connected === true}
	<div class="contents">
		<Navbar />
		<a class="md:block hidden fixed bottom-5 right-5" href="https://www.oref.org.il/12761-he/Pakar.aspx" target="_blank"><Info /></a>
		<main id="main"><slot /></main>
	</div>
{:else}
	<div class="fixed bg-background w-screen h-screen flex flex-row gap-5 justify-center items-center z-20" transition:fade={{ duration: 75 }}>
		<Loader2 class="animate-spin h-11 w-11" />
	</div>
{/if}