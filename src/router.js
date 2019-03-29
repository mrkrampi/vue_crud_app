import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Workers from "@/pages/Workers";
import TechnicalStuff from "@/pages/TechnicalStuff";
import Planes from "@/pages/Planes";
import Helicopters from "@/pages/Helicopters";
import Rockets from "@/pages/Rockets";


Vue.use(VueRouter);

const routes = [
    {path: '/', component: HelloWorld},
    {path: '/workers', component: Workers},
    {path: '/tech', component: TechnicalStuff},
    {path: '/planes', component: Planes},
    {path: '/helicopters', component: Helicopters},
    {path: '/rockets', component: Rockets},
    {path: '*', component: HelloWorld}
];

export default new VueRouter({
    mode: 'history',
    routes
});