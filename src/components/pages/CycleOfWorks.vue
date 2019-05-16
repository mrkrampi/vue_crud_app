<template>
    <div>
        <universal-table
                :headers="headers"
                :api-link="apiLink"
                table-name="Цикли робіт"
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
    import axios from 'axios/index';
    import Snackbar from "@/components/others/Snackbar";
    import UniversalTable from "@/components/UniversalTable";
    import UniversalDialog from "@/components/UniversalDialog";

    export default {
        name: "CycleOfWorks",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'cycle_of_works',
                headers: [
                    {text: 'Цикл робіт', value: 'name', sortable: false},
                    {text: 'Опис', value: 'description', sortable: false},
                    {text: 'Бригада', value: 'brigadeName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false},
                ],
                fields: [
                    {label: 'Цикл робіт', value: 'name', type: 'textField'},
                    {label: 'Опис', value: 'description', type: 'textField'},
                    {
                        label: `Бригада`,
                        value: `brigade`,
                        type: `select`,
                        linkForData: `brigades`,
                        field: `name`
                    }
                ],
                items: [],
                loading: true,
            }
        },
        mounted() {
            axios.get(`api/${this.apiLink}`)
                .then(response => {
                    this.items = response.data
                        .sort((a, b) => a.name > b.name ? 1 : -1);
                }).catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>
