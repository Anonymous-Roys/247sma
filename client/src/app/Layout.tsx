import { useEffect, useState } from "react";
import Header from "@/shared/components/custom/_header";
import { AppSidebar } from "@/shared/components/custom/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Outlet } from "react-router-dom";


export type User = {
  name: string;
  email: string;
  avatar: string;
  initials: string;
};
export default function FarmersLayout() {
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
        const res = await fetch("http://localhost:10000/api/me", {
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
      <main className="relative w-full bg-[#DCDCDC]">
        <SidebarTrigger className="fixed z-20 bg-gray-300 top-[50%] ml-[-20px] border-2" />
        <Header user={user} />

        <Outlet />
      </main>
    </SidebarProvider>
  );
}
