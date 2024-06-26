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
        path: '/schedule/:clubId',
        name: 'ScheduleScreen',
        props: true,
        component: () => import('../views/ScheduleScreen.vue') ,
    },
    {
        path: '/clubs/:clubId',
        name: 'ClubDetailScreen',
        component: () => import('../views/ClubDetailScreen.vue') ,
    },


    {
        path: '/customer/booking',
        name: 'BookingHistoryScreen',
        component: () => import('../views/BookingHistoryScreen.vue') ,
    },

    {
        path: '/payment-handle',
        name: 'PaymentHandle',
        component: () => import('../views/PaymentHandle.vue') ,  
    },

    {
        path: '/payment-confirm',
        name: 'ConfirmPaymentScreen',
        component: () => import('../views/ConfirmPaymentScreen.vue') ,  
    },
    {
        path: '/booking-slot/:scheduleId',
        name: 'BookingSlotScreen',
        component: () => import('../views/BookingSlotScreen.vue') ,  
    },
]

const router = createRouter({
    history : createWebHistory(),
    routes, 
})

export default router