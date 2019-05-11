<template>
    <div>
        <made-helicopters-table></made-helicopters-table>
        <made-helicopters-dialog></made-helicopters-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import MadeHelicoptersTable from "@/components/made_helicopters/MadeHelicoptersTable";
    import MadeHelicoptersDialog from "@/components/made_helicopters/MadeHelicoptersDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "MadeHelicopters",
        components: {Snackbar, MadeHelicoptersDialog, MadeHelicoptersTable}
    }
</script>