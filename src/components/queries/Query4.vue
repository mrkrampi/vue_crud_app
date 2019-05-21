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
                    <span class="headline">Запит №4</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="departments"
                                        v-model="currentDepartment"
                                        item-text="address"
                                        return-object
                                        label="Цехи"
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
                table-name="Запит 4"
                :hidden-action="true"
        ></universal-table>
    </div>
</template>

<script>
    import {HTTP} from "@/util/HTTP";
    import UniversalTable from "@/components/UniversalTable";

    export default {
        name: "Query4",
        components: {UniversalTable},
        data() {
            return {
                /*props for table*/
                items: [],
                headers: [
                    {text: 'Назва', value: 'name', sortable: true},
                    {text: 'Начальник ділянки', value: 'techName', sortable: false},
                    {text: 'Цех', value: 'departmentName', sortable: false},
                ],
                loading: false,

                /*props for dialog and others*/
                apiLink: '',
                dialog: true,

                /*objects for select*/
                departments: [],

                /*save current select value*/
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
                HTTP.get(`/api/areas/find-by-department`, {
                    params: {
                        "department_id": this.currentDepartment.id
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
            HTTP.get(`/api/departments`)
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
