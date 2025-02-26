import React from 'react'
import {createBrowserRouter, RouterProvider} from  'react-router-dom'
import MainLayout from '../layouts/main-layout'
import SpeakersPage from '../modules/speakers/page/speakers-page'
const router = createBrowserRouter([
    {
        path:'',
        element: <MainLayout/>,
        children: [
            {path:'speakers',
                element:<SpeakersPage/>
            }
        ]
    }
])

export const MainRoutes = ()=>{
    return <RouterProvider router={router}/>
}