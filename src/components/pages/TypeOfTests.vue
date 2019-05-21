<template>
    <div>
        <universal-table
                :api-link="apiLink"
                :headers="headers"
                table-name="Типи тестів"
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
        name: "TypeOfTests",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'type_of_tests',
                headers: [
                    {text: 'Назва тесту', value: 'name', sortable: false},
                    {text: 'Лабораторія', value: 'laboratoryName', sortable: false},
                    {text: 'Обладнання', value: 'equipmentName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false},
                ],
                fields: [
                    {label: 'Назва тесту', value: 'name', type: 'textField'},
                    {
                        label: `Лабораторія`,
                        value: `laboratory`,
                        type: `select`,
                        linkForData: `laboratories`,
                        field: `name`
                    },
                    {
                        label: `Обладнання`,
                        value: `equipment`,
                        type: `select`,
                        linkForData: `equipments`,
                        field: `name`
                    }
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
