import {
  Home,
  Settings,
  Users,
  BarChart,
  Menu,
  Minus,
  Upload,
} from "lucide-react";

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
} from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router";
import {
  clearLegacyCookies,
  getCurrentUserLocal,
} from "@/utils/handle_cookies";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import logotipo from "@/assets/logotipo-toolbox-lds-sidebar-white.png";
import logotipo1 from "@/assets/toolbox-icon-white-transparente.png";

const navigationItems = [
  { name: "Discursantes", href: "/speakers", icon: Minus },
];

const dados = getCurrentUserLocal();

export function MainLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleRedirectImporting = () => {
    navigate("/church-members/import");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-slate-700 p-1 h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-md bg-primary">
                {/* <Menu className="h-4 w-4 text-primary-foreground" /> */}
                <img src={logotipo1} alt="Logo" className="ml-3 mt-2 h-10" />
              </div>

              <a className="text-lg font-semibold mt-3 fira-code">
                Toolbox lds
              </a>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name} className="p-2">
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span className="text-base">{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-slate-700 p-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="max-sm:text-base font-medium">
                  {dados?.name}
                </span>
                <span className="max-sm:text-xs text-muted-foreground">
                  {dados?.email}
                </span>
              </div>
            </div>
            <Button
              className="max-sm:text-base"
              variant="link"
              onClick={handleLogout}
            >
              Sair
            </Button>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="mr-4" />
            <div className="w-full grid grid-flow-col justify-items-end ">
              <Button
                variant="secondary"
                className="max-sm:h-12 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleRedirectImporting}
              >
                <Upload className="h-6 w-6 text-white" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6">
            <Toaster />
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default MainLayout;
