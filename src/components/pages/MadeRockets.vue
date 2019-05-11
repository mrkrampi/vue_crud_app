<template>
    <div>
        <made-rockets-table></made-rockets-table>
        <made-rockets-dialog></made-rockets-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import MadeRocketsTable from "@/components/made_rockets/MadeRocketsTable";
    import MadeRocketsDialog from "@/components/made_rockets/MadeRocketsDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "MadeRockets",
        components: {Snackbar, MadeRocketsDialog, MadeRocketsTable}
    }
</script>

<style scoped>

</style>