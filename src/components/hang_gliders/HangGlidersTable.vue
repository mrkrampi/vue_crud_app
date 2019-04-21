<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="hangGliders"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.wingspan }}</td>
            <td class="text-xs-left">{{ props.item.weight }} м</td>
            <td class="text-xs-left">{{ props.item.maxSpeed }} м.</td>

            <td class="text-xs-center px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editHangGlider(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteHangGlider(props.item)"
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
        name: "HangGlidersTable",
        data() {
            return {
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Розмах крил', value: 'wingspan', sortable: false},
                    {text: 'Вага', value: 'weight', sortable: false},
                    {text: 'Максимальна швидкість', value: 'maxSpeed', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false}
                ],
                hangGliders: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteHangGlider(hangGlider) {
                axios.delete("api/hang_gliders/" + hangGlider.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        const index = this.hangGliders.findIndex(x => x.id === hangGlider.id);
                        this.hangGliders.splice(index, 1);
                    });
            },
            editHangGlider(hangGlider) {
                EventBus.$emit("hangGlider-edit-dialog", hangGlider)
            }
        },
        mounted() {
            axios.get("api/hang_gliders")
                .then(res => {
                    this.hangGliders = res.data;
                    this.hangGliders.sort((a, b) => a.name > b.name ? 1 : -1);
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            EventBus.$on("edit-hangGlider", (hangGlider) => {
                let index = this.hangGliders.findIndex(x => x.id === hangGlider.id);
                this.hangGliders.splice(index, 1, hangGlider);
            });

            EventBus.$on("add-hangGlider", (hangGlider) => {
                this.hangGliders.push(hangGlider);
            });
        }

    }
</script>