import React from 'react'
import {createBrowserRouter, RouterProvider} from  'react-router-dom'
import MainLayout from '../layouts/main-layout'
import SpeakersPage from '../modules/speakers/page/speakers-page'
import PrivateRoutes from './private-route'
import RegisterPage from '@/modules/auth/register/pages/register-page'
import LoginPage from '@/modules/auth/login/pages/login-page'
import ConfirmEmailPage from '@/modules/auth/confirm-email/pages/confirm-email-page'
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
        path:'/confirm-email',
        element:<ConfirmEmailPage/>
    }
])

export const MainRoutes = ()=>{
    return <RouterProvider router={router}/>
}