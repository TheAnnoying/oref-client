<script lang="ts">
	import type { WithElementRef, WithoutChildren } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> = $props();
</script>

<div
	bind:this={ref}
	class={cn("skeleton bg-muted rounded-md bg-[length:200%]", className)}
	{...restProps}
></div>
<style>
	.skeleton {
		will-change: background-position;
		animation: skeleton 1.8s ease-in-out infinite;
		background-image: linear-gradient(105deg, transparent 0%, transparent 40%, var(--color-secondary-foreground) 50%, transparent 60%, transparent 100%);
	}

	@keyframes skeleton {
		0% {
			background-position: 150%;
		}
		100% {
			background-position: -50%;
		}
	}
</style>