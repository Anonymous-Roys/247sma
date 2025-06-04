import { AppSidebar } from "@/shared/components/custom/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb"
import { Separator } from "@/shared/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar"
import { useEffect, useState } from "react";
import { User } from "../Layout";

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
    function getInitials(name: string): string {
      if (!name) return "U";
      const parts = name.trim().split(" ");
      return parts.map(part => part[0]?.toUpperCase()).slice(0, 2).join("");
    }
  
    useEffect(() => {
      const fetchUser = async () => {
        const token = sessionStorage.getItem("token"); // ⬅️ updated here
  
        if (!token) {
          console.warn("No token found in sessionStorage.");
          return;
        }
  
        try {
          const res = await fetch("https://two47sma.onrender.com/api/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (!res.ok) throw new Error("Failed to fetch user");
  
          const data = await res.json();
          // console.log(data)
          if (data?.user) {
           setUser({
    name: data.user.fullname,
    email: data.user.email,
    avatar: data.user.avatar || "", // fallback to empty string or a default image URL
    initials: getInitials(data.user.fullname),
  });
  
          }
  
          console.log(data.user.fullname)
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
  
      fetchUser();
    }, []);
    
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 mr-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
          <div className="grid gap-4 auto-rows-min md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
