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
            :return-value="date"
            return-object
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="date"
                    label="Picker in menu"
                    prepend-icon="event"
                    readonly
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable locale="uk" :reactive="true" return-value>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
    export default {
        name: "DatePicker",
        props: {
            defaultValue: String
        },
        data() {
            return {
                date: this.defaultValue,
                menu: false,
                modal: false,
            }
        },
        watch: {
            defaultValue(newVal) {
                console.log(newVal);
                if (newVal) {
                    this.date = new Date(newVal).toISOString().substr(0, 10);
                } else {
                    this.date = new Date().toISOString().substr(0, 10);
                }
            },
        },
        methods: {
            getDate() {
                return this.date;
            }
        },
        mounted() {
            console.log(this.defaultValue);
        }
    }
</script>
