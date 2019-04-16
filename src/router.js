import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Workers from "@/pages/Workers";
import TechnicalStuff from "@/pages/TechnicalStuff";
import Planes from "@/pages/Planes";
import Helicopters from "@/pages/Helicopters";
import Rockets from "@/pages/Rockets";
import Gliders from "@/pages/Gliders";
import HangGliders from "@/pages/HangGliders";
import MadePlanes from "@/pages/MadePlanes";
import MadeRockets from "@/pages/MadeRockets";
import MadeHelicopters from "@/pages/MadeHelicopters";
import MadeGliders from "@/pages/MadeGliders";
import MadeHangGliders from "@/pages/MadeHangGliders";
import Enterprise from "@/pages/Enterprise";
import Departments from "@/pages/Departments";
import Areas from "@/pages/Areas";


Vue.use(VueRouter);

const routes = [
    {path: '/', component: HelloWorld},
    {path: '/workers', component: Workers},
    {path: '/tech', component: TechnicalStuff},
    {path: '/planes', component: Planes},
    {path: '/helicopters', component: Helicopters},
    {path: '/rockets', component: Rockets},
    {path: '/gliders', component: Gliders},
    {path: '/hang_gliders', component: HangGliders},
    {path: '/made_planes', component: MadePlanes},
    {path: '/made_rockets', component: MadeRockets},
    {path: '/made_helicopters', component: MadeHelicopters},
    {path: '/made_gliders', component: MadeGliders},
    {path: '/made_hang_gliders', component: MadeHangGliders},
    {path: '/enterprises', component: Enterprise},
    {path: '/departments', component: Departments},
    {path: '/areas', component: Areas},
    {path: '*', component: HelloWorld}
];

export default new VueRouter({
    mode: 'history',
    routes
});