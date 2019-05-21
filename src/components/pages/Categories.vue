<template>
    <div>
        <universal-table
                :api-link="apiLink"
                :headers="headers"
                table-name="Категорії виробів"
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
    import {HTTP} from "@/util/HTTP";
    import Snackbar from "@/components/others/Snackbar";
    import UniversalTable from "@/components/UniversalTable";
    import UniversalDialog from "@/components/UniversalDialog";

    export default {
        name: "Categories",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'categories',
                headers: [
                    {text: 'Назва категорії', value: 'category', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false},
                ],
                fields: [
                    {label: 'Назва категорії', value: 'category', type: 'textField'}
                ],
                loading: true,
                items: [],
            }
        },
        mounted() {
            HTTP.get(`api/${this.apiLink}`)
                .then(response => this.items = response.data
                    .sort((a, b) => a.category > b.category ? 1 : -1))
                .catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>
