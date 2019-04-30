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
                            <v-text-field v-model="department.address" label="Адрес цеху"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-select
                                    :items="managers"
                                    v-model="department.technicalStuff"
                                    item-text="name"
                                    item-value="id"
                                    return-object
                                    label="Керівник цеху"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-select
                                    :items="enterprises"
                                    v-model="department.enterprise"
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
                <v-btn color="blue darken-1" flat @click="close">Відмінити</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Зберегти</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "DepartmentsDialog",
        data() {
            return {
                dialog: false,
                department: {
                    "address": "",
                    "technicalStuff": "",
                    "enterprise": "",
                },
                defaultDepartment: {
                    "address": "",
                    "technicalStuff": "",
                    "enterprise": "",
                },
                managers: [],
                enterprises: []
            }
        },
        computed: {
            formTitle() {
                return this.department.id ? "Редагування" : "Додавання";
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
                    this.department = Object.assign({}, this.defaultDepartment);
                }, 300)
            },
            save() {
                axios({
                    method: this.department.id ? "PUT" : "POST",
                    url: "api/departments/" + (this.department.id || ""),
                    data: this.department,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    this.close();
                    this.$root.$emit("call-snackbar", this.department.id ? "Запис відредаговано" : "Запис додано");
                    this.$root.$emit((this.department.id ? "edit" : "add") + "-department", this.department)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            this.$root.$on("department-edit-dialog", (department) => {
                this.department = Object.assign({}, department);
                this.dialog = true;
            });

            axios.get('api/enterprise')
                .then(enterprises => {
                    this.enterprises = enterprises.data;
                }).catch(error => console.log(error));

            axios.get('api/technical_stuff')
                .then(managers => {
                    this.managers = managers.data;
                    this.managers.forEach(item => item.name = item.firstName + ' ' + item.lastName);
                }).catch(error => console.log(error));
        }
    }
</script>