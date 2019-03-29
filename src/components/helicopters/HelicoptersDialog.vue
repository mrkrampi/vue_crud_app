<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Додати гелікоптер</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{formTitle}}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md12>
                            <v-text-field v-model="helicopter.name" label="Назва літака"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="helicopter.countOfSits" label="Кількість сидінь"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="helicopter.weight" label="Маса"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="helicopter.maxWeight" label="Максимальна маса"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="helicopter.length" label="Довжина"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="helicopter.height" label="Висота"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="helicopter.fuelCapacity" label="Запас палива"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="helicopter.countOfEngines" label="Кількість двигунів"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="helicopter.powerOfEngines" label="Потужність двигунів"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="helicopter.flightRange" label="Дальність польоту"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="helicopter.maxSpeed" label="Максимальна швидкість"></v-text-field>
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
        name: "HelicoptersDialog",
        data() {
            return {
                categories: [],
                dialog: false,
                helicopter: {
                    "name": "",
                    "countOfSits": 0,
                    "weight": 0,
                    "maxWeight": 0,
                    "length": 0,
                    "height": 0,
                    "fuelCapacity": 0,
                    "countOfEngines": 0,
                    "powerOfEngines": 0,
                    "flightRange": 0,
                    "maxSpeed": 0,
                },
                defaultHelicopter: {
                    "name": "",
                    "countOfSits": 0,
                    "weight": 0,
                    "maxWeight": 0,
                    "length": 0,
                    "height": 0,
                    "fuelCapacity": 0,
                    "countOfEngines": 0,
                    "powerOfEngines": 0,
                    "flightRange": 0,
                    "maxSpeed": 0,
                }
            }
        },
        computed: {
            formTitle() {
                return this.helicopter.id ? "Редагування" : "Додавання";
            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.helicopter = Object.assign({}, this.defaultHelicopter);
                }, 300)
            },
            save() {
                if (this.helicopter.id) {
                    axios({
                        method: "PUT",
                        url: "api/helicopters/" + this.helicopter.id,
                        data: this.helicopter,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const helicopter = Object.assign({}, this.helicopter);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис відредаговано");
                        EventBus.$emit("edit-helicopter", helicopter)
                    })
                        .catch(err => alert(err));
                } else {
                    axios({
                        method: "POST",
                        url: "api/helicopters/",
                        data: this.helicopter,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const helicopter = Object.assign({}, this.helicopter);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис додано");
                        EventBus.$emit("add-helicopter", helicopter);
                    }).catch(err => alert(err));
                }
            },
        },
        mounted() {
            EventBus.$on("helicopter-edit-dialog", (helicopter) => {
                this.helicopter = Object.assign({}, helicopter);
                this.dialog = true;
            });
        }
    }
</script>

<style scoped>

</style>