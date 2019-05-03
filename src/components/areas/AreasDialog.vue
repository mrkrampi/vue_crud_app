<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ on }">
            <v-btn fab dark color="indigo" v-on="on" fixed right bottom>
                <v-icon dark>add</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{formTitle}}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="area.name" label="Назва ділянки"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-select
                                    :items="managers"
                                    v-model="area.technicalStuff"
                                    item-text="name"
                                    item-value="id"
                                    return-object
                                    label="Начальник ділянки"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-select
                                    :items="departments"
                                    v-model="area.department"
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
                <v-btn color="blue darken-1" flat @click="close">Відмінити</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Зберегти</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "AreasDialog",
        data() {
            return {
                dialog: false,
                area: {
                    "name": "",
                    "technicalStuff": "",
                    "department": "",
                },
                defaultArea: {
                    "name": "",
                    "technicalStuff": "",
                    "department": "",
                },
                managers: [],
                departments: []
            }
        },
        computed: {
            formTitle() {
                return this.area.id ? "Редагування" : "Додавання";
            }
        },
        watch: {
            dialog(newValue) {
                if (!newValue) {
                    this.close();
                }
            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.area = Object.assign({}, this.defaultArea);
                }, 300)
            },
            save() {
                axios({
                    method: this.area.id ? "PUT" : "POST",
                    url: "api/areas/" + (this.area.id || ""),
                    data: this.area,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    this.close();
                    this.$root.$emit("call-snackbar", this.area.id ? "Запис відредаговано" : "Запис додано");
                    this.area.departmentName = this.area.department.address;
                    this.$root.$emit((this.area.id ? "edit" : "add") + "-item", this.area)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            this.$root.$on("item-edit-dialog", (area) => {
                this.area = Object.assign({}, area);
                this.dialog = true;
            });

            axios.get('api/departments')
                .then(departments => {
                    this.departments = departments.data;
                }).catch(error => console.log(error));

            axios.get('api/technical_stuff')
                .then(managers => {
                    this.managers = managers.data;
                    this.managers.forEach(item => item.name = item.firstName + ' ' + item.lastName);
                }).catch(error => console.log(error));
        }
    }
</script>