<script>
	import * as Tabs from "$lib/components/ui/tabs";
	import Alert from "$lib/components/ui/alert.svelte";
	import History from "$lib/components/ui/history.svelte";
</script>

<Alert />

<div class="mt-32 mb-10">
    <Tabs.Root value="day" class="flex flex-col mt-10 items-center">
        <Tabs.List>
            <Tabs.Trigger value="day">יממה אחרונה</Tabs.Trigger>
            <Tabs.Trigger value="week">שבוע אחרון</Tabs.Trigger>
            <Tabs.Trigger value="month">חודש אחרון</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="day">
            <History type="day"/>
        </Tabs.Content>
        <Tabs.Content value="week">
            <History type="week" />
        </Tabs.Content>
        <Tabs.Content value="month">
            <History type="month" />
        </Tabs.Content>
    </Tabs.Root>
</div>