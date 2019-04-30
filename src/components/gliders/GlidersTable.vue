<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="gliders"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.countOfSits }}</td>
            <td class="text-xs-left">{{ props.item.length }} м</td>
            <td class="text-xs-left">{{ props.item.height }} м.</td>
            <td class="text-xs-left">{{ props.item.wingspan }} м.</td>
            <td class="text-xs-left">{{ props.item.maxSpeed }} км/год</td>
            <td class="text-xs-left">{{ props.item.weight }} </td>
            <td class="justify-center layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editGlider(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteGlider(props.item)"
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

    export default {
        name: "GlidersTable",
        data() {
            return {
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Кількість сидінь', value: 'countOfSits', sortable: false},
                    {text: 'Довжина', value: 'length', sortable: false},
                    {text: 'Висота', value: 'height', sortable: false},
                    {text: 'Розмах крил', value: 'wingspan', sortable: false},
                    {text: 'Максимальна швидкість', value: 'maxSpeed', sortable: false},
                    {text: 'Вага', value: 'weight', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false}
                ],
                gliders: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteGlider(glider) {
                axios.delete("api/gliders/" + glider.id)
                    .then(() => {
                        this.$root.$emit("call-snackbar", "Запис видалено");
                        const index = this.gliders.findIndex(x => x.id === glider.id);
                        this.gliders.splice(index, 1);
                    });
            },
            editGlider(glider) {
                this.$root.$emit("glider-edit-dialog", glider)
            }
        },
        mounted() {
            axios.get("api/gliders")
                .then(res => {
                    this.gliders = res.data;
                    this.gliders.sort((a, b) => a.name > b.name ? 1 : -1);
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            this.$root.$on("edit-glider", (glider) => {
                let index = this.gliders.findIndex(x => x.id === glider.id);
                this.gliders.splice(index, 1, glider);
            });

            this.$root.$on("add-glider", (glider) => {
                this.workers.push(glider);
            });
        }
    }
</script>