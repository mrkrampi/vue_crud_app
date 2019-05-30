<template>
    <v-app id="sandbox">
        <navigation></navigation>
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
            <snackbar></snackbar>
        </v-content>
    </v-app>
</template>

<script>
    import Navigation from "@/components/Navigation";
    import Snackbar from "@/components/others/Snackbar";
    export default {
        name: 'app',
        components: {Snackbar, Navigation},
        mounted() {
            this.$root.$emit('load-page');
        }
    }
</script>
