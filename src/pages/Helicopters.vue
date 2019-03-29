<template>
    <div>
        <v-toolbar color="white" app>
            <v-toolbar-title>Гелікоптери</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <helicopters-dialog></helicopters-dialog>
        </v-toolbar>
        <helicopter-table></helicopter-table>
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

<style scoped>

</style>