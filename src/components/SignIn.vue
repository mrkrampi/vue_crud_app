<template>
    <v-form>
        <v-container>
            <v-layout row wrap>

                <v-flex xs12 sm6 md6 offset-md3>
                    <v-text-field
                            label="Логін"
                            single-line
                            v-model="user.username"
                    ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6 offset-md3>
                    <v-text-field
                            label="Пароль"
                            single-line
                            type="password"
                            v-model="user.password"
                    ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6 offset-md3>
                    <v-btn
                            block
                            color="secondary"
                            @click="signIn"
                    >
                        Авторизуватися
                    </v-btn>
                </v-flex>

            </v-layout>
        </v-container>
    </v-form>
</template>

<script>
    import {HTTP} from '@/util/HTTP'
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "SignIn",
        components: {Snackbar},
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            signIn() {
                HTTP({
                    method: 'POST',
                    url: '/api/auth/signin',
                    data: this.user,
                }).then(response => {
                    const jwt = response.data.accessToken;
                    const role = response.data.role[0].name;
                    localStorage.setItem('jwt', jwt);
                    localStorage.setItem('role', role);

                    this.$root.$emit('login');

                    this.$router.push("/workers");
                })
                    .catch(() => {
                        this.$root.$emit(`call-snackbar', 'Неправильне ім'я користувача або пароль`);
                    });
            }
        }
    }
</script>
