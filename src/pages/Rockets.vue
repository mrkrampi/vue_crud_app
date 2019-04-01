<template>
    <div>
        <rockets-table></rockets-table>
        <rockets-dialog></rockets-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import Snackbar from "@/components/others/Snackbar";
    import RocketsTable from "@/components/rockets/RocketsTable";
    import RocketsDialog from "@/components/rockets/RocketsDialog";
    export default {
        name: "Rockets",
        components: {RocketsDialog, RocketsTable, Snackbar}
    }
</script>

<style scoped>

</style>