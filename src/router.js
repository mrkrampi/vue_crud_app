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
import Categories from "@/pages/Categories";
import Brigades from "@/pages/Brigades";
import Equipment from "@/pages/Equipment";
import TypeOfTests from "@/pages/TypeOfTests";
import ProductsTests from "@/pages/ProductsTests";
import Laboratories from "@/pages/Laboratories";
import CategoryOfWorkers from "@/pages/CategoryOfWorkers";


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
    {path: '/categories', component: Categories},
    {path: '/brigades', component: Brigades},
    {path: '/equipments', component: Equipment},
    {path: '/type_of_tests', component: TypeOfTests},
    {path: '/category_of_workers', component: CategoryOfWorkers},
    {path: '/laboratories', component: Laboratories},
    {
        path: '/gliders_tests',
        component: ProductsTests,
        props: {link: 'gliders_tests', nameForProduct: 'Назва планера'}
    },
    {
        path: '/hang_gliders_tests',
        component: ProductsTests,
        props: {link: 'hang_gliders_tests', nameForProduct: 'Назва дельтаплана'}
    },
    {
        path: '/helicopters_tests',
        component: ProductsTests,
        props: {link: 'helicopters_tests', nameForProduct: 'Назва гелікоптера'}
    },
    {
        path: '/plane_tests',
        component: ProductsTests,
        props: {link: 'planes_tests', nameForProduct: 'Назва літака'}
    },
    {
        path: '/rockets_tests',
        component: ProductsTests,
        props: {link: 'rockets_tests', nameForProduct: 'Назва ракети'}
    },
    {path: '*', component: HelloWorld}
];

export default new VueRouter({
    mode: 'history',
    routes
});