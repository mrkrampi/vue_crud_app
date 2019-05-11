import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Workers from "@/components/pages/Workers";
import TechnicalStuff from "@/components/pages/TechnicalStuff";
import Planes from "@/components/pages/Planes";
import Helicopters from "@/components/pages/Helicopters";
import Rockets from "@/components/pages/Rockets";
import Gliders from "@/components/pages/Gliders";
import HangGliders from "@/components/pages/HangGliders";
import Enterprise from "@/components/pages/Enterprise";
import Departments from "@/components/pages/Departments";
import Areas from "@/components/pages/Areas";
import Categories from "@/components/pages/Categories";
import Brigades from "@/components/pages/Brigades";
import Equipment from "@/components/pages/Equipment";
import TypeOfTests from "@/components/pages/TypeOfTests";
import ProductsTests from "@/components/pages/ProductsTests";
import Laboratories from "@/components/pages/Laboratories";
import CategoryOfWorkers from "@/components/pages/CategoryOfWorkers";
import CycleOfWorks from "@/components/pages/CycleOfWorks";
import Testers from "@/components/pages/Testers";
import MadeProducts from "@/components/pages/MadeProducts";

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