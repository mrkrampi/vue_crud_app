<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Додати літак</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{formTitle}}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md12>
                            <v-text-field v-model="plane.name" label="Назва літака"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="plane.countOfEngines" label="Кількість двигунів"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="plane.powerOfEngines" label="Потужність двигунів"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="plane.loadCapacity" label="Вантажоємність"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="plane.countOfSits" label="Кількість сидінь"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="plane.wingspan" label="Розмах крил"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="plane.maxSpeed" label="Максимальна швидкість"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="plane.weight" label="Маса"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="plane.maxWeight" label="Максимальна маса"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="plane.length" label="Довжина"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="plane.height" label="Висота"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="plane.fuelCapacity" label="Запас палива"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="plane.flightRange" label="Дальність ходу"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-select
                                    :items="categories"
                                    v-model="plane.category"
                                    item-text="category"
                                    item-value="id"
                                    return-object
                                    label="Тип літака"
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
    import {EventBus} from "@/event-bus.js";

    export default {
        name: "PlanesDialog",
        data() {
            return {
                categories: [],
                dialog: false,
                plane: {
                    "name": "",
                    "category": '',
                    "countOfEngines": 0,
                    "powerOfEngines": 0,
                    "loadCapacity": 0,
                    "countOfSits": 0,
                    "wingspan": 0,
                    "maxSpeed": 0,
                    "weight": 0,
                    "maxWeight": 0,
                    "length": 0,
                    "height": 0,
                    "fuelCapacity": 0,
                    "flightRange": 0
                },
                defaultPlane: {
                    "name": "",
                    "category": '',
                    "countOfEngines": 0,
                    "powerOfEngines": 0,
                    "loadCapacity": 0,
                    "countOfSits": 0,
                    "wingspan": 0,
                    "maxSpeed": 0,
                    "weight": 0,
                    "maxWeight": 0,
                    "length": 0,
                    "height": 0,
                    "fuelCapacity": 0,
                    "flightRange": 0
                }
            }
        },
        computed: {
            formTitle() {
                return this.plane.id ? "Редагування" : "Додавання";
            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.plane = Object.assign({}, this.defaultPlane);
                }, 300)
            },
            save() {
                if (this.plane.id) {
                    axios({
                        method: "PUT",
                        url: "api/planes/" + this.plane.id,
                        data: this.plane,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const plane = Object.assign({}, this.plane);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис відредаговано");
                        EventBus.$emit("edit-plane", plane)
                    })
                        .catch(err => alert(err));
                } else {
                    axios({
                        method: "POST",
                        url: "api/planes/",
                        data: this.plane,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const plane = Object.assign({}, this.plane);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис додано");
                        EventBus.$emit("add-plane", plane);
                    }).catch(err => alert(err));
                }
            },
        },
        mounted() {
            axios.get("api/categories")
                .then(res => {
                    res.data.forEach(i => this.categories.push(i));
                }).catch(err => alert(err));

            EventBus.$on("plane-edit-dialog", (plane) => {
                this.plane = Object.assign({}, plane);
                this.dialog = true;
            });
        }
    }
</script>

<style scoped>

</style>