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
                    <span class="headline">Запит №1</span>
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
                                        :items="departments"
                                        v-model="currentDepartment"
                                        item-text="address"
                                        item-value="id"
                                        return-object
                                        label="Цех"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="enterprises"
                                        v-model="currentEnterprise"
                                        item-text="name"
                                        item-value="id"
                                        return-object
                                        label="Підприємство"
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
                table-name="Запит 1"
                :hidden-action="true"
        ></universal-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import UniversalTable from "@/components/UniversalTable";

    export default {
        name: "Query1",
        components: {UniversalTable},
        data() {
            return {
                /*props for table*/
                items: [],
                headers: [
                    {text: 'Назва виробу', value: 'name', sortable: false},
                ],
                loading: false,

                /*props for dialog and others*/
                apiLink: '',
                loadAll: false,
                dialog: true,
                canChoose: false,

                /*objects for select*/
                tables: [
                    {name: 'Планери', apiLink: 'gliders', queryLink: 'find-by-department-and-enterprise'},
                    {name: 'Дельтаплани', apiLink: 'hang_gliders', queryLink: 'find-by-department-and-enterprise'},
                    {name: 'Гелікоптери', apiLink: 'helicopters', queryLink: 'find-by-department-and-enterprise'},
                    {name: 'Літаки', apiLink: 'planes', queryLink: 'find-by-department-and-enterprise'},
                    {name: 'Ракети', apiLink: 'rockets', queryLink: 'find-by-department-and-enterprise'},
                    {name: 'Усі категорії'},
                ],
                departments: [],
                enterprises: [],

                /*save current select value*/
                currentTable: {},
                currentDepartment: {},
                currentEnterprise: {},
            }
        },
        watch: {
            currentTable() {
                this.loadAll = !this.currentTable.apiLink;
                this.canChoose = this.currentTable.apiLink;
            }
        },
        methods: {
            closeForm() {
                this.dialog = false;
            },
            search() {
                this.items = [];
                this.loading = true;
                if (this.loadAll) {
                    for (let table of this.tables) {
                        if (table.apiLink) {
                            axios.get(`/api/${table.apiLink}/${table.queryLink}`, {
                                params: {
                                    "department_id": this.currentDepartment.id,
                                    "enterprise_id": this.currentEnterprise.id,
                                }
                            })
                                .then(response => this.items.push(...response.data))
                                .finally(() => {
                                    this.closeForm();
                                    this.loading = false
                                });
                        }
                    }
                } else {
                    axios.get(`/api/${this.currentTable.apiLink}/${this.currentTable.queryLink}`, {
                        params: {
                            "department_id": this.currentDepartment.id,
                            "enterprise_id": this.currentEnterprise.id,
                        }
                    })
                        .then(response => this.items = response.data)
                        .finally(() => {
                            this.closeForm();
                            this.loading = false
                        });
                }
            }
        },
        mounted() {
            axios.get(`/api/enterprise`)
                .then(response => this.enterprises = response.data)
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
