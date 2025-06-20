<script lang="ts">
    import { preferredLocations } from "$lib/index.ts";
    import { Badge } from "$lib/components/ui/badge";
    let { alertLocations } = $props();
</script>
{#each $preferredLocations.flatMap(e => e[0]) as cities}
    {#each alertLocations.filter(e => cities.includes(e)) as city}
        {#each $preferredLocations.find(e => e[0] == city)?.[1] ?? [] as tag}
            <Badge variant="outline" class="bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-400 dark:border-yellow-500/30 border-t-yellow-500/30! dark:border-b-yellow-500/30! border-b-yellow-400!">{tag}</Badge>
        {/each}
    {/each}
{/each}