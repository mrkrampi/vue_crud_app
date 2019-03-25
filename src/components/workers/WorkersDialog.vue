<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Додати працівника</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline"></span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
<!--                        <v-flex xs12 sm6 md4>-->
<!--                            <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>-->
<!--                        </v-flex>-->
<!--                        <v-flex xs12 sm6 md4>-->
<!--                            <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>-->
<!--                        </v-flex>-->
<!--                        <v-flex xs12 sm6 md4>-->
<!--                            <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>-->
<!--                        </v-flex>-->
<!--                        <v-flex xs12 sm6 md4>-->
<!--                            <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>-->
<!--                        </v-flex>-->
<!--                        <v-flex xs12 sm6 md4>-->
<!--                            <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>-->
<!--                        </v-flex>-->
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
    export default {
        name: "WorkersDialog",
        data() {
            return {
                dialog: false
            }
        },
        methods: {
            close() {
                this.dialog = false;
            },
            save() {

            },
            show() {
                this.dialog = true;
            }
        }
    }
</script>

<style scoped>

</style>