<template>
    <div>
        <universal-table
                :api-link="apiLink"
                :headers="headers"
                tableName="Ділянки"
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
        name: "Brigades",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'brigades',
                headers: [
                    {text: 'Назва бригади', value: 'name', sortable: false},
                    {text: 'Бригадир', value: 'manager', sortable: false},
                    {text: 'Ділянка', value: 'areaName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false},
                ],
                fields: [
                    {label: 'Назва бригади', value: 'name', type: 'textField'},
                    {label: 'Бригадир', value: 'worker', type: 'select', linkForData: 'technical_stuff', field: 'name'},
                    {label: 'Ділянка', value: 'area', type: 'select', linkForData: 'areas'},
                ],
                loading: true,
                items: [],
            }
        },
        async mounted() {
            try {
                const { data } = await HTTP.get(`api/${this.apiLink}`);
                this.items = data;
                this.items.sort((a, b) => a.name > b.name ? 1 : -1);
            } catch (e) {
                console.log(e);
            } finally {
                this.loading = false;
            }
        }
    }
</script>
