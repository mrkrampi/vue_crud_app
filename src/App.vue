<template>
    <v-app id="sandbox">
        <navigation></navigation>
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Navigation from "@/components/Navigation";
    export default {
        name: 'app',
        components: {Navigation},
        mounted() {
        }
    }
</script>

<style>
</style>
