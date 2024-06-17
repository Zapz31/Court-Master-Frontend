import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'LoginScreen',
        component: () => import('../views/LoginScreen.vue') ,
    },

    {
        path: '/register',
        name: 'RegisterScreen',
        component: () => import('../views/RegisterScreen.vue') ,
    },

    {
        path: '/forgot',
        name: 'ForgotPasswordScreen',
        component: () => import('../views/ForgotPasswordScreen.vue') ,
    },

    {
        path: '/',
        name: 'HomePageScreen',
        component: () => import('../views/HomePageScreen.vue') ,
    },

    {
        path: '/schedule',
        name: 'ScheduleScreen',
        component: () => import('../views/ScheduleScreen.vue') ,
    },
    {
        path: '/detail',
        name: 'ClubDetailScreen',
        component: () => import('../views/ClubDetailScreen.vue') ,
    },
    {
        path: '/history',
        name: 'BookingHistoryScreen',
        component: () => import('../views/BookingHistoryScreen.vue') ,
    },
]

const router = createRouter({
    history : createWebHistory(),
    routes, 
})

export default router