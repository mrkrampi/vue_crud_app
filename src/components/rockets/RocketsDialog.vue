<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Додати ракету</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{formTitle}}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md12>
                            <v-text-field v-model="rocket.name" label="Назва ракети"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="rocket.weight" label="Вага"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="rocket.flightRange" label="Дальність польоту"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="rocket.powerOfCharge" label="Потужність заряду"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-select
                                    :items="categories"
                                    v-model="rocket.typeOfRocket"
                                    item-text="category"
                                    item-value="id"
                                    return-object
                                    label="Тип ракети"
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
        name: "RocketsDialog",
        data() {
            return {
                categories: [],
                dialog: false,
                rocket: {
                    "name": "",
                    "weight": 0,
                    "flightRange": 0,
                    "powerOfCharge": 0,
                    "typeOfRocket": null
                },
                defaultRocket: {
                    "name": "",
                    "weight": 0,
                    "flightRange": 0,
                    "powerOfCharge": 0,
                    "typeOfRocket": null
                }
            }
        },
        computed: {
            formTitle() {
                return this.rocket.id ? "Редагування" : "Додавання";
            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.rocket = Object.assign({}, this.defaultRocket);
                }, 300)
            },
            save() {
                if (this.rocket.id) {
                    axios({
                        method: "PUT",
                        url: "api/rockets/" + this.rocket.id,
                        data: this.rocket,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const rocket = Object.assign({}, this.rocket);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис відредаговано");
                        EventBus.$emit("edit-rocket", rocket)
                    })
                        .catch(err => alert(err));
                } else {
                    axios({
                        method: "POST",
                        url: "api/helicopters/",
                        data: this.rocket,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const rocket = Object.assign({}, this.rocket);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис додано");
                        EventBus.$emit("add-rocket", rocket);
                    }).catch(err => alert(err));
                }
            },
        },
        mounted() {
            axios.get("api/categories")
                .then(res => {
                    res.data.forEach(i => this.categories.push(i));
                }).catch(err => alert(err));

            EventBus.$on("rockets-edit-dialog", (rocket) => {
                this.rocket = Object.assign({}, rocket);
                this.dialog = true;
            });
        }
    }
</script>

<style scoped>

</style>