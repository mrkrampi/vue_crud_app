<template>
    <div>
        <universal-table
                :api-link="apiLink"
                :headers="headers"
                table-name="Цехи"
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
        name: "Departments",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'departments',
                headers: [
                    {text: 'Адреса', value: 'address', sortable: false},
                    {text: 'Начальник цеху', value: 'techName', sortable: false},
                    {text: 'Підприємство', value: 'enterpriseName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
                fields: [
                    {label: 'Адреса', value: 'address', type: 'textField'},
                    {
                        label: 'Начальник цеху',
                        value: 'technicalStuff',
                        type: 'select',
                        linkForData: 'technical_stuff',
                        field: 'name'
                    },
                    {label: 'Підприємство', value: 'enterprise', type: 'select', linkForData: 'enterprise'}
                ],
                loading: true,
                items: []
            }
        },
        mounted() {
            HTTP.get(`api/${this.apiLink}`)
                .then(response => {
                    this.items = response.data
                        .sort((a, b) => a.address > b.address ? 1 : -1);
                }).catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>
