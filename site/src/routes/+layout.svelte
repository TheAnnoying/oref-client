<script lang="ts">
	import "../app.css";
	import "nprogress/nprogress.css";
	import { Button } from "$lib/components/ui/button";
	import Navbar from "$lib/components/ui/navbar.svelte";
    import InteractionBeforeAudioDialog from "$lib/components/ui/interaction-before-audio-dialog.svelte";

	import nProgress from "nprogress";
	import { browser } from "$app/environment";
	import { navigating } from "$app/state";
	import { page } from "$app/state";

	import { connected, connectWebsocket } from "$lib/index.ts";
	import { Loader, Info, FastForward } from "@lucide/svelte";
	import { fade } from "svelte/transition";
	import { ModeWatcher } from "mode-watcher";
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();

	connectWebsocket();
	nProgress.configure({
		parent: "body",
		minimum: 0.4,
		trickleSpeed: 200,
		showSpinner: false,
		easing: "ease-out",
		speed: 300
	});

	$effect(() => {
		if(navigating.to) nProgress.start()
		else nProgress.done();
	});
</script>

<svelte:head>
	<title>קליינט פיקוד העורף</title>
</svelte:head>

<ModeWatcher />
<InteractionBeforeAudioDialog />

<Button class="fixed -top-16 focus:top-4 left-4 z-50 transition-all gap-2" href="#main">
	Skip Navigation
	<FastForward class="w-3 h-3" />
</Button>

{#if $connected === true && browser}
	<div class="contents">
		<Navbar route={page.route.id} />
		<a class="md:block hidden fixed bottom-5 right-5" href="https://www.oref.org.il/12761-he/Pakar.aspx" aria-label="קישור למידע באתר פיקוד העורף לגבי התרעות" target="_blank"><Info /></a>
		<main id="main">{@render children?.()}</main>
	</div>
{:else}
	<div class="center row fixed w-screen h-screen gap-5 z-20" transition:fade={{ duration: 75 }}>
		<Loader size=24 class="animate-spin" />
	</div>
{/if}