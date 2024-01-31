import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import MainLayout from '@/front/vue/layouts/MainLayout.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                redirect: '/home',
            },
            {
                path: 'home',
                component: () => import('@/front/vue/views/HomePage.vue')
            },
            {
                path: 'cards',
                component: () => import('@/front/vue/views/CardsPage.vue')
            },
            {
                path: 'settings',
                component: () => import('@/front/vue/views/SettingsPage.vue')
            }
        ]
    },
    {
        path: '/auth/login',
        component: () => import('@/front/vue/views/LoginPage.vue'),
    },
    {
        path: '/auth/sign-in',
        component: () => import('@/front/vue/views/RegisterPage.vue'),
    },
    {
        path: '/auth/logout',
        component: () => import('@/front/vue/views/LogoutPage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
