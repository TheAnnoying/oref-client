<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>
<div class={cn("skeleton", className)} {...$$restProps} />
<style>
	.skeleton {
		will-change: background-position;
		animation: skeleton 1.8s ease-in-out infinite;
		background-image: linear-gradient(105deg, transparent 0%, transparent 40%, hsl(var(--secondary-foreground)) 50%, transparent 60%, transparent 100%);
		@apply bg-muted rounded-md bg-[length:200%];
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