<template>
    <div>
        <universal-table
                :api-link="apiLink"
                :headers="headers"
                :loading="loading"
                table-name="Працівники"
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
    import {HTTP} from '@/util/HTTP';
    import Snackbar from "@/components/others/Snackbar";
    import UniversalTable from "@/components/UniversalTable";
    import UniversalDialog from "@/components/UniversalDialog";

    export default {
        name: "Workers",
        components: {UniversalDialog, UniversalTable, Snackbar},
        data() {
            return {
                apiLink: 'workers',
                headers: [
                    {text: 'ПІБ', value: 'name', sortable: false},
                    {text: 'Адреса', value: 'address', sortable: false},
                    {text: 'Номер телефону', value: 'phoneNumber', sortable: false},
                    {text: 'Зарплата', value: 'salary', sortable: false},
                    {text: 'Категорія', value: 'categoryName', sortable: false},
                    {text: 'Бригада', value: 'brigadeName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
                fields: [
                    {label: `Ім'я`, value: `firstName`, type: `textField`, size: 'md4', req: true},
                    {label: `По-батькові`, value: `patronymic`, type: `textField`, size: 'md4'},
                    {label: `Прізвище`, value: `lastName`, type: `textField`, size: 'md4'},
                    {label: `Дата народження`, value: `birthday`, type: `datePicker`, size: 'md6'},
                    {label: `Дата прийому на роботу`, value: `hireDate`, type: `datePicker`, size: 'md6'},
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
                    {
                        label: `Бригада`,
                        value: `brigade`,
                        type: `select`,
                        linkForData: `brigades`,
                        field: `name`
                    }
                ],
                items: [],
                loading: true
            }
        },
        mounted() {
            HTTP.get(`api/${this.apiLink}`)
                .then(response => this.items = response.data
                    .sort((a, b) => a.workerName > b.workerName ? 1 : -1))
                .catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>
