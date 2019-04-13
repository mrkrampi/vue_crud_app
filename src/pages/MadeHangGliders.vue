<template>
    <div>
        <made-hang-gliders-table></made-hang-gliders-table>
        <made-hang-gliders-dialog></made-hang-gliders-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>

    import Snackbar from "@/components/others/Snackbar";
    import MadeHangGlidersTable from "@/components/made_hand_gliders/MadeHangGlidersTable";
    import MadeHangGlidersDialog from "@/components/made_hand_gliders/MadeHangGlidersDialog";

    export default {
        name: "MadeHangGliders",
        components: {MadeHangGlidersDialog, MadeHangGlidersTable, Snackbar}
    }
</script>

<style scoped>

</style>