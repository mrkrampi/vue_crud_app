<template>
    <div>
        <v-toolbar color="white" app>
            <v-toolbar-title>Ракети</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <rockets-dialog></rockets-dialog>
        </v-toolbar>
        <rockets-table></rockets-table>
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