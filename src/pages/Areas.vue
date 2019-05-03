<template>
    <div>
        <universal-table
                :headers="headers"
                :api-link="apiLink"
                table-name="Цикли робіт"
                :items="items"
                :loading="loading"
        ></universal-table>
        <areas-dialog></areas-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import axios from 'axios';
    import AreasTable from "@/components/areas/AreasTable";
    import AreasDialog from "@/components/areas/AreasDialog";
    import Snackbar from "@/components/others/Snackbar";
    import UniversalTable from "@/components/UniversalTable";

    export default {
        name: "Areas",
        components: {UniversalTable, Snackbar, AreasDialog, AreasTable},
        data() {
            return {
                apiLink: 'areas',
                headers: [
                    {text: 'Назва', value: 'name', sortable: true},
                    {text: 'Начальник ділянки', value: 'techName', sortable: false},
                    {text: 'Цех', value: 'departmentName', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
                items: [],
                loading: true,
            }
        },
        mounted() {
            axios.get(`api/${this.apiLink}`)
                .then(response => {
                    this.items = response.data;
                    this.items.forEach(item => {
                        item.techName = `${item.technicalStuff.firstName}  ${item.technicalStuff.lastName}`;
                        item.departmentName = item.department.address;
                    })
                }).catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>