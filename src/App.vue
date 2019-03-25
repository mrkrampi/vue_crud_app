<template>
    <v-app>
        <v-navigation-drawer app v-model="drawer"></v-navigation-drawer>
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer app></v-footer>
    </v-app>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                drawer: false
            }
        }
    }
</script>

<style>
</style>
