<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="planes"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.category.category }}</td>
            <td class="text-xs-left">{{ props.item.countOfSits }}</td>
            <td class="text-xs-left">{{ props.item.maxSpeed }} км/год</td>
            <td class="text-xs-left">{{ props.item.powerOfEngines }} к.с.</td>
            <td class="text-xs-left">{{ props.item.flightRange }} км.</td>
            <td class="text-xs-left">{{ props.item.fuelCapacity }} літр</td>
            <td class="justify-center layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editPlane(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deletePlane(props.item)"
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
    import axios from 'axios/index';
    import {EventBus} from "@/event-bus";
    import getIndex from "@/utils/utils";

    export default {
        name: "PlanesTable",
        data() {
            return {
                dialog: false,
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Тип літака', value: 'typeOfPlane', sortable: false},
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
                planes: []
            }
        },
        methods: {
            deletePlane(plane) {
                axios.delete("api/planes/" + plane.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        const index = this.planes.indexOf(plane);
                        this.planes.splice(index, 1);
                    });
            },
            editPlane(plane) {
                EventBus.$emit("plane-edit-dialog", plane)
            }
        },
        mounted() {
            axios.get("api/planes")
                .then(res => {
                    this.loading = false;
                    this.planes = res.data;
                    this.planes.sort((a, b) => a.name > b.name ? 1 : -1);
                });

            EventBus.$on("edit-plane", (plane) => {
                let index = getIndex(this.planes, plane.id);
                this.planes.splice(index, 1, plane);
            });

            EventBus.$on("add-plane", (plane) => {
                this.planes.push(plane);
            });
        }
    }
</script>

<style scoped>

</style>