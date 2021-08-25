import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { Home } from "./routes/Home"

const routes: RouteRecordRaw[] = [
    {
        name: "Home",
        path: "/",
        component: Home
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: () => import(/* webpackChunkName: "about" */ './routes/About.tsx')
    // }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name != "Home") next({ name: "Home" })
    else next()
})