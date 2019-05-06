<template>
    <div>
        <universal-table
                :headers="headers"
                :api-link="apiLink"
                table-name="Ділянки"
                :items="items"
                :loading="loading"
        ></universal-table>
        <universal-dialog
                :api-link="apiLink"
                :fields="fields"
                :callback="itemMaker"
        ></universal-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import axios from 'axios';
    import Snackbar from "@/components/others/Snackbar";
    import UniversalTable from "@/components/UniversalTable";
    import UniversalDialog from "@/components/UniversalDialog";

    export default {
        name: "Areas",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'areas',
                headers: [
                    {text: 'Назва', value: 'name', sortable: true},
                    {text: 'Начальник ділянки', value: 'techName', sortable: false},
                    {text: 'Цех', value: 'departmentName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
                fields: [
                    {label: `Назва`, value: `name`, type: `textField`},
                    {
                        label: `Начальник ділянки`,
                        value: `techName`,
                        type: `select`,
                        linkForData: `technical_stuff`,
                        field: 'techName'
                    },
                    {label: `Цех`, value: `department`, type: `select`, linkForData: 'departments', field: 'address'},
                ],
                items: [],
                loading: true,
            }
        },
        methods: {
            itemMaker(item) {
                // return {
                //     ...item,
                //     techName: `${item.technicalStuff.firstName}  ${item.technicalStuff.lastName}`,
                //     departmentName: item.department.address
                // }
            },
            nameFieldMaker(item) {
                return {
                    ...item,
                }
            }
        },
        mounted() {
            axios.get(`api/${this.apiLink}`)
                .then(response => {
                    this.items = response.data;
                    this.items.forEach(item => {
                        // item.name = `${item.technicalStuff.firstName}  ${item.technicalStuff.lastName}`;
                        item.departmentName = item.department.address;
                    })
                }).catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>