<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="rockets"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.weight }}</td>
            <td class="text-xs-left">{{ props.item.flightRange }} км.</td>
            <td class="text-xs-left">{{ props.item.powerOfCharge }}</td>
            <td class="text-xs-left">{{ props.item.typeOfRocket.category }}</td>
            <td class="justify-center layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editRocket(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteRocket(props.item)"
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

    export default {
        name: "RocketsTable",
        data() {
            return {
                dialog: false,
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Маса', value: 'weight', sortable: false},
                    {text: 'Дальність польоту', value: 'flightRange', sortable: false},
                    {text: 'Сила заряду', value: 'powerOfCharge', sortable: false},
                    {text: 'Тип ракети', value: 'typeOfRocket', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false}
                ],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
                rockets: []
            }
        },
        methods: {
            editRocket(rocket) {
                EventBus.$emit("rockets-edit-dialog", rocket)
            },
            deleteRocket(rocket) {
                axios.delete("api/rockets/" + rocket.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        const index = this.helicopters.indexOf(rocket);
                        this.rockets.splice(index, 1);
                    });
            }
        },
        mounted() {
            axios.get("api/rockets")
                .then(res => {
                    this.rockets = res.data;
                    this.rockets.sort((a, b) => a.name > b.name ? 1 : -1);
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            EventBus.$on("edit-rocket", (rocket) => {
                let index = this.rockets.findIndex(x => x.id === rocket.id);
                this.rockets.splice(index, 1, rocket);
            });

            EventBus.$on("add-rocket", (rocket) => {
                this.rockets.push(rocket);
            });
        }
    }
</script>