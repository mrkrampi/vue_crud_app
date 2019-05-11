<template>
    <div>
        <universal-table
                :api-link="apiLink"
                :headers="headers"
                :table-name="tableName"
                :items="items"
                :loading="loading"
        ></universal-table>
        <universal-dialog
                :api-link="apiLink"
                :fields="fields"
        ></universal-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import axios from 'axios/index';
    import Snackbar from "@/components/others/Snackbar";
    import UniversalTable from "@/components/UniversalTable";
    import UniversalDialog from "@/components/UniversalDialog";

    export default {
        name: "ProductsTests",
        components: {UniversalDialog, UniversalTable, Snackbar},
        props: {
            apiLink: String,
            tableName: String
        },
        data() {
            return {
                headers: [
                    {text: 'Назва продукту', value: 'productName', sortable: false},
                    {text: 'Назва тесту', value: 'typeOfTestName', sortable: false},
                    {text: 'Дата тесту', value: 'testDate', sortable: false},
                    {text: 'Результат', value: 'result', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false},
                ],
                fields: [
                    {
                        label: 'Назва продукту',
                        value: 'product',
                        type: 'select',
                        linkForData: this.apiLink.slice(0, this.apiLink.length - 6)
                    },
                    {label: 'Назва тесту', value: 'typeOfTest', type: 'select', linkForData: 'type_of_tests'},
                    {label: 'Дата тесту', value: 'testDate', type: 'textField'},
                    {label: 'Результат', value: 'result', type: 'textField'},
                ],
                items: [],
                loading: true
            }
        },
        watch: {
            apiLink() {
                this.loading = true;
                this.items = [];
                this.loadItems();
            }
        },
        methods: {
            loadItems() {
                axios.get(`api/${this.apiLink}`)
                    .then(response => {
                        this.items = response.data
                            .sort((a, b) => a.productName > b.productName ? 1 : -1);
                    }).catch(error => console.log(error))
                    .finally(() => this.loading = false);
            }
        },
        mounted() {
            this.loadItems();
        }
    }
</script>