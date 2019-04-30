<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="categories"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-10"
    >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <td>{{ props.item.category }}</td>
            <td class="justify-right layout px-0">
                <v-icon
                        small
                        class="mr-2"
                        @click="editCategory(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteCategory(props.item)"
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
        name: "CategoriesTable",
        data() {
            return {
                headers: [
                    {text: 'Назва категорії', value: 'category', sortable: false},
                    {text: 'Дії', value: 'name', sortable: false},
                ],
                categories: [],
                loading: true,
                pagination: {
                    rowsPerPage: 10
                },
            }
        },
        methods: {
            deleteCategory(category) {
                axios.delete("api/categories/" + category.id)
                    .then(() => {
                        this.$root.$emit("call-snackbar", "Запис видалено");
                        let index = this.categories.findIndex(x => x.id === category.id);
                        this.categories.splice(index, 1);
                    });
            },
            editCategory(category) {
                this.$root.$emit("category-edit-dialog", category)
            }
        },
        mounted() {
            axios.get("api/categories")
                .then(res => {
                    this.categories = res.data;
                    this.categories.sort((a, b) => a.name > b.name ? 1 : -1)
                })
                .catch(() => console.log("Сервер недоступний"))
                .finally(() => this.loading = false);

            this.$root.$on("edit-category", (category) => {
                let index = this.categories.findIndex(x => x.id === category.id);
                this.categories.splice(index, 1, category);
            });

            this.$root.$on("add-category", (category) => {
                this.categories.unshift(category);
            });
        }
    }
</script>