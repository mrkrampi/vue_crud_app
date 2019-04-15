<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="departments"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.address }}</td>
            <td class="text-xs-left">{{ props.item.technicalStuff.firstName + ' ' + props.item.technicalStuff.lastName }}</td>
            <td class="text-xs-left">{{ props.item.enterprise.name }}</td>
            <td class="justify-center layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editDepartment(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteDepartment(props.item)"
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

    export default {
        name: "DepartmentsTable",
        data() {
            return {
                headers: [
                    {text: 'Адреса', value: 'address', sortable: false},
                    {text: 'Начальник цеху', value: 'technicalStuff', sortable: false},
                    {text: 'Підприємство', value: 'enterprise', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false}
                ],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
                departments: []
            }
        },
        methods: {
            deleteDepartment(department) {
                axios.delete("api/departments/" + department.id)
                    .then(() => {
                        EventBus.$emit("call-snackbar", "Запис видалено");
                        let index = this.departments.findIndex(x => x.id === department.id);
                        this.departments.splice(index, 1);
                    });
            },
            editDepartment(department) {
                EventBus.$emit("department-edit-dialog", department)
            }
        },
        mounted() {
            axios.get("api/departments")
                .then(res => {
                    this.departments = res.data;
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            EventBus.$on("edit-department", (department) => {
                let index = this.departments.findIndex(x => x.id === department.id);
                this.departments.splice(index, 1, department);
            });

            EventBus.$on("add-department", (department) => {
                this.departments.unshift(department);
            });
        }
    }
</script>

<style scoped>

</style>