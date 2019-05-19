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
                    <span class="headline">Запит №6</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="area"
                                        v-model="currentArea"
                                        item-text="name"
                                        return-object
                                        label="Ділянка"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="departments"
                                        v-model="currentDepartment"
                                        item-text="address"
                                        item-value="id"
                                        return-object
                                        label="Цех"
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
                table-name="Запит 6"
                :hidden-action="true"
        ></universal-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import UniversalTable from "@/components/UniversalTable";

    export default {
        name: "Query6",
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
                    {text: 'Бригада', value: 'brigadeName', sortable: false},
                ],
                loading: false,

                /*props for dialog and others*/
                apiLink: '',
                dialog: true,

                /*objects for select*/
                area: [],
                departments: [],

                /*save current select value*/
                currentArea: {},
                currentDepartment: {},
            }
        },
        methods: {
            closeForm() {
                this.dialog = false;
            },
            search() {
                this.items = [];
                this.loading = true;
                axios.get(`/api/workers/get-workers-by-area-and-department`, {
                    params: {
                        "area_id": this.currentArea.id,
                        "department_id": this.currentDepartment.id,
                    }
                })
                    .then(response => this.items = response.data)
                    .finally(() => {
                        this.closeForm();
                        this.loading = false
                    });
            }
        },
        mounted() {
            axios.get(`/api/areas`)
                .then(response => this.area = response.data)
                .catch(error => console.log(error));

            axios.get(`/api/departments`)
                .then(response => this.departments = response.data)
                .catch(error => console.log(error));
        }
    }
</script>

<style scoped>
    .btn {
        z-index: 999;
    }
</style>
