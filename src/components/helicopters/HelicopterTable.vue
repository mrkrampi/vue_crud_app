<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="helicopters"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.countOfSits }}</td>
            <td class="text-xs-left">{{ props.item.maxSpeed }} км/год</td>
            <td class="text-xs-left">{{ props.item.powerOfEngines }} к.с.</td>
            <td class="text-xs-left">{{ props.item.flightRange }} км.</td>
            <td class="text-xs-left">{{ props.item.fuelCapacity }} літр</td>
            <td class="justify-center layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editHelicopter(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteHelicopter(props.item)"
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
    import axios from 'axios';
    import {EventBus} from "@/event-bus";
    import getIndex from "@/utils/utils";

    export default {
        name: "HelicopterTable",
        data() {
            return {
                dialog: false,
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Кількість сидінь', value: 'countOfSits', sortable: false},
                    {text: 'Максимальна швидкість', value: 'maxSpeed', sortable: false},
                    {text: 'Потужність двигунів', value: 'powerOfEngines', sortable: false},
                    {text: 'Дальність польоту', value: 'flightRange', sortable: false},
                    {text: 'Запас палива', value: 'fuelCapacity', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false}
                ],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
                helicopters: []
            }
        },
        methods: {
            deleteHelicopter(helicopter) {
                axios.delete("api/helicopters/" + helicopter.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        const index = this.helicopters.indexOf(helicopter);
                        this.helicopters.splice(index, 1);
                    });
            },
            editHelicopter(helicopter) {
                EventBus.$emit("helicopter-edit-dialog", helicopter)
            }
        },
        mounted() {
            axios.get("api/helicopters")
                .then(res => {
                    this.helicopters = res.data;
                    this.helicopters.sort((a, b) => a.name > b.name ? 1 : -1);
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            EventBus.$on("edit-helicopter", (helicopter) => {
                let index = getIndex(this.helicopters, helicopter.id);
                this.helicopters.splice(index, 1, helicopter);
            });

            EventBus.$on("add-helicopter", (helicopter) => {
                this.workers.push(helicopter);
            });
        }
    }
</script>