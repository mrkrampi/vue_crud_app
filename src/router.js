import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Workers from "@/pages/Workers";
import TechnicalStuff from "@/pages/TechnicalStuff";
import Planes from "@/pages/Planes";
import Helicopters from "@/pages/Helicopters";
import Rockets from "@/pages/Rockets";
import Gliders from "@/pages/Gliders";
import HandDliders from "@/pages/HandDliders";
import MadePlanes from "@/pages/MadePlanes";
import MadeRockets from "@/pages/MadeRockets";


Vue.use(VueRouter);

const routes = [
    {path: '/', component: HelloWorld},
    {path: '/workers', component: Workers},
    {path: '/tech', component: TechnicalStuff},
    {path: '/planes', component: Planes},
    {path: '/helicopters', component: Helicopters},
    {path: '/rockets', component: Rockets},
    {path: '/gliders', component: Gliders},
    {path: '/hand_dliders', component: HandDliders},
    {path: '/made_planes', component: MadePlanes},
    {path: '/made_rockets', component: MadeRockets},
    {path: '*', component: HelloWorld}
];

export default new VueRouter({
    mode: 'history',
    routes
});