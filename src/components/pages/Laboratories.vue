<template>
    <div>
        <universal-table
                :api-link="apiLink"
                :headers="headers"
                table-name="Лабораторії"
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
    import {HTTP} from "@/util/HTTP";
    import Snackbar from "@/components/others/Snackbar";
    import UniversalTable from "@/components/UniversalTable";
    import UniversalDialog from "@/components/UniversalDialog";

    export default {
        name: "Laboratories",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'laboratories',
                headers: [
                    {text: 'Назва лабораторії', value: 'name', sortable: false},
                    {text: 'Підприємство', value: 'enterpriseName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false},
                ],
                fields: [
                    {label: 'Назва лабораторії', value: 'name', type: 'textField'},
                    {
                        label: 'Підприємство',
                        value: 'enterprise',
                        type: 'select',
                        linkForData: 'enterprise',
                        field: 'name'
                    },
                ],
                loading: true,
                items: []
            }
        },
        mounted() {
            HTTP.get(`api/${this.apiLink}`)
                .then(response => {
                    this.items = response.data
                        .sort((a, b) => a.name > b.name ? 1 : -1);
                }).catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>
