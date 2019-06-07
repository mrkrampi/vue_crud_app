<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-dialog v-model="dialog" max-width="600" persistent>
            <template v-slot:activator="{ on }">
                <v-btn fab dark color="indigo" v-on="on" fixed right bottom>
                    <v-icon dark>search</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Запит №3</span>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark v-on="on">
                                <v-icon
                                        small
                                        class="mr-2"
                                        @click="editItem(props.item)"
                                >
                                    info
                                </v-icon>
                            </v-btn>
                        </template>
                        <span> Одержати інформацію про кадровий склад цеху, підприємства загалом та за вказаними категоріями інженерно-технічного персоналу та робітників. </span>
                    </v-tooltip>

                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="categories"
                                        v-model="currentCategory"
                                        item-text="categoryName"
                                        return-object
                                        label="Категорія працівників"
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
                table-name="Запит 3"
                :hidden-action="true"
        ></universal-table>
    </div>
</template>

<script>
    import {HTTP} from "@/util/HTTP";
    import UniversalTable from "@/components/UniversalTable";

    export default {
        name: "Query3",
        components: {UniversalTable},
        data() {
            return {
                /*props for table*/
                items: [],
                headers: [
                    {text: 'ПІБ', value: 'name', sortable: false},
                    {text: 'Адреса', value: 'address', sortable: false},
                    {text: 'Номер телефону', value: 'phoneNumber', sortable: false},
                    {text: 'Зарплата', value: 'salary', sortable: false},
                    {text: 'Категорія', value: 'categoryName', sortable: false},
                    {text: 'Дата народження', value: 'birthday', sortable: false},
                ],
                loading: false,

                /*props for dialog and others*/
                apiLink: 'category_of_workers',
                dialog: true,

                /*objects for select*/
                categories: [],

                /*save current select value*/
                currentCategory: {},
            }
        },
        methods: {
            closeForm() {
                this.dialog = false;
            },
            async search() {
                this.items = [];
                this.loading = true;

                try {
                    const { data: workers } = await HTTP.get(`/api/workers/get-workers-by-category`, {
                        params: {
                            "category_id": this.currentCategory.id
                        }
                    });
                    this.items = workers;
                } catch (e) {
                    console.log(e);
                } finally {
                    this.closeForm();
                }

                try {
                    const { data: tech } = await HTTP.get(`/api/technical_stuff/get-tech-by-category`, {
                        params: {
                            "category_id": this.currentCategory.id
                        }
                    });
                    this.items.push(...tech);
                } catch (e) {
                    console.log(e);
                } finally {
                    this.loading = false

                }
            }
        },
        async mounted() {
            try {
                const { data } = await HTTP.get(`/api/${this.apiLink}`);
                this.categories = data;
            } catch (e) {
                console.log(e);
            }
        }
    }
</script>
