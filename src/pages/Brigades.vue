<template>
    <div>
        <brigades-table></brigades-table>
        <brigades-dialog></brigades-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import BrigadesTable from "@/components/brigades/BrigadesTable";
    import BrigadesDialog from "@/components/brigades/BrigadesDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "Brigades",
        components: {Snackbar, BrigadesDialog, BrigadesTable}
    }
</script>