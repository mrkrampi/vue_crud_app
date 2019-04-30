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
                            <v-text-field v-model="category.category" label="Назва категорії"></v-text-field>
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
        name: "CategoriesDialog",
        data() {
            return {
                dialog: false,
                category: {
                    "category": ""
                },
                defaultCategory: {
                    "category": ""
                },
            }
        },
        computed: {
            formTitle() {
                return this.category.id ? "Редагування" : "Додавання";
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
                    this.category = Object.assign({}, this.defaultCategory);
                }, 300)
            },
            save() {
                axios({
                    method: this.category.id ? "PUT" : "POST",
                    url: "api/categories/" + (this.category.id || ""),
                    data: this.category,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    this.close();
                    this.$root.$emit("call-snackbar", this.category.id ? "Запис відредаговано" : "Запис додано");
                    this.$root.$emit((this.category.id ? "edit" : "add") + "-category", this.category)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            this.$root.$on("category-edit-dialog", (category) => {
                this.category = Object.assign({}, category);
                this.dialog = true;
            });
        }
    }
</script>