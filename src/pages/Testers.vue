<template>
    <div>
        <universal-table
                :headers="headers"
                :api-link="apiLink"
                table-name="Тестери"
                :items="items"
                :loading="loading"
        ></universal-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import UniversalTable from "@/components/UniversalTable";

    export default {
        name: "Testers",
        components: {UniversalTable},
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
                loading: true,
                items: [],
            }
        },
        mounted() {
            axios.get(`api/${this.apiLink}`)
                .then(response => {
                    this.items = response.data;
                    this.items.forEach(item => {
                        item.name = `${item.firstName + ' ' + item.lastName}`
                        item.laboratoryName = item.laboratory.name;
                    });
                }).catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>