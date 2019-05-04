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
                :callback="maker"
        ></universal-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import axios from 'axios';
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
                    {text: 'ПІБ', value: 'name', sortable: false},
                    {text: 'Дата народження', value: 'birthday', sortable: false},
                    {text: 'Адрес', value: 'address', sortable: false},
                    {text: 'Номер телефону', value: 'phoneNumber', sortable: false},
                    {text: 'Зарплата', value: 'salary', sortable: false},
                    {text: 'Лабораторія', value: 'laboratoryName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
                laboratories: [],
                fields: [
                    {label: `Ім'я`, value: `firstName`, type: `textField`, size: 'md4'},
                    {label: `По-батькові`, value: `patronymic`, type: `textField`, size: 'md4'},
                    {label: `Прізвище`, value: `lastName`, type: `textField`, size: 'md4'},
                    {label: `Дата народження`, value: `birthday`, type: `textField`},
                    {label: `Адрес`, value: `address`, type: `textField`},
                    {label: `Номер телефону`, value: `phoneNumber`, type: `textField`, size: 'md6'},
                    {label: `Зарплата`, value: `salary`, type: `textField`, size: 'md6'},
                    {
                        label: `Лабораторія`,
                        value: `laboratory`,
                        type: `select`,
                        anyData: this.laboratories,
                        linkForData: `laboratories`
                    },
                ],
                loading: true,
                items: [],
            }
        },
        methods: {
            maker(item) {
                return {
                    ...item,
                    name: `${item.firstName} ${item.lastName}`,
                    laboratoryName: item.laboratory.name
                }
            }
        },
        mounted() {
            axios.get(`api/${this.apiLink}`)
                .then(response => {
                    this.items = response.data;
                    this.items.forEach(item => {
                        item.name = `${item.firstName + ' ' + item.lastName}`;
                        item.laboratoryName = item.laboratory.name;
                    });
                }).catch(error => console.log(error))
                .finally(() => this.loading = false);

            axios.get(`api/laboratories`)
                .then(response => {
                    this.laboratories = response.data;
                    this.fields[7].anyData = this.laboratories;
                }).catch(error => console.log(error));
        }
    }
</script>