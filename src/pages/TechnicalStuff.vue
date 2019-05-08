<template>
    <div>
        <universal-table
                :api-link="apiLink"
                :headers="headers"
                :loading="loading"
                table-name="Технічний персонал"
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
        name: "TechnicalStuff",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'technical_stuff',
                headers: [
                    {text: 'ПІБ', value: 'techName', sortable: false},
                    {text: 'Адреса', value: 'address', sortable: false},
                    {text: 'Номер телефону', value: 'phoneNumber', sortable: false},
                    {text: 'Зарплата', value: 'salary', sortable: false},
                    {text: 'Категорія', value: 'categoryName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
                fields: [
                    {label: `Ім'я`, value: `firstName`, type: `textField`, size: 'md4'},
                    {label: `По-батькові`, value: `patronymic`, type: `textField`, size: 'md4'},
                    {label: `Прізвище`, value: `lastName`, type: `textField`, size: 'md4'},
                    {label: `Дата народження`, value: `birthday`, type: `textField`},
                    {label: `Дата прийому на роботу`, value: `hireDate`, type: `textField`},
                    {label: `Адрес`, value: `address`, type: `textField`},
                    {label: `Номер телефону`, value: `phoneNumber`, type: `textField`, size: 'md6'},
                    {label: `Зарплата`, value: `salary`, type: `textField`, size: 'md6'},
                    {
                        label: `Категорія працівника`,
                        value: `category`,
                        type: `select`,
                        linkForData: `category_of_workers`,
                        field: 'categoryName'
                    },
                ],
                items: [],
                loading: true
            }
        },
        mounted() {
            axios.get(`api/${this.apiLink}`)
                .then(response => this.items = response.data
                    .sort((a, b) => a.techName > b.techName ? 1 : -1))
                .catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>