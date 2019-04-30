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
                            <v-text-field v-model="equipment.name" label="Назва обладнання"></v-text-field>
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
        name: "EquipmentDialog",
        data() {
            return {
                dialog: false,
                equipment: {
                    "name": ""
                },
                defaultEquipment: {
                    "name": ""
                },
            }
        },
        computed: {
            formTitle() {
                return this.equipment.id ? "Редагування" : "Додавання";
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
                    this.category = Object.assign({}, this.defaultEquipment);
                }, 300)
            },
            save() {
                axios({
                    method: this.equipment.id ? "PUT" : "POST",
                    url: "api/equipments/" + (this.equipment.id || ""),
                    data: this.equipment,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    this.close();
                    this.$root.$emit("call-snackbar", this.equipment.id ? "Запис відредаговано" : "Запис додано");
                    this.$root.$emit((this.equipment.id ? "edit" : "add") + "-equipment", this.equipment)
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            this.$root.$on("equipment-edit-dialog", (equipment) => {
                this.equipment = Object.assign({}, equipment);
                this.dialog = true;
            });
        }
    }
</script>