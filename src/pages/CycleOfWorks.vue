<template>
    <div>
        <cycle-of-works-table></cycle-of-works-table>
        <cycle-of-works-dialog></cycle-of-works-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import CycleOfWorksTable from "@/components/cycle_of_works/CycleOfWorksTable";
    import CycleOfWorksDialog from "@/components/cycle_of_works/CycleOfWorksDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "CycleOfWorks",
        components: {Snackbar, CycleOfWorksDialog, CycleOfWorksTable}
    }
</script>