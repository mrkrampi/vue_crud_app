<template>
    <div>
        <gliders-table></gliders-table>
        <gliders-dialog></gliders-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import GlidersTable from "@/components/gliders/GlidersTable";
    import GlidersDialog from "@/components/gliders/GlidersDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "Gliders",
        components: {Snackbar, GlidersDialog, GlidersTable}
    }
</script>