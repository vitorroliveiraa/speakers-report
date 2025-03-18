import React from 'react'
import {createBrowserRouter, RouterProvider} from  'react-router-dom'
import MainLayout from '../layouts/main-layout'
import SpeakersPage from '../modules/speakers/page/speakers-page'
import LoginPage from '@/modules/login/pages/login-page'
const router = createBrowserRouter([
    {
        path:'',
        element: <MainLayout/>,
        children: [
            {path:'speakers',
                element:<SpeakersPage/>
            }
        ],
    },
    {
        path:'/login',
        element: <LoginPage/>
    }
])

export const MainRoutes = ()=>{
    return <RouterProvider router={router}/>
}