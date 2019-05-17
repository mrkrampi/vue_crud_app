<template>
    <div>
        <universal-table
                :api-link="apiLink"
                :headers="headers"
                :table-name="tableName"
                :loading="loading"
                :items="items"
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
    import UniversalTable from "@/components/UniversalTable";
    import UniversalDialog from "@/components/UniversalDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "MadeProducts",
        components: {Snackbar, UniversalDialog, UniversalTable},
        props: {
            apiLink: String,
            tableName: String
        },
        data() {
            return {
                headers: [
                    {text: 'Назва виробу', value: 'productName', sortable: false},
                    {text: 'Цикл робіт', value: 'cycleOfWorkName', sortable: false},
                    {text: 'Дата виготовлення', value: 'dateOfManufacture', sortable: false},
                    {text: 'Готовність', value: 'ready', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
                fields: [
                    {label: 'Назва виробу', value: 'product', type: 'select', linkForData: this.apiLink.slice(5)},
                    {label: 'Цикл робіт', value: 'cycleOfWork', type: 'select', linkForData: 'cycle_of_works'},
                    {label: 'Дата виготовлення', value: 'dateOfManufacture', type: `datePicker`, size: 'md4'},
                    {label: 'Готовність', value: 'ready', type: 'textField', size: "md8"},
                ],
                loading: true,
                items: []
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
