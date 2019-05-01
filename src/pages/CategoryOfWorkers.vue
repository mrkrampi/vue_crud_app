<template>
    <div>
        <category-of-workers-table></category-of-workers-table>
        <category-of-workers-dialog></category-of-workers-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import CategoryOfWorkersTable from "@/components/category_of_workers/CategoryOfWorkersTable";
    import CategoryOfWorkersDialog from "@/components/category_of_workers/CategoryOfWorkersDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "CategoryOfWorkers",
        components: {Snackbar, CategoryOfWorkersDialog, CategoryOfWorkersTable}
    }
</script>