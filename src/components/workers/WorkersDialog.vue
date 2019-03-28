<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Додати працівника</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{formTitle}}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="worker.firstName" label="Ім'я"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="worker.patronymic" label="По батькові"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="worker.lastName" label="Прізвище"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <!--                            <birthday-picker></birthday-picker>-->
                            <v-text-field v-model="worker.birthday" label="Дата народження"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field v-model="worker.phoneNumber" label="Номер телефону"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-text-field v-model="worker.address" label="Адреса"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field v-model="worker.salary" label="Зарплата"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field v-model="worker.hireDate" label="Дата прийому на роботу"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-select
                                    :items="categories"
                                    v-model="worker.category"
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
        name: "WorkersDialog",
        components: {/*BirthdayPicker*/},
        data() {
            return {
                categories: [],
                dialog: false,
                worker: {
                    fistName: '',
                    patronymic: '',
                    lastName: '',
                    phoneNumber: '',
                    salary: 0,
                    hireDate: new Date(),
                    birthday: new Date()
                },
                defaultWorker: {
                    fistName: '',
                    patronymic: '',
                    lastName: '',
                    phoneNumber: '',
                    salary: 0,
                    hireDate: new Date(),
                    birthday: new Date()
                }
            }
        },
        computed: {
            formTitle() {
                return this.worker.id ? "Редагування" : "Додавання";
            }
        },
        watch: {
            dialog(val) {
                if (!val) {
                    this.worker = {};
                    this.close();
                }
            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.worker = Object.assign({}, this.defaultWorker);
                }, 300)
            },
            save() {
                if (this.worker.id) {
                    axios({
                        method: "PUT",
                        url: "api/workers/" + this.worker.id,
                        data: this.worker,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const worker = Object.assign({}, this.worker);
                        this.close();
                        EventBus.$emit("edit-worker", worker)
                    })
                        .catch(err => alert(err));
                } else {
                    axios({
                        method: "POST",
                        url: "api/workers/",
                        data: this.worker,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        const worker = Object.assign({}, this.worker);
                        this.close();
                        EventBus.$emit("add-worker", worker);
                    }).catch(err => alert(err));
                }
            },
        },
        mounted() {
            axios.get("api/category_of_workers")
                .then(res => {
                    res.data.forEach(i => this.categories.push(i));
                    // alert(JSON.stringify(this.categories));
                }).catch(() => alert("suka"));

            EventBus.$on("workers-edit-dialog", (worker) => {
                this.worker = Object.assign({}, worker);
                this.dialog = true;
            });
        }
    }
</script>

<style scoped>

</style>