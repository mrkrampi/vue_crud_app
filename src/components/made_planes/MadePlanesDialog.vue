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
                            <v-select
                                    :items="planes"
                                    v-model="product.plane"
                                    item-text="name"
                                    item-value="id"
                                    return-object
                                    label="Виріб"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-select
                                    :items="cycleOfWork"
                                    v-model="product.cycleOfWork"
                                    item-text="name"
                                    item-value="id"
                                    return-object
                                    label="Вид робіт"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md10>
                            <v-text-field v-model="product.dateOfManufacture" label="Дата виготовлення"></v-text-field>
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
        name: "MadePlanesDialog",
        data() {
            return {
                dialog: false,
                product: {
                    "plane": null,
                    "cycleOfWork": null,
                    "dateOfManufacture": null,
                    "ready": true
                },
                defaultProduct: {
                    "plane": null,
                    "cycleOfWork": null,
                    "dateOfManufacture": null,
                    "ready": true
                },
                planes: [],
                cycleOfWork: [],
            }
        },
        computed: {
            formTitle() {
                return this.product.id ? "Редагування" : "Додавання";
            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.product = Object.assign({}, this.defaultProduct);
                }, 300)
            },
            save() {
                console.log(this.product);
                axios({
                    method: this.product.id ? "PUT" : "POST",
                    url: "api/made_planes/" + (this.product.id || ""),
                    data: this.product,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    const product = Object.assign({}, this.product);
                    this.close();
                    EventBus.$emit("call-snackbar", this.product.id ? "Запис відредаговано" : "Запис додано");
                    EventBus.$emit((product.id ? "edit" : "add") + "-product", product)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            axios.get("api/planes")
                .then(res => {
                    res.data.forEach(i => this.planes.push(i));
                }).catch(err => console.log(err));

            axios.get("api/cycle_of_works")
                .then(res => {
                    res.data.forEach(i => this.cycleOfWork.push(i));
                }).catch(err => console.log(err));

            EventBus.$on("product-edit-dialog", (product) => {
                this.product = Object.assign({}, product);
                this.dialog = true;
            });
        }
    }
</script>