<template>
    <div>
        <categories-table></categories-table>
        <categories-dialog></categories-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import CategoriesTable from "@/components/categories/CategoriesTable";
    import CategoriesDialog from "@/components/categories/CategoriesDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "Categories",
        components: {Snackbar, CategoriesDialog, CategoriesTable}
    }
</script>

<style scoped>

</style>