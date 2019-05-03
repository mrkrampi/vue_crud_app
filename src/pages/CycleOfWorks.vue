<template>
    <div>
        <universal-table
                :headers="headers"
                :api-link="apiLink"
                table-name="Цикли робіт"
                :items="items"
                :loading="loading"
        ></universal-table>
        <cycle-of-works-dialog></cycle-of-works-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import axios from 'axios';
    import CycleOfWorksTable from "@/components/cycle_of_works/CycleOfWorksTable";
    import CycleOfWorksDialog from "@/components/cycle_of_works/CycleOfWorksDialog";
    import Snackbar from "@/components/others/Snackbar";
    import UniversalTable from "@/components/UniversalTable";

    export default {
        name: "CycleOfWorks",
        components: {UniversalTable, Snackbar, CycleOfWorksDialog, CycleOfWorksTable},
        data() {
            return {
                apiLink: 'cycle_of_works',
                headers: [
                    {text: 'Цикл робіт', value: 'name', sortable: false},
                    {text: 'Опис', value: 'description', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false},
                ],
                items: [],
                loading: true,
            }
        },
        mounted() {
            axios.get(`api/${this.apiLink}`)
                .then(response => {
                    this.items = response.data;
                }).catch(error => console.log(error))
                .finally(() => this.loading = false);
        }
    }
</script>