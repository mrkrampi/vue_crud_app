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
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="item.name" label="Назва лабораторії"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-select
                                    :items="enterprises"
                                    v-model="item.enterprise"
                                    item-text="name"
                                    item-value="id"
                                    return-object
                                    label="Підприємство"
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

    export default {
        name: "LaboratoryDialog",
        data() {
            return {
                dialog: false,
                enterprises: [],
                item: {},
                typeOfTests: [],
                default: {},
            }
        },
        computed: {
            formTitle() {
                return this.item.id ? "Редагування" : "Додавання";
            },
            linkForProduct() {
                return this.link.slice(0, this.link.length - 6);
            }
        },
        watch: {
            dialog(newValue) {
                if (!newValue) {
                    this.close();
                }
            },
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.item = Object.assign({}, this.default);
                }, 300)
            },
            save() {
                axios({
                    method: this.item.id ? "PUT" : "POST",
                    url: `api/laboratories/` + (this.item.id || ""),
                    data: this.item,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    this.close();
                    this.$root.$emit("call-snackbar", this.item.id ? "Запис відредаговано" : "Запис додано");
                    this.$root.$emit((this.item.id ? "edit" : "add") + "-item", res.data)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            this.$root.$on("item-edit-dialog", (item) => {
                this.item = Object.assign({}, item);
                this.dialog = true;
            });

            axios.get(`api/enterprise`)
                .then(response => {
                    this.enterprises = response.data;
                    this.enterprises.sort((a, b) => a.name > b.name ? 1 : -1);
                }).catch(error => console.log(error));
        }
    }
</script>