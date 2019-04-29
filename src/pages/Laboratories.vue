<template>
    <div>
        <laboratory-table></laboratory-table>
        <laboratory-dialog></laboratory-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import LaboratoryTable from "@/components/laboratory/LaboratoryTable";
    import LaboratoryDialog from "@/components/laboratory/LaboratoryDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "Laboratories",
        components: {Snackbar, LaboratoryDialog, LaboratoryTable}
    }
</script>