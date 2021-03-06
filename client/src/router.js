import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue';
import Register from './views/register.vue';
import Login from './views/login.vue'
import NOTFOUND from './views/404.vue';
import Home from './views/Home.vue'
import InfoShow from './views/InfoShow.vue'
import ProptiesTable from './views/ProptiesTable.vue';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: '/index',
            name: 'index',
            component: Index,
            children: [
                { path: "", component: Home },
                { path: "/home", name: "home", component: Home },
                { path: "/infoShow", name: "infoShow", component: InfoShow },
                { path: "/ProptiesTable", name: "ProptiesTable", component: ProptiesTable }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/*',
            name: '404',
            component: NOTFOUND
        },

    ]
})

//路由守卫

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false
    if (to.path === "/login" || to.path === "/register") {
        next()
    } else {
        isLogin ? next() : next('login')
    }

})

export default router