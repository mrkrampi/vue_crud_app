<template>
    <div>
        <workers-table></workers-table>
        <workers-dialog></workers-dialog>
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