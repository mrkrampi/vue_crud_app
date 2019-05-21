<template>
    <div>
        <universal-table
                :api-link="apiLink"
                :headers="headers"
                table-name="Ракети"
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
        name: "Rockets",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'rockets',
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Маса', value: 'weight', sortable: false},
                    {text: 'Дальність польоту', value: 'flightRange', sortable: false},
                    {text: 'Сила заряду', value: 'powerOfCharge', sortable: false},
                    {text: 'Тип ракети', value: 'categoryName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
                fields: [
                    {label: 'Назва', value: 'name', type: 'textField'},
                    {label: 'Маса', value: 'weight', type: 'textField', size: 'md4'},
                    {label: 'Дальність польоту', value: 'flightRange', type: 'textField', size: 'md4'},
                    {label: 'Сила заряду', value: 'powerOfCharge', type: 'textField', size: 'md4'},
                    {
                        label: 'Тип ракети',
                        value: 'category',
                        type: 'select',
                        linkForData: 'categories',
                        field: 'category'
                    }
                ],
                loading: true,
                items: []
            }
        },
        mounted() {
            HTTP.get(`api/${this.apiLink}`)
                .then(response => this.items = response.data
                    .sort((a, b) => a.name > b.name ? 1 : -1))
                .catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>
