
import { MainRoutes } from "./routes/routes"
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
export const App =()=>{
    const queryClient = new QueryClient()
    return(
        <QueryClientProvider client={queryClient}><MainRoutes/>
        </QueryClientProvider>)
}