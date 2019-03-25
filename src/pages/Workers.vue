<template>
    <div>
        <v-toolbar color="white" app>
            <v-toolbar-title>Працівники</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <workers-dialog></workers-dialog>
        </v-toolbar>
        <workers-table></workers-table>
    </div>
</template>

<script>

    import WorkersDialog from "@/components/workers/WorkersDialog";
    import WorkersTable from "@/components/workers/WorkersTable";
    export default {
        name: "Workers",
        components: {WorkersTable, WorkersDialog}
    }
</script>

<style scoped>

</style>