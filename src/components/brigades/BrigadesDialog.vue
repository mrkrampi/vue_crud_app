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
                            <v-text-field v-model="brigade.name" label="Назва підприємства"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-select
                                    :items="workers"
                                    v-model="brigade.worker"
                                    item-text="name"
                                    item-value="id"
                                    return-object
                                    label="Бригадир"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-select
                                    :items="areas"
                                    v-model="brigade.area"
                                    item-text="name"
                                    item-value="id"
                                    return-object
                                    label="Ділянка"
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
    import {EventBus} from "@/event-bus";

    export default {
        name: "BrigadesDialog",
        data() {
            return {
                dialog: false,
                brigade: {
                    "name": "",
                    "worker": "",
                    "area": "",
                },
                defaultBrigade: {
                    "name": "",
                    "worker": "",
                    "area": "",
                },
                areas: [],
                workers: []
            }
        },
        computed: {
            formTitle() {
                return this.brigade.id ? "Редагування" : "Додавання";
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
                    this.brigade = Object.assign({}, this.defaultBrigade);
                }, 300)
            },
            save() {
                axios({
                    method: this.brigade.id ? "PUT" : "POST",
                    url: "api/brigades/" + (this.brigade.id || ""),
                    data: this.brigade,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    this.close();
                    EventBus.$emit("call-snackbar", this.brigade.id ? "Запис відредаговано" : "Запис додано");
                    EventBus.$emit((this.brigade.id ? "edit" : "add") + "-brigade", this.brigade)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            EventBus.$on("brigade-edit-dialog", (brigade) => {
                this.brigade = Object.assign({}, brigade);
                this.dialog = true;
            });

            axios.get('api/workers')
                .then(response => {
                    this.workers = response.data;
                    this.workers.forEach(item => item.name = `${item.firstName} ${item.lastName}`)
                }).catch(error => console.log(error));

            axios.get('api/areas')
                .then(response => this.areas = response.data)
                .catch(error => console.log(error));
        }
    }
</script>