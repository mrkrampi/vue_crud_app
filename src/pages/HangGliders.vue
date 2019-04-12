<template>
    <div>
        <hang-gliders-table></hang-gliders-table>
        <hang-gliders-dialog></hang-gliders-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>

    import Snackbar from "@/components/others/Snackbar";
    import HangGlidersTable from "@/components/hang_gliders/HangGlidersTable";
    import HangGlidersDialog from "@/components/hang_gliders/HangGlidersDialog";

    export default {
        name: "HangGliders",
        components: {HangGlidersDialog, HangGlidersTable, Snackbar}
    }
</script>