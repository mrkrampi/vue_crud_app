<template>
    <div>
        <universal-table
                :api-link="apiLink"
                table-name="Літаки"
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
        name: "Planes",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'planes',
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Тип літака', value: 'categoryName', sortable: false},
                    {text: 'Кількість сидінь', value: 'countOfSits', sortable: false},
                    {text: 'Максимальна швидкість', value: 'maxSpeed', sortable: false},
                    {text: 'Потужність двигунів', value: 'powerOfEngines', sortable: false},
                    {text: 'Дальність польоту', value: 'flightRange', sortable: false},
                    {text: 'Запас палива', value: 'fuelCapacity', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
                fields: [
                    {label: 'Назва', value: 'name', type: 'textField'},
                    {
                        label: 'Тип літака',
                        value: 'category',
                        type: 'select',
                        linkForData: 'categories',
                        field: 'category'
                    },
                    {label: 'Кількість двигунів', value: 'countOfEngines', type: 'textField', size: 'md4'},
                    {label: 'Потужність двигунів', value: 'powerOfEngines', type: 'textField', size: 'md4'},
                    {label: 'Вантажоємність', value: 'loadCapacity', type: 'textField', size: 'md4'},
                    {label: 'Кількість сидінь', value: 'countOfSits', type: 'textField', size: 'md4'},
                    {label: 'Розмах крил', value: 'wingspan', type: 'textField', size: 'md4'},
                    {label: 'Максимальна швидкість', value: 'maxSpeed', type: 'textField', size: 'md4'},
                    {label: 'Маса', value: 'weight', type: 'textField', size: 'md4'},
                    {label: 'Максимальна маса', value: 'maxWeight', type: 'textField', size: 'md4'},
                    {label: 'Довжина', value: 'length', type: 'textField', size: 'md4'},
                    {label: 'Висота', value: 'height', type: 'textField', size: 'md4'},
                    {label: 'Запас палива', value: 'fuelCapacity', type: 'textField', size: 'md4'},
                    {label: 'Дальність ходу', value: 'flightRange', type: 'textField', size: 'md4'},
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