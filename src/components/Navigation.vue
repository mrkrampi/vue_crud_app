<template>
    <nav>
        <v-toolbar :clipped="primaryDrawer.clipped" app fixed>
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
                    {title: 'Тестери', path: "/testers", role: ["admin", "hr"]},
                    {title: 'Підприємства', path: "/enterprises", role: ["admin", "hr"]},
                    {title: 'Літаки', path: "/planes", role: ["admin", "tech"]},
                    {title: 'Ракети', path: "/rockets", role: ["admin", "tech"]},
                    {title: 'Гелікоптери', path: "/helicopters", role: ["admin", "tech"]},
                    {title: 'Планери', path: "/gliders", role: ["admin", "tech"]},
                    {title: 'Дельтаплани', path: "/hang_gliders", role: ["admin", "tech"]},
                    {title: 'Виготовлення літаків', path: "/made_planes", role: ["admin", "tech"]},
                    {title: 'Виготовлення ракет', path: "/made_rockets", role: ["admin", "tech"]},
                    {title: 'Виготовлення гелікоптерів', path: "/made_helicopters", role: ["admin", "tech"]},
                    {title: 'Виготовлення планерів', path: "/made_gliders", role: ["admin", "tech"]},
                    {title: 'Виготовлення дельтапланів', path: "/made_hang_gliders", role: ["admin", "tech"]},
                    {title: 'Цехи', path: "/departments", role: ["admin", "tech"]},
                    {title: 'Ділянки', path: "/areas", role: ["admin", "tech"]},
                    {title: 'Категорії', path: "/categories", role: ["admin", "tech"]},
                    {title: 'Бригади', path: "/brigades", role: ["admin", "tech"]},
                    {title: 'Обладнання', path: "/equipments", role: ["admin", "tech"]},
                    {title: 'Типи тестів', path: "/type_of_tests", role: ["admin", "tech"]},
                    {title: 'Лабораторії', path: "/laboratories", role: ["admin", "tech"]},
                    {title: 'Тестування планерів', path: "/gliders_tests", role: ["admin", "tech"]},
                    {title: 'Тестування дельтапланів', path: "/hang_gliders_tests", role: ["admin", "tech"]},
                    {title: 'Тестування гелікоптерів', path: "/helicopters_tests", role: ["admin", "tech"]},
                    {title: 'Тестування літаків', path: "/plane_tests", role: ["admin", "tech"]},
                    {title: 'Тестування ракет', path: "/rockets_tests", role: ["admin", "tech"]},
                    {title: 'Категорії працівників', path: "/category_of_workers", role: ["admin", "tech"]},
                    {title: 'Цикли робіт', path: "/cycle_of_works", role: ["admin", "tech"]},
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