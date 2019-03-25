<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="workers"
            class="elevation-1"
    >
        <template v-slot:items="props">
            <td>{{ props.item.firstName + ' ' + props.item.lastName }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>
            <td class="text-xs-left">{{ props.item.phoneNumber }}</td>
            <td class="text-xs-left">{{ props.item.salary }}</td>
            <td class="text-xs-left">{{ props.item.category.categoryName }}</td>
            <td class="justify-center layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editWorker(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteWorker(props.item)"
                >
                    delete
                </v-icon>
            </td>
        </template>
        <template v-slot:no-data>
        </template>
    </v-data-table>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "WorkersTable",
        data() {
            return {
                dialog: false,
                headers: [
                    {
                        text: 'ПІБ',
                        value: 'name'
                    },
                    { text: 'Адреса', value: 'address' },
                    { text: 'Номер телефону', value: 'phoneNumber' },
                    { text: 'Зарплата', value: 'Salary' },
                    { text: 'Посада', value: 'position' },
                    { text: 'Дії', value: 'name', sortable: false }
                ],
                workers: []
            }
        },
        methods: {
            deleteWorker(worker) {
                axios.delete("api/workers/" + worker.id)
                    .then(() => {
                        const index = this.workers.indexOf(worker);
                        this.workers.splice(index, 1);
                    });
            }
        },
        created() {
            axios.get("api/workers")
                .then(res => {
                    this.workers = res.data;
                });
        }
    }
</script>

<style scoped>

</style>