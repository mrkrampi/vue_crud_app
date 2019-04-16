<template>
    <div>
        <areas-table></areas-table>
        <areas-dialog></areas-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import AreasTable from "@/components/areas/AreasTable";
    import AreasDialog from "@/components/areas/AreasDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "Areas",
        components: {Snackbar, AreasDialog, AreasTable}
    }
</script>