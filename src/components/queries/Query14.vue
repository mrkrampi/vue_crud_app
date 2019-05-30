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
                    <span class="headline">Запит №14</span>
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
                                        label="Ділянки"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        :items="departments"
                                        v-model="currentDepartment"
                                        item-text="address"
                                        item-value="id"
                                        return-object
                                        label="Цехи"
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
                            <v-flex md6>
                                <v-menu
                                        min-width="240px"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        v-model="datePicker1"
                                >
                                    <v-text-field
                                            :value="startDate"
                                            slot="activator"
                                            label="Початкова дата"
                                            prepend-icon="date_range"
                                    ></v-text-field>
                                    <v-date-picker
                                            v-model="startDate"
                                            no-title
                                            scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="datePicker1 = false">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex md6>
                                <v-menu
                                        min-width="240px"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        v-model="datePicker2"
                                >
                                    <v-text-field
                                            :value="endDate"
                                            slot="activator"
                                            label="Початкова дата"
                                            prepend-icon="date_range"
                                    ></v-text-field>
                                    <v-date-picker
                                            v-model="endDate"
                                            no-title
                                            scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="datePicker2 = false">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
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
                table-name="Запит 14"
                :hidden-action="true"
        ></universal-table>
    </div>
</template>

<script>
    import {HTTP} from "@/util/HTTP";
    import UniversalTable from "@/components/UniversalTable";

    export default {
        name: "Query14",
        components: {UniversalTable},
        data() {
            return {
                /*props for table*/
                items: [],
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                ],
                loading: false,

                /*props for dialog and others*/
                apiLink: '',
                loadAll: false,
                dialog: true,

                /*objects for select*/
                tables: [
                    {name: 'Планери', apiLink: 'gliders'},
                    {name: 'Дельтаплани', apiLink: 'hang_gliders'},
                    {name: 'Гелікоптери', apiLink: 'helicopters'},
                    {name: 'Літаки', apiLink: 'planes'},
                    {name: 'Ракети', apiLink: 'rockets'},
                    {name: 'Усі категорії'},
                ],
                departments: [],
                areas: [],
                enterprises: [],

                /*save current select value*/
                currentArea: '',
                currentDepartment: '',
                currentTable: {},
                currentEnterprise: {},

                /*fields for date*/
                startDate: '',
                endDate: '',
                datePicker1: false,
                datePicker2: false,
            }
        },
        watch: {
            currentTable() {
                this.loadAll = false;
                switch (this.currentTable.name) {
                    case 'Планери': {
                        this.apiLink = `${this.currentTable.apiLink}/get-ready-by-area-enterprise-department`;
                        break;
                    }
                    case 'Дельтаплани': {
                        this.apiLink = `${this.currentTable.apiLink}/get-ready-by-area-enterprise-department`;
                        break;
                    }
                    case 'Гелікоптери': {
                        this.apiLink = `${this.currentTable.apiLink}/get-ready-by-area-enterprise-department`;
                        break;
                    }
                    case 'Літаки': {
                        this.apiLink = `${this.currentTable.apiLink}/get-ready-by-area-enterprise-department`;
                        break;
                    }
                    case 'Ракети': {
                        this.apiLink = `${this.currentTable.apiLink}/get-ready-by-area-enterprise-department`;
                        break;
                    }
                    default: {
                        this.loadAll = true;
                    }
                }
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
                            HTTP.get(`/api/${table.apiLink}/get-ready-by-area-enterprise-department`, {
                                params: {
                                    "area_id": this.currentArea.id,
                                    "department_id": this.currentDepartment.id,
                                    "enterprise_id": this.currentEnterprise.id,
                                    "start_date": this.startDate,
                                    "end_date": this.endDate
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
                    HTTP.get(`/api/${this.apiLink}`, {
                        params: {
                            "area_id": this.currentArea.id,
                            "department_id": this.currentDepartment.id,
                            "enterprise_id": this.currentEnterprise.id,
                            "start_date": this.startDate,
                            "end_date": this.endDate
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
            HTTP.get(`/api/areas`)
                .then(response => this.areas = response.data)
                .catch(error => console.log(error));

            HTTP.get(`/api/departments`)
                .then(response => this.departments = response.data)
                .catch(error => console.log(error));

            HTTP.get(`/api/enterprise`)
                .then(response => this.enterprises = response.data)
                .catch(error => console.log(error));
        }
    }
</script>

<style scoped>
    .btn {
        z-index: 999;
    }
</style>
