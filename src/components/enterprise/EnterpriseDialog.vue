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
                        <v-flex xs12 sm6 md12>
                            <v-text-field v-model="enterprise.name" label="Назва підприємства"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field v-model="enterprise.managerOfCompany" label="Керівник компанії"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field v-model="enterprise.typeOfActivity" label="Тип діяльності"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-text-field v-model="enterprise.address" label="Адрес"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-text-field v-model="enterprise.requisites" label="Реквізити"></v-text-field>
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
    import {EventBus} from "@/event-bus";

    export default {
        name: "EnterpriseDialog",
        data() {
            return {
                dialog: false,
                enterprise: {
                    "name": "",
                    "managerOfCompany": "",
                    "typeOfActivity": "",
                    "address": "",
                    "requisites": ""
                },
                defaultEnterprise: {
                    "name": "",
                    "managerOfCompany": "",
                    "typeOfActivity": "",
                    "address": "",
                    "requisites": ""
                }
            }
        },
        computed: {
            formTitle() {
                return this.enterprise.id ? "Редагування" : "Додавання";
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
                    this.enterprise = Object.assign({}, this.defaultEnterprise);
                }, 300)
            },
            save() {
                axios({
                    method: this.enterprise.id ? "PUT" : "POST",
                    url: "api/enterprise/" + (this.enterprise.id || ""),
                    data: this.enterprise,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    this.close();
                    EventBus.$emit("call-snackbar", this.enterprise.id ? "Запис відредаговано" : "Запис додано");
                    EventBus.$emit((this.enterprise.id ? "edit" : "add") + "-enterprise", this.enterprise)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            EventBus.$on("enterprise-edit-dialog", (enterprise) => {
                this.enterprise = Object.assign({}, enterprise);
                this.dialog = true;
            });
        }
    }
</script>