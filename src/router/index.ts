import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue'

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
                component: () => import('@/views/HomePage.vue')
            },
            {
                path: 'cards',
                component: () => import('@/views/CardsPage.vue')
            },
            {
                path: 'settings',
                component: () => import('@/views/SettingsPage.vue')
            }
        ]
    },
    {
        path: '/auth/login',
        component: () => import('@/views/LoginPage.vue'),
    },
    {
        path: '/auth/sign-in',
        component: () => import('@/views/RegisterPage.vue'),
    },
    {
        path: '/auth/logout',
        component: () => import('@/views/LogoutPage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
