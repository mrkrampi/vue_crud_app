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
                                    :items="hangGliders"
                                    v-model="product.hangGlider"
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
        name: "MadeHangGlidersDialog",
        data() {
            return {
                dialog: false,
                product: {
                    "hangGlider": null,
                    "cycleOfWork": null,
                    "dateOfManufacture": null,
                    "ready": false
                },
                defaultProduct: {
                    "hangGlider": null,
                    "cycleOfWork": null,
                    "dateOfManufacture": null,
                    "ready": false
                },
                hangGliders: [],
                cycleOfWork: [],
            }
        },
        computed: {
            formTitle() {
                return this.product.id ? "Редагування" : "Додавання";
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
                    this.product = Object.assign({}, this.defaultProduct);
                }, 300)
            },
            save() {
                axios({
                    method: this.product.id ? "PUT" : "POST",
                    url: "api/made_hang_gliders/" + (this.product.id || ""),
                    data: this.product,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    this.close();
                    EventBus.$emit("call-snackbar", this.product.id ? "Запис відредаговано" : "Запис додано");
                    EventBus.$emit((this.product.id ? "edit" : "add") + "-product", this.product)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            axios.get("api/hang_gliders")
                .then(res => {
                    this.hangGliders = res.data;
                }).catch(err => console.log(err));

            axios.get("api/cycle_of_works")
                .then(res => {
                    this.cycleOfWork = res.data;
                }).catch(err => console.log(err));

            EventBus.$on("product-edit-dialog", (product) => {
                this.product = Object.assign({}, product);
                this.dialog = true;
            });
        }
    }
</script>

<style scoped>

</style>