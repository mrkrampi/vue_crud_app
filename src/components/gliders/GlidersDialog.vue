<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog v-model="dialog" max-width="700px">
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
                            <v-text-field v-model="glider.name" label="Назва"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field v-model="glider.countOfSits" label="Кількість сидінь"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field v-model="glider.length" label="Довжина"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field v-model="glider.height" label="Висота"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field v-model="glider.wingspan" label="Розмах крил"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field v-model="glider.maxSpeed" label="Максимальна швидкість"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field v-model="glider.weight" label="Вага"></v-text-field>
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
        name: "GlidersDialog",
        data() {
            return {
                dialog: false,
                glider: {
                    name: "",
                    countOfSits: 0,
                    length: 0,
                    height: 0,
                    wingspan: 0,
                    maxSpeed: 0,
                    weight: 0
                },
                defaultGlider: {
                    name: "",
                    countOfSits: 0,
                    length: 0,
                    height: 0,
                    wingspan: 0,
                    maxSpeed: 0,
                    weight: 0
                }
            }
        },
        computed: {
            formTitle() {
                return this.glider.id ? "Редагування" : "Додавання";
            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.glider = Object.assign({}, this.defaultGlider);
                }, 300)
            },
            save() {
                if (this.glider.id) {
                    axios({
                        method: "PUT",
                        url: "api/gliders/" + this.glider.id,
                        data: this.glider,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const glider = Object.assign({}, this.glider);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис відредаговано");
                        EventBus.$emit("edit-glider", glider)
                    })
                        .catch(err => console.log(err));
                } else {
                    axios({
                        method: "POST",
                        url: "api/gliders/",
                        data: this.glider,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const glider = Object.assign({}, this.glider);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис додано");
                        EventBus.$emit("add-glider", glider);
                    }).catch(err => console.log(err));
                }
            },
        },
        mounted() {
            EventBus.$on("glider-edit-dialog", (glider) => {
                this.glider = Object.assign({}, glider);
                this.dialog = true;
            });
        }
    }
</script>