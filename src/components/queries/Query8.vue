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
                    <span class="headline">Запит №8</span>

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
                        <span>Одержати перелік виробів вказаної категорії та виробів загалом, які виготовляються на поточний момент вказаною ділянкою, цехом та підприємством. </span>
                    </v-tooltip>

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
                                        :items="areas"
                                        v-model="currentArea"
                                        item-text="name"
                                        item-value="id"
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
                table-name="Запит 8"
                :hidden-action="true"
        ></universal-table>
    </div>
</template>

<script>
    import {HTTP} from "@/util/HTTP";
    import UniversalTable from "@/components/UniversalTable";

    export default {
        name: "Query8",
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

                /*objects for select*/
                tables: [
                    {name: 'Планери', apiLink: 'gliders', queryLink: 'get-unready-by-area-and-department'},
                    {name: 'Дельтаплани', apiLink: 'hang_gliders', queryLink: 'get-unready-by-area-and-department'},
                    {name: 'Гелікоптери', apiLink: 'helicopters', queryLink: 'get-unready-by-area-and-department'},
                    {name: 'Літаки', apiLink: 'planes', queryLink: 'get-unready-by-area-and-department'},
                    {name: 'Ракети', apiLink: 'rockets', queryLink: 'get-unready-by-area-and-department'},
                    {name: 'Усі категорії'},
                ],
                departments: [],
                areas: [],
                enterprises: [],

                /*save current select value*/
                currentArea: '',
                currentTable: {},
                currentDepartment: '',
                currentEnterprise: {},
            }
        },
        watch: {
            currentTable() {
                this.loadAll = !this.currentTable.apiLink;
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
                            HTTP.get(`/api/${table.apiLink}/${table.queryLink}`, {
                                params: {
                                    "department_id": this.currentDepartment.id,
                                    "area_id": this.currentArea.id,
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
                    HTTP.get(`/api/${this.currentTable.apiLink}/${this.currentTable.queryLink}`, {
                        params: {
                            "department_id": this.currentDepartment.id,
                            "area_id": this.currentArea.id,
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
            HTTP.get(`/api/enterprise`)
                .then(response => this.enterprises = response.data)
                .catch(error => console.log(error));

            HTTP.get(`/api/departments`)
                .then(response => this.departments = response.data)
                .catch(error => console.log(error));

            HTTP.get(`/api/areas`)
                .then(response => this.areas = response.data)
                .catch(error => console.log(error));
        }
    }
</script>

<style scoped>
    .btn {
        z-index: 999;
    }
</style>
