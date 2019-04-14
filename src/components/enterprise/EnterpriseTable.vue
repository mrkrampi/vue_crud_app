<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="enterprises"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.managerOfCompany }}</td>
            <td class="text-xs-left">{{ props.item.typeOfActivity }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>
            <td class="text-xs-left">{{ props.item.requisites }}</td>
            <td class="justify-center layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editEnterprise(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteEnterprise(props.item)"
                >
                    delete
                </v-icon>
            </td>
        </template>
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:no-data>
        </template>
    </v-data-table>
</template>

<script>
    import axios from 'axios';
    import {EventBus} from "@/event-bus";
    import getIndex from "@/utils/utils";

    export default {
        name: "EnterpriseTable",
        data() {
            return {
                headers: [
                    {text: 'Назва', value: 'name', sortable: false},
                    {text: 'Керівник', value: 'managerOfCompany', sortable: false},
                    {text: 'Тип діяльності', value: 'typeOfActivity', sortable: false},
                    {text: 'Адрес', value: 'address', sortable: false},
                    {text: 'Реквізити', value: 'requisites', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false}
                ],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
                enterprises: []
            }
        },
        methods: {
            deleteEnterprise(enterprise) {
                axios.delete("api/enterprise/" + enterprise.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        const index = this.enterprises.indexOf(enterprise);
                        this.enterprises.splice(index, 1);
                    });
            },
            editEnterprise(enterprise) {
                EventBus.$emit("enterprise-edit-dialog", enterprise)
            }
        },
        mounted() {
            axios.get("api/enterprise")
                .then(res => {
                    this.enterprises = res.data;
                    this.enterprises.sort((a, b) => a.name > b.name ? 1 : -1);
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            EventBus.$on("edit-enterprise", (enterprise) => {
                let index = getIndex(this.enterprises, enterprise.id);
                this.enterprises.splice(index, 1, enterprise);
            });

            EventBus.$on("add-enterprise", (enterprise) => {
                this.enterprises.unshift(enterprise);
            });
        }
    }
</script>