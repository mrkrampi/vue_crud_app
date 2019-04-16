<template>
    <div>
        <departments-table></departments-table>
        <departments-dialog></departments-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import DepartmentsTable from "@/components/departments/DepartmentsTable";
    import DepartmentsDialog from "@/components/departments/DepartmentsDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "Departments",
        components: {Snackbar, DepartmentsDialog, DepartmentsTable}
    }
</script>