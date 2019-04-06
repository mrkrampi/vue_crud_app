<template>
    <nav>
        <v-toolbar :clipped="primaryDrawer.clipped" app absolute>
            <v-toolbar-side-icon
                    v-if="primaryDrawer.type !== 'permanent'"
                    @click="primaryDrawer.model = !primaryDrawer.model"
            ></v-toolbar-side-icon>
            <v-toolbar-title>База даних</v-toolbar-title>
        </v-toolbar>
        <v-navigation-drawer
                v-model="primaryDrawer.model"
                :permanent="primaryDrawer.type === 'permanent'"
                :temporary="primaryDrawer.type === 'temporary'"
                :clipped="primaryDrawer.clipped"
                :floating="primaryDrawer.floating"
                absolute
                overflow
                app
        >
            <v-toolbar>
                <v-list dense>
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
    </nav>
</template>

<script>
    export default {
        name: "Navigation",
        data() {
            return {
                drawer: false,
                primaryDrawer: {
                    model: false,
                    type: 'temporary',
                    clipped: true,
                    floating: true,
                },
                footer: {
                    inset: true
                },
                items: [
                    {title: 'Працівники', path: "/workers", role: ["admin", "hr"]},
                    {title: 'Технічні працівники', path: "/tech", role: ["admin", "hr"]},
                    {title: 'Літаки', path: "/planes", role: ["admin", "tech"]},
                    {title: 'Ракети', path: "/rockets", role: ["admin", "tech"]},
                    {title: 'Гелікоптери', path: "/helicopters", role: ["admin", "tech"]},
                    {title: 'Планери', path: "/gliders", role: ["admin", "tech"]},
                    {title: 'Дельтаплани', path: "/hand_dliders", role: ["admin", "tech"]},
                    {title: 'Виготовлення літаків', path: "/made_planes", role: ["admin", "tech"]},
                ]
            }
        },
        methods: {
            go(path) {
                this.$router.push(path)
            }
        }
    }
</script>