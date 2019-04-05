<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="technicalStuff"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.firstName + ' ' + props.item.lastName }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>
            <td class="text-xs-left">{{ props.item.phoneNumber }}</td>
            <td class="text-xs-left">{{ props.item.salary }}</td>
            <td class="text-xs-left">{{ props.item.category.categoryName }}</td>
            <td class="justify-center layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editTech(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteTech(props.item)"
                >
                    delete
                </v-icon>
            </td>
        </template>
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:no-data>
        </template>
    </v-data-table>
</template>

<script>
    import axios from 'axios'
    import {EventBus} from "@/event-bus";
    import getIndex from "../../utils/utils.js"

    export default {
        name: "TechnicalStuffTable",
        data() {
            return {
                headers: [
                    {text: 'ПІБ', value: 'name', sortable: false},
                    {text: 'Адреса', value: 'address', sortable: false},
                    {text: 'Номер телефону', value: 'phoneNumber', sortable: false},
                    {text: 'Зарплата', value: 'Salary', sortable: false},
                    {text: 'Посада', value: 'position', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false}
                ],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
                technicalStuff: []
            }
        },
        methods: {
            editTech(tech) {
                EventBus.$emit("tech-edit-dialog", tech)
            },
            deleteTech(tech) {
                axios.delete("api/technical_stuff/" + tech.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        const index = this.technicalStuff.indexOf(tech);
                        this.technicalStuff.splice(index, 1);
                    }).finally(() => this.loading = false);
            }
        },
        mounted() {
            axios.get("api/technical_stuff")
                .then(res => {
                    this.technicalStuff = res.data;
                    this.technicalStuff.sort((a, b) => {
                        let aFullName = a.firstName + " " + a.lastName;
                        let bFullName = b.firstName + " " + b.lastName;

                        return aFullName > bFullName ? 1 : -1;
                    });
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            EventBus.$on("edit-tech", (tech) => {
                let index = getIndex(this.technicalStuff, tech.id);
                this.technicalStuff.splice(index, 1, tech);
            });

            EventBus.$on("add-tech", (worker) => {
                this.technicalStuff.push(worker);
            });
        }
    }
</script>