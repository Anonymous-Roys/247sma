import * as React from "react"
import {
  BotIcon,
  BringToFront,
  Factory,
  LayoutGrid,
  Network,
  ShoppingBasket,
  TrendingUp,
  UserRound,
  Warehouse,
} from "lucide-react"

import { NavMain } from "@/shared/components/ui/nav-main"
import { NavUser } from "@/shared/components/ui/nav-user"
import { TeamSwitcher } from "@/shared/components/ui/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/components/ui/sidebar"

import SmagritradeLogo from '@/shared/assets/farmers_assets/smalogo.png'

const Logo: React.FC = () => <img src={SmagritradeLogo} alt="Smagritrade Logo" />

const teams = [
  {
    name: "Smagritrade",
    logo: Logo,
    plan: "Farmers Dashboard",
  },
  {
    name: "Smag AI",
    logo: BotIcon,
    plan: "Startup",
  },
  {
    name: "IoT Team",
    logo: Network,
    plan: "Enterprise",
  },
]

const navMain = [
  {
    title: "Marketplace",
    url: "/farmers",
    icon: Warehouse,
    isActive: true,
    items: [
      { title: "Overview", url: "/farmers/overview", icon: LayoutGrid },
      { title: "Profile", url: "/farmers/profile", icon: UserRound },
      { title: "Orders", url: "/farmers/orders", icon: BringToFront },
      { title: "Products", url: "/farmers/products", icon: ShoppingBasket },
      { title: "Farm Marketplace", url: "/farmers/marketplace", icon: ShoppingBasket },
      { title: "Investments", url: "/farmers/investments", icon: TrendingUp },
    ],
  },
  {
    title: "Farm For Me",
    url: "/farmers",
    icon: Factory,
    items: [
      { title: "Soil Analytics", url: "/farmers/soil-analytics" },
      { title: "Crop Analytics", url: "/farmers/crop-analytics" },
      { title: "Climate", url: "/farmers/climate" },
      { title: "Scarecrow", url: "/farmers/scarecrow" },
      { title: "A.M Analytics", url: "/farmers/am-analytics" },
    ],
  },
]

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string
    email: string
    avatar: string ,
    initials: string
  } | null
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
