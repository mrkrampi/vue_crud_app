<template>
    <div>
        <helicopter-table></helicopter-table>
        <helicopters-dialog></helicopters-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import Snackbar from "@/components/others/Snackbar";
    import HelicopterTable from "@/components/helicopters/HelicopterTable";
    import HelicoptersDialog from "@/components/helicopters/HelicoptersDialog";

    export default {
        name: "Helicopters",
        components: {HelicoptersDialog, HelicopterTable, Snackbar}
    }
</script>