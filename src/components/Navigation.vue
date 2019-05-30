<template>
    <nav>
        <v-toolbar :clipped="primaryDrawer.clipped" app fixed>
            <v-toolbar-side-icon
                    v-if="primaryDrawer.type !== 'permanent'"
                    @click="primaryDrawer.model = !primaryDrawer.model"
            ></v-toolbar-side-icon>
            <v-toolbar-title>База даних</v-toolbar-title>
            <v-spacer></v-spacer>
            <user-info></user-info>
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
                        v-show="check(item.role)"
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
    import UserInfo from "@/components/UserInfo";
    export default {
        name: "Navigation",
        components: {UserInfo},
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
                    {title: 'Працівники', path: "/workers", role: ["ROLE_ADMIN", "ROLE_HR"]},
                    {title: 'Технічні працівники', path: "/tech", role: ["ROLE_ADMIN", "ROLE_HR"]},
                    {title: 'Тестери', path: "/testers", role: ["ROLE_ADMIN", "ROLE_HR", "ROLE_TESTER"]},
                    {title: 'Підприємства', path: "/enterprises", role: ["ROLE_ADMIN", "ROLE_HR"]},
                    {title: 'Літаки', path: "/planes", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Ракети', path: "/rockets", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Гелікоптери', path: "/helicopters", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Планери', path: "/gliders", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Дельтаплани', path: "/hang_gliders", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Виготовлення літаків', path: "/made_planes", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Виготовлення ракет', path: "/made_rockets", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Виготовлення гелікоптерів', path: "/made_helicopters", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Виготовлення планерів', path: "/made_gliders", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Виготовлення дельтапланів', path: "/made_hang_gliders", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Цехи', path: "/departments", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Ділянки', path: "/areas", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Категорії', path: "/categories", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Бригади', path: "/brigades", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Обладнання', path: "/equipments", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Типи тестів', path: "/type_of_tests", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Лабораторії', path: "/laboratories", role: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_TESTER"]},
                    {title: 'Тестування планерів', path: "/gliders_tests", role: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_TESTER"]},
                    {title: 'Тестування дельтапланів', path: "/hang_gliders_tests", role: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_TESTER"]},
                    {title: 'Тестування гелікоптерів', path: "/helicopters_tests", role: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_TESTER"]},
                    {title: 'Тестування літаків', path: "/plane_tests", role: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_TESTER"]},
                    {title: 'Тестування ракет', path: "/rockets_tests", role: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_TESTER"]},
                    {title: 'Категорії працівників', path: "/category_of_workers", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Цикли робіт', path: "/cycle_of_works", role: ["ROLE_ADMIN", "ROLE_MANAGER"]},
                    {title: 'Запит №1', path: "/query1", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №2', path: "/query2", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №3', path: "/query3", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №4', path: "/query4", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №5', path: "/query5", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №6', path: "/query6", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №7', path: "/query7", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №8', path: "/query8", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №9', path: "/query9", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №10', path: "/query10", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №11', path: "/query11", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №12', path: "/query12", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №13', path: "/query13", role: ["ROLE_ADMIN"]},
                    {title: 'Запит №14', path: "/query14", role: ["ROLE_ADMIN"]},
                ]
            }
        },
        methods: {
            go(path) {
                this.$router.push(path)
            },
            check(roles) {
                const appRoles = localStorage.getItem("role");
                return roles.indexOf(appRoles) !== -1;
            }
        }
    }
</script>
