import { Home, Settings, Users, BarChart, Menu } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Outlet } from "react-router"
import { getCurrentUserLocal } from "@/utils/handle_cookies"
import { Toaster } from "@/components/ui/toaster"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Discursantes", href: "/speakers", icon: BarChart }
]

const dados = getCurrentUserLocal()

export function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Menu className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">LDS Tools</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{dados?.name}</span>
                <span className="text-xs text-muted-foreground">{dados?.email}</span>
              </div>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="mr-4" />
          </header>
          <main className="flex-1 p-6">
          <Toaster />
            <Outlet/>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}


export default MainLayout;