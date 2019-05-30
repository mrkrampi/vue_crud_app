import Vue from 'vue'
import Router from "vue-router";
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
import Query14 from "@/components/queries/Query14";
import Query13 from "@/components/queries/Query13";
import Query12 from "@/components/queries/Query12";
import Query11 from "@/components/queries/Query11";
import Query10 from "@/components/queries/Query10";
import Query9 from "@/components/queries/Query9";
import Query7 from "@/components/queries/Query7";
import Query6 from "@/components/queries/Query6";
import Query5 from "@/components/queries/Query5";
import Query4 from "@/components/queries/Query4";
import Query3 from "@/components/queries/Query3";
import Query1 from "@/components/queries/Query1";
import Query2 from "@/components/queries/Query2";
import Query8 from "@/components/queries/Query8";
import SignIn from "@/components/SignIn";

Vue.use(Router);

const routes = [
    {path: '/', component: HelloWorld, meta: {requireAuth: true}},
    {path: '/workers', component: Workers, meta: {requireAuth: true}},
    {path: '/tech', component: TechnicalStuff, meta: {requireAuth: true}},
    {path: '/testers', component: Testers, meta: {requireAuth: true}},
    {path: '/planes', component: Planes, meta: {requireAuth: true}},
    {path: '/helicopters', component: Helicopters, meta: {requireAuth: true}},
    {path: '/rockets', component: Rockets, meta: {requireAuth: true}},
    {path: '/gliders', component: Gliders, meta: {requireAuth: true}},
    {path: '/hang_gliders', component: HangGliders, meta: {requireAuth: true}},
    {
        path: '/made_planes',
        component: MadeProducts,
        props: {apiLink: 'made_planes', tableName: 'Виготовлення літаків'},
        meta: {requireAuth: true}
    },
    {
        path: '/made_helicopters',
        component: MadeProducts,
        props: {apiLink: 'made_helicopters', tableName: 'Виготовлення гелікоптерів'},
        meta: {requireAuth: true}
    },
    {
        path: '/made_rockets',
        component: MadeProducts,
        props: {apiLink: 'made_rockets', tableName: 'Виготовлення ракет'},
        meta: {requireAuth: true}
    },
    {
        path: '/made_gliders',
        component: MadeProducts,
        props: {apiLink: 'made_gliders', tableName: 'Виготовлення планерів'},
        meta: {requireAuth: true}
    },
    {
        path: '/made_hang_gliders',
        component: MadeProducts,
        props: {apiLink: 'made_hang_gliders', tableName: 'Виготовлення дельтапланів'},
        meta: {requireAuth: true}
    },
    {path: '/enterprises', component: Enterprise, meta: {requireAuth: true}},
    {path: '/departments', component: Departments, meta: {requireAuth: true}},
    {path: '/areas', component: Areas, meta: {requireAuth: true}},
    {path: '/categories', component: Categories, meta: {requireAuth: true}},
    {path: '/brigades', component: Brigades, meta: {requireAuth: true}},
    {path: '/equipments', component: Equipment, meta: {requireAuth: true}},
    {path: '/type_of_tests', component: TypeOfTests, meta: {requireAuth: true}},
    {path: '/category_of_workers', component: CategoryOfWorkers, meta: {requireAuth: true}},
    {path: '/cycle_of_works', component: CycleOfWorks, meta: {requireAuth: true}},
    {path: '/laboratories', component: Laboratories, meta: {requireAuth: true}},
    {
        path: '/gliders_tests',
        component: ProductsTests,
        props: {apiLink: 'gliders_tests', tableName: 'Тестування планерів'},
        meta: {requireAuth: true}
    },
    {
        path: '/hang_gliders_tests',
        component: ProductsTests,
        props: {apiLink: 'hang_gliders_tests', tableName: 'Тестування дельтапланів'},
        meta: {requireAuth: true}
    },
    {
        path: '/helicopters_tests',
        component: ProductsTests,
        props: {apiLink: 'helicopters_tests', tableName: 'Тестування гелікоптерів'},
        meta: {requireAuth: true}
    },
    {
        path: '/plane_tests',
        component: ProductsTests,
        props: {apiLink: 'planes_tests', tableName: 'Тестування літаків'},
        meta: {requireAuth: true}
    },
    {
        path: '/rockets_tests',
        component: ProductsTests,
        props: {apiLink: 'rockets_tests', tableName: 'Тестування ракет'},
        meta: {requireAuth: true}
    },
    {path: '/query1', component: Query1, meta: {requireAuth: true}},
    {path: '/query2', component: Query2, meta: {requireAuth: true}},
    {path: '/query3', component: Query3, meta: {requireAuth: true}},
    {path: '/query4', component: Query4, meta: {requireAuth: true}},
    {path: '/query5', component: Query5, meta: {requireAuth: true}},
    {path: '/query6', component: Query6, meta: {requireAuth: true}},
    {path: '/query7', component: Query7, meta: {requireAuth: true}},
    {path: '/query8', component: Query8, meta: {requireAuth: true}},
    {path: '/query9', component: Query9, meta: {requireAuth: true}},
    {path: '/query10', component: Query10, meta: {requireAuth: true}},
    {path: '/query11', component: Query11, meta: {requireAuth: true}},
    {path: '/query12', component: Query12, meta: {requireAuth: true}},
    {path: '/query13', component: Query13, meta: {requireAuth: true}},
    {path: '/query14', component: Query14, meta: {requireAuth: true}},
    {path: '/sign-in', component: SignIn},
    {
        path: '/logout'},
    {path: '*', component: HelloWorld}
];

const router = new Router({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!localStorage.getItem('jwt')) {
            next({
                path: '/sign-in',
                params: {nextUrl: to.fullPath}
            })
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
