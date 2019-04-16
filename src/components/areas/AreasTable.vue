<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="areas"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.technicalStuff.firstName + ' ' + props.item.technicalStuff.lastName }}</td>
            <td class="text-xs-left">{{ props.item.department.address }}</td>
            <td class="justify-center layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editArea(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteArea(props.item)"
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
        name: "AreasTable",
        data() {
            return {
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Начальник ділянки', value: 'technicalStuff', sortable: false},
                    {text: 'Цех', value: 'department', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false}
                ],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
                areas: []
            }
        },
        methods: {
            deleteArea(area) {
                axios.delete("api/areas/" + area.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        let index = this.areas.findIndex(x => x.id === area.id);
                        this.areas.splice(index, 1);
                    });
            },
            editArea(area) {
                EventBus.$emit("area-edit-dialog", area)
            }
        },
        mounted() {
            axios.get("api/areas")
                .then(res => {
                    this.areas = res.data;
                    this.areas.sort((a, b) => a.name > b.name ? 1 : -1)
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            EventBus.$on("edit-area", (area) => {
                let index = this.areas.findIndex(x => x.id === area.id);
                this.areas.splice(index, 1, area);
            });

            EventBus.$on("add-area", (area) => {
                this.areas.unshift(area);
            });
        }
    }
</script>

<style scoped>

</style>