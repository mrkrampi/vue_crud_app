<template>
    <div>
        <universal-table
                :api-link="apiLink"
                table-name="Планери"
                :items="items"
                :headers="headers"
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
        name: "Gliders",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'gliders',
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Кількість сидінь', value: 'countOfSits', sortable: false},
                    {text: 'Довжина', value: 'length', sortable: false},
                    {text: 'Висота', value: 'height', sortable: false},
                    {text: 'Розмах крил', value: 'wingspan', sortable: false},
                    {text: 'Максимальна швидкість', value: 'maxSpeed', sortable: false},
                    {text: 'Вага', value: 'weight', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false, enumerable: false}
                ],
                fields: [
                    {label: 'Назва', value: 'name', type: 'textField'},
                    {label: 'Кількість сидінь', value: 'countOfSits', type: 'textField', size: 'md6'},
                    {label: 'Довжина', value: 'length', type: 'textField', size: 'md6'},
                    {label: 'Висота', value: 'height', type: 'textField', size: 'md6'},
                    {label: 'Розмах крил', value: 'wingspan', type: 'textField', size: 'md6'},
                    {label: 'Максимальна швидкість', value: 'maxSpeed', type: 'textField', size: 'md6'},
                    {label: 'Вага', value: 'weight', type: 'textField', size: 'md6'},
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