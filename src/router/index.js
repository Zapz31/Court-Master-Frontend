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
        path: '/register-staff',
        name: 'RegisterStaffScreen',
        component: () => import('../views/RegisterStaffScreen.vue') ,
    },

    {
        path: '/staff/refund',
        name: 'RefundScreen',
        component: () => import('../views/RefundScreen.vue') ,
    },

    {
        path: '/staff/checkin',
        name: 'CheckinScreen',
        component: () => import('../views/CheckinScreen.vue') ,
    },

    {
        path: '/staff/court',
        name: 'CourtMngStaffScreen',
        component: () => import('../views/CourtMngStaffScreen.vue.vue') ,
    },

    {
        path: '/manager/court',
        name: 'CourtMngManagerScreen',
        component: () => import('../views/CourtMngManagerScreen.vue') ,
    },


        {
        path: '/staff/checkedin',
        name: 'CheckedinScreen',
        component: () => import('../views/CheckedinScreen.vue') ,
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
        path: '/staff',
        name: 'StaffHomePageScreen',
        component: () => import('../views/StaffHomePageScreen.vue') ,
    },

    {
        path: '/view-schedule/:clubId',
        name: 'ViewScheduleScreen',
        component: () => import('../views/ViewScheduleScreen.vue') ,
        props: true,
    },

    {
        path: '/schedule/:clubId',
        name: 'ScheduleScreen',
        props: true,
        component: () => import('../views/ScheduleScreen.vue') ,
    },

    {
        path: '/clubs',
        name: 'ClubNotFoundScreen',
        component: () => import('../views/ClubNotFoundScreen.vue') ,
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
        path: '/customer/profile',
        name: 'CustomerProfile',
        component: () => import('../views/CustomerProfile.vue') ,
    },


        {
            path: '/confirm-payment/:clubId',
            name: 'ConfirmPaymentScreen',
            component: () => import('../views/ConfirmPaymentScreen.vue') ,
          },

    {
        path: '/payment-confirm/:clubId',
        name: 'ConfirmPaymentScreen',
        component: () => import('../views/ConfirmPaymentScreen.vue') ,  
    },
    {
        path: '/booking/history/slots?scheduleId=:scheduleId',
        name: 'BookingSlotScreen',
        component: () => import('../views/BookingSlotScreen.vue') ,  
    },
    {
        path: '/clubregister',
        name: 'ClubRegisterScreen',
        component: () => import('../views/ClubRegisterScreen.vue') , 
    },
    {
        path: '/payment-handle',
        name: 'PaymentHandle.vue',
        component: () => import('../views/PaymentHandle.vue')
    },
    {
        path: '/payment-success',
        name: 'PaymentSuccess',
        component: () => import('../views/PaymentSuccess.vue') ,
    },

    {
        path: '/manager/dashboard',
        name: 'DashboardScreen',
        component: () => import('../views/DashboardScreen.vue') ,
    },

    {
        path: '/unable-access',
        name: 'UnableAccessScreen',
        component: () => import('../views/ErrorScreen/UnableAccessScreen.vue') ,
    },
    {
        path: '/page-not-found',
        name: 'PageNotFound',
        component: () => import('../views/ErrorScreen/PageNotFoundScreen.vue') ,
    },

    {
        path: '/manager-staffs',
        name: 'MngStaffScreen',
        component: () => import('../views/MngStaffScreen.vue') ,
    },

]

const router = createRouter({
    history : createWebHistory(),
    routes, 
})

export default router