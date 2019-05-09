<template>
    <div>
        <universal-table
                :api-link="apiLink"
                table-name="Дельтаплани"
                :headers="headers"
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
    import axios from 'axios';
    import Snackbar from "@/components/others/Snackbar";
    import UniversalTable from "@/components/UniversalTable";
    import UniversalDialog from "@/components/UniversalDialog";

    export default {
        name: "HangGliders",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'hang_gliders',
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Розмах крил', value: 'wingspan', sortable: false},
                    {text: 'Вага', value: 'weight', sortable: false},
                    {text: 'Максимальна швидкість', value: 'maxSpeed', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
                fields: [
                    {label: 'Назва', value: 'name', type: 'textField'},
                    {label: 'Розмах крил', value: 'wingspan', type: 'textField', size: 'md6'},
                    {label: 'Вага', value: 'weight', type: 'textField', size: 'md6'},
                    {label: 'Максимальна швидкість', maxSpeed: 'name', type: 'textField'},
                ],
                loading: true,
                items: []
            }
        },
        mounted() {
            axios.get(`api/${this.apiLink}`)
                .then(response => this.items = response.data
                    .sort((a, b) => a.name > b.name ? 1 : -1))
                .catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>