<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Додати технічного працівника</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{formTitle}}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="tech.firstName" label="Ім'я"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="tech.patronymic" label="По батькові"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="tech.lastName" label="Прізвище"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <!--                            <birthday-picker></birthday-picker>-->
                            <v-text-field v-model="tech.birthday" label="Дата народження"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field v-model="tech.phoneNumber" label="Номер телефону"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-text-field v-model="tech.address" label="Адреса"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field v-model="tech.salary" label="Зарплата"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field v-model="tech.hireDate" label="Дата прийому на роботу"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-select
                                    :items="categories"
                                    v-model="tech.category"
                                    item-text="categoryName"
                                    item-value="id"
                                    return-object
                                    label="Категорія працівника"
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


    import {EventBus} from "@/event-bus";
    // import BirthdayPicker from "@/components/others/BirthdayPicker";
    import axios from "axios";

    export default {
        name: "TechnicalStuffDialog",
        components: {/*BirthdayPicker*/},
        data() {
            return {
                categories: [],
                dialog: false,
                tech: {
                    fistName: '',
                    patronymic: '',
                    lastName: '',
                    birthday: new Date(),
                    address: '',
                    phoneNumber: '',
                    salary: 0,
                    hireDate: new Date()
                },
                defaultTech: {
                    fistName: '',
                    patronymic: '',
                    lastName: '',
                    birthday: new Date(),
                    address: '',
                    phoneNumber: '',
                    salary: 0,
                    hireDate: new Date()
                }
            }
        },
        computed: {
            formTitle() {
                return this.tech.id ? "Редагування" : "Додавання";
            }
        },
        watch: {
            dialog(val) {
                if (!val) {
                    this.tech = {};
                    this.close();
                }
            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.tech = Object.assign({}, this.defaultWorker);
                }, 300)
            },
            save() {
                if (this.tech.id) {
                    axios({
                        method: "PUT",
                        url: "api/technical_stuff/" + this.tech.id,
                        data: this.tech,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const newTech = Object.assign({}, this.tech);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис відредаговано");
                        EventBus.$emit("edit-tech", newTech)
                    })
                        .catch(err => alert(err));
                } else {
                    axios({
                        method: "POST",
                        url: "api/technical_stuff/",
                        data: this.tech,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const newTech = Object.assign({}, this.tech);
                        this.close();
                        EventBus.$emit("call-snackbar", "Запис додано");
                        EventBus.$emit("add-tech", newTech);
                    }).catch(err => alert(err));
                }
            },
        },
        mounted() {
            axios.get("api/category_of_workers")
                .then(res => {
                    res.data.forEach(i => this.categories.push(i));
                }).catch(err => alert(err));

            EventBus.$on("tech-edit-dialog", (tech) => {
                this.tech = Object.assign({}, tech);
                this.dialog = true;
            });
        }
    }
</script>

<style scoped>

</style>