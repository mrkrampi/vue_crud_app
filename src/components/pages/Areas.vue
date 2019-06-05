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
                        value: `technicalStuff`,
                        type: `select`,
                        linkForData: `technical_stuff`,
                    },
                    {label: `Цех`, value: `department`, type: `select`, linkForData: 'departments', field: 'address'},
                ],
                items: [],
                loading: true,
            }
        },
        async mounted() {
            try {
                const { data } = await HTTP.get(`api/${this.apiLink}`);
                this.items = data;
            } catch (e) {
                console.log(e);
            } finally {
                this.loading = false;
            }
        }
    }
</script>
