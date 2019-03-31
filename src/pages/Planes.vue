<template>
    <div>
        <v-toolbar color="white" app>
            <v-toolbar-title>Літаки</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
        </v-toolbar>
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

<style scoped>

</style>