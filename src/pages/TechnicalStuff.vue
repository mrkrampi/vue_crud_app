<template>
    <div>
        <technical-stuff-table></technical-stuff-table>
        <technical-stuff-dialog></technical-stuff-dialog>
        <snackbar></snackbar>
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