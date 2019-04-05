<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="handDliders"
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
                        @click="editHandDlider(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteHandDlider(props.item)"
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
        name: "HandDlidersTable",
        data() {
            return {
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Розмах крил', value: 'wingspan', sortable: false},
                    {text: 'Вага', value: 'weight', sortable: false},
                    {text: 'Максимальна швидкість', value: 'maxSpeed', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false}
                ],
                handDliders: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteHandDlider(handDlider) {
                axios.delete("api/hand_dliders/" + handDlider.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        const index = this.handDliders.indexOf(handDlider);
                        this.handDliders.splice(index, 1);
                    });
            },
            editHandDlider(handDlider) {
                EventBus.$emit("handDlider-edit-dialog", handDlider)
            }
        },
        mounted() {
            axios.get("api/hand_dliders")
                .then(res => {
                    this.handDliders = res.data;
                    this.handDliders.sort((a, b) => a.name > b.name ? 1 : -1);
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            EventBus.$on("edit-handDlider", (handDlider) => {
                let index = getIndex(this.handDliders, handDlider.id);
                this.handDliders.splice(index, 1, handDlider);
            });

            EventBus.$on("add-handDlider", (handDlider) => {
                this.handDliders.push(handDlider);
            });
        }

    }
</script>