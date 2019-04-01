<template>
    <div>
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
        >
            <v-toolbar>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-title class="title">
                            Меню
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-list class="pt-1">
                <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        
                        @click="go(item.path)"
                >
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

        </v-navigation-drawer>
        <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
            <v-toolbar-side-icon
                    v-if="primaryDrawer.type !== 'permanent'"
                    @click.stop="primaryDrawer.model = !primaryDrawer.model"
            ></v-toolbar-side-icon>
            <v-toolbar-title>База даних</v-toolbar-title>
<!--            <v-spacer></v-spacer>-->
<!--            <v-switch-->
<!--                    v-model="dark"-->
<!--                    :label="`Dark mode`"-->
<!--            ></v-switch>-->
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        name: "Navigation",
        data() {
            return {
                drawer: false,
                dark: false,
                primaryDrawer: {
                    model: false,
                    type: 'temporary',
                    clipped: true,
                    floating: true,
                    mini: false
                },
                footer: {
                    inset: false
                },
                items: [
                    {title: 'Працівники', path: "/workers"},
                    {title: 'Технічні працівники', path: "/tech"},
                    {title: 'Літаки', path: "/planes"},
                    {title: 'Ракети', path: "/rockets"},
                    {title: 'Гелікоптери', path: "/helicopters"},
                    {title: 'Планери', path: "/gliders"},
                    {title: 'Дельтаплани', path: "/hand_dliders"},
                ]
            }
        },
        methods: {
            go(path) {
                this.$router.push(path);
            }
        }
    }
</script>

<style scoped>

</style>