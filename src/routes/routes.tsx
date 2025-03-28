import React from 'react'
import {createBrowserRouter, RouterProvider} from  'react-router-dom'
import MainLayout from '../layouts/main-layout'
import SpeakersPage from '../modules/speakers/page/speakers-page'
import PrivateRoutes from './private-route'
import RegisterPage from '@/modules/auth/register/pages/register-page'
import LoginPage from '@/modules/auth/login/pages/login-page'
import ForgotPasswordPage from '@/modules/auth/forgot-password/pages/pages/forgot-password-page'
import ResetPasswordPage from '@/modules/auth/change-password/pages/reset-password-page'
const router = createBrowserRouter([
    {
        path:'',
        element: <PrivateRoutes/>,
        children: [
            {path:'speakers',
                element:<SpeakersPage/>
            }
        ],
    },
    {
        path:'/login',
        element: <LoginPage/>
    },
    {
        path:'/register',
        element: <RegisterPage/>
    },
    {
        path:'/forgot-password',
        element:<ForgotPasswordPage/>
    },
    {
        path:'/reset-password',
        element:<ResetPasswordPage/>
    }
])

export const MainRoutes = ()=>{
    return <RouterProvider router={router}/>
}