<script>
	import "../app.css";
	import "nprogress/nprogress.css";
	import { Button } from "$lib/components/ui/button";
	import Navbar from "$lib/components/ui/navbar.svelte";

	import nProgress from "nprogress";
	import { browser } from "$app/environment";
	import { navigating } from "$app/stores";
	import { onMount } from "svelte";
	import { routes } from "$lib/utils";
	import { page } from "$app/stores";

	import { connected, connectWebsocket } from "$lib/index.js";
	import { Loader2, Info, FastForward, X } from "lucide-svelte";
	import { fade, slide } from "svelte/transition";
	import { expoInOut } from "svelte/easing";
	import { ModeWatcher } from "mode-watcher";

	connectWebsocket();
	nProgress.configure({
		parent: "#navbar",
		minimum: 0.4,
		trickleSpeed: 200,
		showSpinner: false,
		easing: "ease-out",
		speed: 300
	});

	let title, news = { text: null, display: false };
	onMount(async() => {
		const { text } = await import("../news.json");

		if(text?.length > 0) {
			news.text = text;
			news.display = true;
		}
	});

	$: {
		if(browser) $navigating ? nProgress.start() : nProgress.done();
		title = routes[$page.route.id ?? "/404"];
	}
</script>

<svelte:head>
	<title>קליינט פיקוד העורף</title>
</svelte:head>

<ModeWatcher />

{#if news.display === true}
	<div class="center row w-full p-3 bg-accent text-accent-foreground" transition:slide={{ duration: 400, easing: expoInOut }}>
		<Button on:click={() => news.display = false} variant="primary" size="icon" class="absolute left-3 w-5 h-5"><X /></Button>
		<p>{news.text}</p>
	</div>
{/if}

<Button class="fixed -top-16 focus:top-4 left-4 z-50 transition-all gap-2" href="#main">
	Skip Navigation
	<FastForward class="w-3 h-3" />
</Button>

{#if $connected === true && browser}
	<div class="contents">
		<Navbar {title} />
		<a class="md:block hidden fixed bottom-5 right-5" href="https://www.oref.org.il/12761-he/Pakar.aspx" aria-label="קישור למידע באתר פיקוד העורף לגבי התרעות" target="_blank"><Info /></a>
		<main id="main"><slot /></main>
	</div>
{:else}
	<div class="center row fixed w-screen h-screen gap-5 z-20" transition:fade={{ duration: 75 }}>
		<Loader2 class="animate-spin h-11 w-11" />
	</div>
{/if}