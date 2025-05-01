import Header from "@/shared/components/custom/_header";
import { AppSidebar } from "@/shared/components/custom/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function FarmersLayout() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full bg-[#DCDCDC]">
        <SidebarTrigger className="fixed z-20 bg-gray-300 top-[50%] ml-[-20px] border-2 v"/>
       <Header/>
        <Outlet /> {/* Use <Outlet /> to render matched child routes */}
      </main>
    </SidebarProvider>
  );
}
