<template>
    <div>
        <planes-table></planes-table>
        <planes-dialog></planes-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import PlanesTable from "@/components/planes/PlanesTable";
    import Snackbar from "@/components/others/Snackbar";
    import PlanesDialog from "@/components/planes/PlanesDialog";

    export default {
        name: "Planes",
        components: {PlanesDialog, Snackbar, PlanesTable}
    }
</script>