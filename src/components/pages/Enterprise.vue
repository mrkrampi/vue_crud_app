<template>
    <div>
        <universal-table
                :api-link="apiLink"
                :headers="headers"
                table-name="Підприємства"
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
        name: "Enterprise",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'enterprise',
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Керівник', value: 'managerOfCompany', sortable: false},
                    {text: 'Тип діяльності', value: 'typeOfActivity', sortable: false},
                    {text: 'Адрес', value: 'address', sortable: false},
                    {text: 'Реквізити', value: 'requisites', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
                fields: [
                    {label: 'Назва', value: 'name', type: 'textField'},
                    {label: 'Керівник', value: 'managerOfCompany', type: 'textField'},
                    {label: 'Тип діяльності', value: 'typeOfActivity', type: 'textField'},
                    {label: 'Адрес', value: 'address', type: 'textField'},
                    {label: 'Реквізити', value: 'requisites', type: 'textField'},
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
