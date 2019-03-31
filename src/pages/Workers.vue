<template>
    <div>
        <workers-dialog></workers-dialog>
        <workers-table></workers-table>
        <snackbar></snackbar>
    </div>
</template>

<script>

    import WorkersDialog from "@/components/workers/WorkersDialog";
    import WorkersTable from "@/components/workers/WorkersTable";
    import Snackbar from "@/components/others/Snackbar";
    export default {
        name: "Workers",
        components: {Snackbar, WorkersTable, WorkersDialog}
    }
</script>

<style scoped>

</style>