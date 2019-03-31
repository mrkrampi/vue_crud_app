<template>
    <v-app id="sandbox" :dark="!dark">
        <v-navigation-drawer
                v-model="primaryDrawer.model"
                :permanent="primaryDrawer.type === 'permanent'"
                :temporary="primaryDrawer.type === 'temporary'"
                :clipped="primaryDrawer.clipped"
                :floating="primaryDrawer.floating"
                :mini-variant="primaryDrawer.mini"
                absolute
                overflow
                app
        ></v-navigation-drawer>
        <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
            <v-toolbar-side-icon
                    v-if="primaryDrawer.type !== 'permanent'"
                    @click.stop="primaryDrawer.model = !primaryDrawer.model"
            ></v-toolbar-side-icon>
            <v-toolbar-title>База даних</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                drawer: false,
                dark: true,
                primaryDrawer: {
                    model: false,
                    type: 'temporary',
                    clipped: true,
                    floating: true,
                    mini: false
                },
                footer: {
                    inset: false
                }
            }
        }
    }
</script>

<style>
</style>
