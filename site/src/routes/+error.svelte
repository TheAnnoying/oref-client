<script>
    import { page } from "$app/stores";
    import { Button } from "$lib/components/ui/button";
</script>
<div class="center col" style="height: calc(100vh - 83px)">
    <h1 class="text-4xl font-semibold tracking-tight mb-5">{$page.status} - שגיאה</h1>
    <Button href="/" variant="outline">חזרה לעמוד הבית</Button>
</div>