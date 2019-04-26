<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="items"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="justify-right layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="edit(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="delete(props.item)"
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
        name: "TypeOfTestsTable",
        data() {
            return {
                headers: [
                    {text: 'Назва тесту', value: 'category', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false},
                ],
                items: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            delete(item) {
                axios.delete("api/type_of_tests/" + item.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        let index = this.items.findIndex(x => x.id === item.id);
                        this.items.splice(index, 1);
                    });
            },
            edit(item) {
                EventBus.$emit("item-edit-dialog", item);
            }
        },
        mounted() {
            axios.get("api/type_of_tests")
                .then(res => {
                    this.items = res.data;
                    this.items.sort((a, b) => a.name > b.name ? 1 : -1)
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            EventBus.$on("edit-item", (item) => {
                let index = this.items.findIndex(x => x.id === item.id);
                this.items.splice(index, 1, item);
            });

            EventBus.$on("add-item", (item) => {
                this.items.unshift(item);
            });
        }
    }
</script>