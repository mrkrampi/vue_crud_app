<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="brigades"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.worker.firstName + ' ' + props.item.worker.lastName }}</td>
            <td class="text-xs-left">{{ props.item.area.name }}</td>
            <td class="justify-right layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editBrigade(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteBrigade(props.item)"
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
        name: "BrigadesTable",
        data() {
            return {
                headers: [
                    {text: 'Назва бригади', value: 'name', sortable: false},
                    {text: 'Бригадир', value: 'worker', sortable: false},
                    {text: 'Ділянка', value: 'area', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false},
                ],
                brigades: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteBrigade(brigade) {
                axios.delete("api/brigades/" + brigade.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        let index = this.brigades.findIndex(x => x.id === brigade.id);
                        this.brigades.splice(index, 1);
                    });
            },
            editBrigade(brigade) {
                EventBus.$emit("brigade-edit-dialog", brigade);
            }
        },
        mounted() {
            axios.get("api/brigades")
                .then(res => {
                    this.brigades = res.data;
                    this.brigades.sort((a, b) => a.name > b.name ? 1 : -1)
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            EventBus.$on("edit-brigade", (brigade) => {
                let index = this.brigades.findIndex(x => x.id === brigade.id);
                this.brigades.splice(index, 1, brigade);
            });

            EventBus.$on("add-brigade", (brigade) => {
                this.brigades.unshift(brigade);
            });
        }
    }
</script>