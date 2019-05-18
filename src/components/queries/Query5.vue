<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-dialog v-model="dialog" max-width="600" persistent>
            <template v-slot:activator="{ on }">
                <v-btn outline dark color="indigo" v-on="on" fixed top right class="btn">
                    Новий запит
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Запит №5</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="tables"
                                        v-model="currentTable"
                                        item-text="name"
                                        return-object
                                        label="Категорія виробів"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="products"
                                        v-model="currentProduct"
                                        item-text="name"
                                        item-value="id"
                                        return-object
                                        label="Виріб"
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="closeForm">Відмінити</v-btn>
                    <v-btn color="blue darken-1" flat @click="search">Пошук</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <universal-table
                :api-link="apiLink"
                :items="items"
                :headers="headers"
                :loading="loading"
                table-name="Запит 5"
                :hidden-action="true"
        ></universal-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import UniversalTable from "@/components/UniversalTable";

    export default {
        name: "Query5",
        components: {UniversalTable},
        data() {
            return {
                /*props for table*/
                items: [],
                headers: [
                    {text: 'Цикл робіт', value: 'name', sortable: false},
                    {text: 'Опис', value: 'description', sortable: false},
                    {text: 'Бригада', value: 'brigadeName', sortable: false},
                ],
                loading: false,

                /*props for dialog and others*/
                apiLink: '',
                dialog: true,

                /*objects for select*/
                tables: [
                    {name: 'Планери', apiLink: 'gliders', queryLink: 'get-by-glider'},
                    {name: 'Дельтаплани', apiLink: 'hang_gliders', queryLink: 'get-by-hang-glider'},
                    {name: 'Гелікоптери', apiLink: 'helicopters', queryLink: 'get-by-helicopter'},
                    {name: 'Літаки', apiLink: 'planes', queryLink: 'get-by-plane'},
                    {name: 'Ракети', apiLink: 'rockets', queryLink: 'get-by-rocket'},
                ],
                products: [],

                /*save current select value*/
                currentTable: {},
                currentProduct: {},
            }
        },
        watch: {
            currentTable() {
                axios.get(`/api/${this.currentTable.apiLink}`)
                    .then(response => this.products = response.data)
                    .catch(error => error);
            }
        },
        methods: {
            closeForm() {
                this.dialog = false;
            },
            search() {
                this.items = [];
                this.loading = true;
                axios.get(`/api/cycle_of_works/${this.currentTable.queryLink}`, {
                    params: {
                        "product_id": this.currentProduct.id
                    }
                })
                    .then(response => this.items = response.data)
                    .finally(() => {
                        this.closeForm();
                        this.loading = false
                    });
            }
        }
    }
</script>

<style scoped>
    .btn {
        z-index: 999;
    }
</style>
