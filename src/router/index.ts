import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Knights from "../views/Knights.vue";
import KnightInfo from "../views/KnightInfo.vue";
import KnightForm from "../views/KnightForm.vue";


const routes = [
    {
        path: "/",
        name: 'Home',
        component: Home
    },
    {
        path: "/knights",
        name: 'Knights',
        component: Knights
    },
    {
        path: "/knights/:id",
        name: 'Knight',
        component: KnightInfo,
    },
    {
        path: "/knights-create",
        name: 'CreateKnight',
        component: KnightForm,
    },
    {
        path: "/knights-edit/:id",
        name: 'EditKnight',
        component: KnightForm,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;