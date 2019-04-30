<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="equipments"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="justify-right layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editEquipment(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteEquipment(props.item)"
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

    export default {
        name: "EquipmentTable",
        data() {
            return {
                headers: [
                    {text: 'Назва обладнання', value: 'category', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false},
                ],
                equipments: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteEquipment(equipment) {
                axios.delete("api/equipments/" + equipment.id)
                    .then(() => {
                        this.$root.$emit("call-snackbar", "Запис видалено");
                        let index = this.equipments.findIndex(x => x.id === equipment.id);
                        this.equipments.splice(index, 1);
                    });
            },
            editEquipment(equipment) {
                this.$root.$emit("equipment-edit-dialog", equipment)
            }
        },
        mounted() {
            axios.get("api/equipments")
                .then(res => {
                    this.equipments = res.data;
                    this.equipments.sort((a, b) => a.name > b.name ? 1 : -1)
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            this.$root.$on("edit-equipment", (equipment) => {
                let index = this.equipments.findIndex(x => x.id === equipment.id);
                this.equipments.splice(index, 1, equipment);
            });

            this.$root.$on("add-equipment", (equipment) => {
                this.equipments.unshift(equipment);
            });
        }
    }
</script>