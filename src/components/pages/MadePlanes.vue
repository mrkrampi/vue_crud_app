<template>
    <div>
        <made-planes-table></made-planes-table>
        <made-planes-dialog></made-planes-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import MadePlanesTable from "@/components/made_planes/MadePlanesTable";
    import MadePlanesDialog from "@/components/made_planes/MadePlanesDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "MadePlanes",
        components: {Snackbar, MadePlanesDialog, MadePlanesTable}
    }
</script>

<style scoped>

</style>