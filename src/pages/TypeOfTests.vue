<template>
    <div>
        <type-of-tests-table></type-of-tests-table>
        <type-of-tests-dialog></type-of-tests-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import TypeOfTestsTable from "@/components/type_of_tests/TypeOfTestsTable";
    import TypeOfTestsDialog from "@/components/type_of_tests/TypeOfTestsDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "TypeOfTests",
        components: {Snackbar, TypeOfTestsDialog, TypeOfTestsTable}
    }
</script>