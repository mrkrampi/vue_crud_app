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
                    <span class="headline">Запит №6</span>

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
                        <span>Одержати склад бригади вказаного цеху та вказаної ділянки. </span>
                    </v-tooltip>

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
    import {HTTP} from "@/util/HTTP";
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
            async search() {
                this.items = [];
                this.loading = true;

                try {
                    const {data} = await HTTP.get(`/api/workers/get-workers-by-area-and-department`, {
                        params: {
                            "area_id": this.currentArea.id,
                            "department_id": this.currentDepartment.id,
                        }
                    });
                    this.items = data;
                } catch (e) {
                    console.log(e);
                } finally {
                    this.closeForm();
                    this.loading = false;
                }
            }
        },
        async mounted() {
            try {
                const {data: areas} = await HTTP.get(`/api/areas`);
                this.area = areas;

                const {data: departments} = await HTTP.get(`/api/departments`);
                this.departments = departments;
            } catch (e) {
                console.log(e);
            }
        }
    }
</script>
