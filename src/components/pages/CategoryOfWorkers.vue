<template>
    <div>
        <universal-table
                :api-link="apiLink"
                :headers="headers"
                table-name="Категорії працівників"
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
    import Snackbar from "@/components/others/Snackbar";
    import UniversalTable from "@/components/UniversalTable";
    import UniversalDialog from "@/components/UniversalDialog";

    export default {
        name: "CategoryOfWorkers",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'category_of_workers',
                headers: [
                    {text: 'Назва категорії', value: 'categoryName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false},
                ],
                fields: [
                    {label: 'Назва категорії', value: 'categoryName', type: 'textField'}
                ],
                loading: true,
                items: []
            }
        },
        mounted() {
            axios.get(`api/${this.apiLink}`)
                .then(response => this.items = response.data
                    .sort((a, b) => a.categoryName > b.categoryName ? 1 : -1))
                .catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>