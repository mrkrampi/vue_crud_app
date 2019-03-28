<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="date"
                    label="Дата народження"
                    prepend-icon="event"
                    readonly
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
                ref="picker"
                v-model="date"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
        ></v-date-picker>
    </v-menu>
</template>

<script>
    export default {
        name: "BirthdayPicker",
        props: ["defaultValue"],
        data: () => ({
            date: null,
            menu: false
        }),
        mounted() {
            if (this.defaultValue) {
                this.date = new Date(this.defaultValue);
            }
        },
        watch: {
            menu (val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            }
        },
        methods: {
            save (date) {
                this.$refs.menu.save(date)
            }
        }
    }
</script>

<style scoped>

</style>