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
                            <v-text-field v-model="hangGlider.name" label="Назва"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="hangGlider.wingspan" label="Кількість сидінь"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="hangGlider.weight" label="Довжина"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="hangGlider.maxSpeed" label="Висота"></v-text-field>
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
        name: "HangGlidersDialog",
        data() {
            return {
                dialog: false,
                hangGlider: {
                    name: "",
                    wingspan: 0,
                    weight: 0,
                    maxSpeed: 0
                },
                defaultHangGlider: {
                    name: "",
                    wingspan: 0,
                    weight: 0,
                    maxSpeed: 0
                }
            }
        },
        computed: {
            formTitle() {
                return this.hangGlider.id ? "Редагування" : "Додавання";
            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.hangGlider = Object.assign({}, this.defaultHangGlider);
                }, 300)
            },
            save() {
                if (this.hangGlider.id) {
                    axios({
                        method: "PUT",
                        url: "api/hang_gliders/" + this.hangGlider.id,
                        data: this.hangGlider,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const hangGlider = Object.assign({}, this.hangGlider);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис відредаговано");
                        EventBus.$emit("edit-hangGlider", hangGlider)
                    })
                        .catch(err => console.log(err));
                } else {
                    axios({
                        method: "POST",
                        url: "api/hang_gliders/",
                        data: this.hangGlider,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const hangGlider = Object.assign({}, this.hangGlider);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис додано");
                        EventBus.$emit("add-hangGlider", hangGlider);
                    }).catch(err => console.log(err));
                }
            },
        },
        mounted() {
            EventBus.$on("hangGlider-edit-dialog", (hangGlider) => {
                this.hangGlider = Object.assign({}, hangGlider);
                this.dialog = true;
            });
        }
    }
</script>