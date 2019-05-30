<template>
        <div id="login" v-show="isAuth">
            <v-label>{{roleName}}</v-label>
            <v-icon
                    small
                    class="mx-3"
                    @click="logout"
            >
                logout
            </v-icon>
        </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data() {
            return {
                isAuth: true,
                roleName: ''
            }
        },
        methods: {
            logout() {
                localStorage.clear();
                this.isAuth = false;
                this.$router.push('/sign-in');
            },
        },
        mounted() {
            this.$root.$on('login', () => {
                this.isAuth = true;
                this.roleName = localStorage.getItem('role');
            });

            this.$root.$on('load-page', () => {
                if (localStorage.getItem('jwt')) {
                    this.isAuth = true;
                    this.roleName = localStorage.getItem('role');
                } else {
                    this.isAuth = false;
                }
            })
        }
    }
</script>
