<template>
    <div>
        <product-tests-table :link="link" :name-for-product="nameForProduct"></product-tests-table>
        <product-tests-dialog :link="link" :name-for-product="nameForProduct"></product-tests-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import ProductTestsTable from "@/components/product_tests/ProductTestsTable";
    import ProductTestsDialog from "@/components/product_tests/ProductTestsDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "ProductsTests",
        props: {
            link: String,
            nameForProduct: String
        },
        components: {Snackbar, ProductTestsDialog, ProductTestsTable}
    }
</script>