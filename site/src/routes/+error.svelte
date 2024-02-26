<script>
    import { page } from "$app/stores";
    const type = [ "cat", "dog" ][Math.floor(Math.random()*2)];
</script>
<img src="https://http.{type}/{$page.status}.jpg" alt="A {type} with the caption - 404 page not found" />
<style>
    img {
        @apply fixed w-screen bottom-0 right-0;
        @apply hue-rotate-180 invert dark:hue-rotate-0 dark:invert-0;
        height: calc(100vh - 73px);
    }
</style>