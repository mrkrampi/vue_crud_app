<template>
    <div>
        <universal-table
                :headers="headers"
                :api-link="apiLink"
                table-name="Тестери"
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
    import UniversalTable from "@/components/UniversalTable";
    import UniversalDialog from "@/components/UniversalDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "Testers",
        components: {Snackbar, UniversalDialog, UniversalTable},
        data() {
            return {
                apiLink: 'testers',
                headers: [
                    {text: 'ПІБ', value: 'testerName', sortable: false},
                    {text: 'Дата народження', value: 'birthday', sortable: false},
                    {text: 'Адрес', value: 'address', sortable: false},
                    {text: 'Номер телефону', value: 'phoneNumber', sortable: false},
                    {text: 'Зарплата', value: 'salary', sortable: false},
                    {text: 'Лабораторія', value: 'laboratoryName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
                fields: [
                    {label: `Ім'я`, value: `firstName`, type: `textField`, size: 'md4'},
                    {label: `По-батькові`, value: `patronymic`, type: `textField`, size: 'md4'},
                    {label: `Прізвище`, value: `lastName`, type: `textField`, size: 'md4'},
                    {label: `Дата народження`, value: `birthday`, type: `datePicker`, size: 'md6'},
                    {label: `Дата прийому на роботу`, value: `hireDate`, type: `datePicker`, size: 'md6'},
                    {label: `Адрес`, value: `address`, type: `textField`},
                    {label: `Номер телефону`, value: `phoneNumber`, type: `textField`, size: 'md6'},
                    {label: `Зарплата`, value: `salary`, type: `textField`, size: 'md6'},
                    {label: `Лабораторія`, value: `laboratory`, type: `select`, linkForData: `laboratories`},
                ],
                loading: true,
                items: [],
            }
        },
        mounted() {
            axios.get(`api/${this.apiLink}`)
                .then(response => this.items = response.data
                    .sort((a, b) => a.testerName > b.testerName ? 1 : -1))
                .catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>
