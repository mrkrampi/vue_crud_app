<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="workers"
            :pagination.sync="pagination"
            class="elevation-10"
    >
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
                        @click="editWorker(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteWorker(props.item)"
                >
                    delete
                </v-icon>
            </td>
        </template>
        <template v-slot:no-data>
        </template>
    </v-data-table>
</template>

<script>
    import axios from 'axios'
    import {EventBus} from "@/event-bus";
    import getIndex from "../../utils/utils.js"

    export default {
        name: "WorkersTable",
        data() {
            return {
                dialog: false,
                headers: [
                    {text: 'ПІБ', value: 'name', sortable: false},
                    {text: 'Адреса', value: 'address', sortable: false},
                    {text: 'Номер телефону', value: 'phoneNumber', sortable: false},
                    {text: 'Зарплата', value: 'Salary', sortable: false},
                    {text: 'Посада', value: 'position', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false}
                ],
                pagination: {
                    rowsPerPage: 10
                },
                workers: []
            }
        },
        methods: {
            editWorker(worker) {
                EventBus.$emit("workers-edit-dialog", worker);
            },
            deleteWorker(worker) {
                axios.delete("api/workers/" + worker.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        const index = this.workers.indexOf(worker);
                        this.workers.splice(index, 1);
                    });
            }
        },
        created() {
            axios.get("api/workers")
                .then(res => {
                    this.workers = res.data;
                    this.workers.sort((a, b) => {
                        let aFullName = a.firstName + " " + a.lastName;
                        let bFullName = b.firstName + " " + b.lastName;

                        return aFullName > bFullName ? 1 : -1;
                    });
                });
        },
        mounted() {
            EventBus.$on("edit-worker", (worker) => {
                let index = getIndex(this.workers, worker.id);
                this.workers.splice(index, 1, worker);
            });

            EventBus.$on("add-worker", (worker) => {
                this.workers.push(worker);
            });
        }
    }
</script>

<style scoped>

</style>