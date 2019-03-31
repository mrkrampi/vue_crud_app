<template>
    <div>
        <hand-dliders-table></hand-dliders-table>
        <hand-dliders-dialog></hand-dliders-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import HandDlidersTable from "@/components/hand_dliders/HandDlidersTable";
    import HandDlidersDialog from "@/components/hand_dliders/HandDlidersDialog";
    import Snackbar from "@/components/others/Snackbar";
    export default {
        name: "HandDliders",
        components: {Snackbar, HandDlidersDialog, HandDlidersTable}
    }
</script>

<style scoped>

</style>