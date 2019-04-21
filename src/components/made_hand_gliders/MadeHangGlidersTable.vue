<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="products"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.hangGlider.name }}</td>
            <td class="text-xs-left">{{ props.item.cycleOfWork.name }}</td>
            <td class="text-xs-left">{{ props.item.dateOfManufacture || "Йде виготовлення" }}</td>
            <td class="text-xs-left">{{ props.item.ready ? "Виготовлено" : "Йде виготовлення" }}</td>

            <td class="text-xs-center px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editProduct(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteProduct(props.item)"
                >
                    delete
                </v-icon>
            </td>
        </template>
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:no-data></template>
    </v-data-table>
</template>

<script>
    import axios from 'axios';
    import {EventBus} from "@/event-bus";

    export default {
        name: "MadeHangGlidersTable",
        data() {
            return {
                headers: [
                    {text: 'Назва дельтаплана', value: 'name', sortable: false},
                    {text: 'Цикл робіт', value: 'cycleOfWork', sortable: false},
                    {text: 'Дата виготовлення', value: 'dateOfManufacture', sortable: false},
                    {text: 'Готовність', value: 'ready', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false}
                ],
                products: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteProduct(product) {
                axios.delete("api/made_hang_gliders/" + product.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        const index = this.products.indexOf(product);
                        this.products.splice(index, 1);
                    });
            },
            editProduct(product) {
                EventBus.$emit("product-edit-dialog", product)
            }
        },
        mounted() {
            axios.get("api/made_hang_gliders")
                .then(res => {
                    this.products = res.data;
                    this.products.sort((a, b) => a.glider.name > b.glider.name ? 1 : -1);
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            EventBus.$on("edit-product", (product) => {
                let index = this.products.findIndex(x => x.id === product.id);
                this.products.splice(index, 1, product);
            });

            EventBus.$on("add-product", (product) => {
                this.products.unshift(product);
            });
        }
    }
</script>

<style scoped>

</style>