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
                            <v-text-field v-model="handDlider.name" label="Назва"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="handDlider.wingspan" label="Кількість сидінь"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="handDlider.weight" label="Довжина"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="handDlider.maxSpeed" label="Висота"></v-text-field>
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
        name: "HandDlidersDialog",
        data() {
            return {
                dialog: false,
                handDlider: {
                    name: "",
                    wingspan: 0,
                    weight: 0,
                    maxSpeed: 0
                },
                defaultHandDlider: {
                    name: "",
                    wingspan: 0,
                    weight: 0,
                    maxSpeed: 0
                }
            }
        },
        computed: {
            formTitle() {
                return this.handDlider.id ? "Редагування" : "Додавання";
            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.handDlider = Object.assign({}, this.defaultHandDlider);
                }, 300)
            },
            save() {
                if (this.handDlider.id) {
                    axios({
                        method: "PUT",
                        url: "api/hand_dliders/" + this.handDlider.id,
                        data: this.handDlider,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const handDlider = Object.assign({}, this.handDlider);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис відредаговано");
                        EventBus.$emit("edit-handDlider", handDlider)
                    })
                        .catch(err => alert(err));
                } else {
                    axios({
                        method: "POST",
                        url: "api/hand_dliders/",
                        data: this.handDlider,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const handDlider = Object.assign({}, this.handDlider);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис додано");
                        EventBus.$emit("add-handDlider", handDlider);
                    }).catch(err => alert(err));
                }
            },
        },
        mounted() {
            EventBus.$on("handDlider-edit-dialog", (handDlider) => {
                this.handDlider = Object.assign({}, handDlider);
                this.dialog = true;
            });
        }
    }
</script>