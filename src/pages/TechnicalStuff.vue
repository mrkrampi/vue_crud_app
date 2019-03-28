<template>
    <div>
        <v-toolbar color="white" app>
            <v-toolbar-title>Технічний пресонал</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <technical-stuff-dialog></technical-stuff-dialog>
        </v-toolbar>
        <snackbar></snackbar>
        <technical-stuff-table></technical-stuff-table>
    </div>
</template>

<script>
    import TechnicalStuffDialog from "@/components/technical_stuff/TechnicalStuffDialog";
    import TechnicalStuffTable from "@/components/technical_stuff/TechnicalStuffTable";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "TechnicalStuff",
        components: {Snackbar, TechnicalStuffTable, TechnicalStuffDialog}
    }
</script>

<style scoped>

</style>