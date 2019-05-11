<template>
    <div>
        <made-gliders-table></made-gliders-table>
        <made-gliders-dialog></made-gliders-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import MadeGlidersTable from "@/components/made_gliders/MadeGlidersTable";
    import MadeGlidersDialog from "@/components/made_gliders/MadeGlidersDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "MadeGliders",
        components: {Snackbar, MadeGlidersDialog, MadeGlidersTable}
    }
</script>

<style scoped>

</style>