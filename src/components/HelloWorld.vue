<template>
    <div>
        <table border="1">
            <thead>
                <td>ID</td>
                <td>firstName</td>
                <td>patronymic</td>
                <td>lastName</td>
                <td>birthday</td>
                <td>address</td>
                <td>phoneNumber</td>
                <td>salary</td>
                <td colspan="2">Дії</td>
                <!--<td>Category</td>-->
            </thead>
            <tr v-for="plane in planes" :key="plane.id">
                <td>{{plane.id}}</td>
                <td>{{plane.firstName}}</td>
                <td>{{plane.patronymic}}</td>
                <td>{{plane.lastName}}</td>
                <td>{{plane.birthday}}</td>
                <td>{{plane.address}}</td>
                <td>{{plane.phoneNumber}}</td>
                <td>{{plane.salary}}</td>
                <td><a href="#">Редагувати</a></td>
                <td><a href="#">Видалити</a></td>
                <!--<td>{{plane.weight}}</td>-->
            </tr>
        </table>
        <br><br><br>
        <p>{{planes}}</p>
    </div>
</template>

<script>
    import {HTTP} from "@/util/HTTP";

    export default {
        name: 'HelloWorld',
        data() {
            return {
                planes: {}
            };
        },
        props: {
            msg: String
        },
        mounted() {
            HTTP.get("api/workers")
                .then(res => {
                    this.planes = res.data;

                    // this.planes.sort((a, b) => {return a.id - b.id})
                });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
