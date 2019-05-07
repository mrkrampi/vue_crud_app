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
import CycleOfWorks from "@/pages/CycleOfWorks";
import Testers from "@/pages/Testers";
import MadeProducts from "@/pages/MadeProducts";


Vue.use(VueRouter);

const routes = [
    {path: '/', component: HelloWorld},
    {path: '/workers', component: Workers},
    {path: '/tech', component: TechnicalStuff},
    {path: '/testers', component: Testers},
    {path: '/planes', component: Planes},
    {path: '/helicopters', component: Helicopters},
    {path: '/rockets', component: Rockets},
    {path: '/gliders', component: Gliders},
    {path: '/hang_gliders', component: HangGliders},
    {
        path: '/made_planes',
        component: MadeProducts,
        props: {apiLink: 'made_planes', tableName: 'Виготовлення літаків'}
    },
    {
        path: '/made_helicopters',
        component: MadeProducts,
        props: {apiLink: 'made_helicopters', tableName: 'Виготовлення гелікоптерів'}
    },
    {
        path: '/made_rockets',
        component: MadeProducts,
        props: {apiLink: 'made_rockets', tableName: 'Виготовлення ракет'}
    },
    {
        path: '/made_gliders',
        component: MadeProducts,
        props: {apiLink: 'made_gliders', tableName: 'Виготовлення планерів'}
    },
    {
        path: '/made_hang_gliders',
        component: MadeProducts,
        props: {apiLink: 'made_hang_gliders', tableName: 'Виготовлення дельтапланів'}
    },
    {path: '/enterprises', component: Enterprise},
    {path: '/departments', component: Departments},
    {path: '/areas', component: Areas},
    {path: '/categories', component: Categories},
    {path: '/brigades', component: Brigades},
    {path: '/equipments', component: Equipment},
    {path: '/type_of_tests', component: TypeOfTests},
    {path: '/category_of_workers', component: CategoryOfWorkers},
    {path: '/cycle_of_works', component: CycleOfWorks},
    {path: '/laboratories', component: Laboratories},
    {
        path: '/gliders_tests',
        component: ProductsTests,
        props: {apiLink: 'gliders_tests', tableName: 'Тестування планерів'}
    },
    {
        path: '/hang_gliders_tests',
        component: ProductsTests,
        props: {apiLink: 'hang_gliders_tests', tableName: 'Тестування дельтапланів'}
    },
    {
        path: '/helicopters_tests',
        component: ProductsTests,
        props: {apiLink: 'helicopters_tests', tableName: 'Тестування гелікоптерів'}
    },
    {
        path: '/plane_tests',
        component: ProductsTests,
        props: {apiLink: 'planes_tests', tableName: 'Тестування літаків'}
    },
    {
        path: '/rockets_tests',
        component: ProductsTests,
        props: {apiLink: 'rockets_tests', tableName: 'Тестування ракет'}
    },
    {path: '*', component: HelloWorld}
];

export default new VueRouter({
    mode: 'history',
    routes
});