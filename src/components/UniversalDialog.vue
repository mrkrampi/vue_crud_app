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
                        <template v-for="field in fields">
                            <v-flex xs12 sm12 :class="field.size">
                                <v-text-field
                                        v-model="item[field.value]"
                                        :label="field.label"
                                        v-if="field.type === 'textField'"
                                ></v-text-field>
                                <v-select
                                        v-else
                                        :items="field.suka"
                                        v-model="item[field.value]"
                                        item-text="name"
                                        item-value="id"
                                        return-object
                                        :label="field.label"
                                ></v-select>
                            </v-flex>
                        </template>
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
        name: "UniversalDialog",
        props: {
            apiLink: String,
            callback: Function,
            fields: Array,
        },
        data() {
            return {
                defaultItem: {},
                dialog: false,
                item: {},
            }
        },
        computed: {
            formTitle() {
                return this.item.id ? "Редагування" : "Додавання";
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
                    this.item = Object.assign({}, this.default);
                }, 300)
            },
            save() {
                axios({
                    method: this.item.id ? "PUT" : "POST",
                    url: `api/${this.apiLink}/` + (this.item.id || ""),
                    data: this.item,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    this.close();
                    this.$root.$emit("call-snackbar", this.item.id ? "Запис відредаговано" : "Запис додано");
                    this.$root.$emit((this.item.id ? "edit" : "add") + "-item", this.callback(response.data));
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            this.$root.$on("item-edit-dialog", (item) => {
                this.item = Object.assign({}, item);
                this.dialog = true;
            });

            this.fields.forEach(field => {
                if (field.linkForData) {
                    axios.get(`api/${field.linkForData}`).then(res => field.suka = res.data);
                }
            })
        }
    }
</script>