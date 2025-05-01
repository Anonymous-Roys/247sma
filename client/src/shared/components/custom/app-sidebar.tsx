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
import FarmersLogo from '@/shared/assets/farmers_assets/farmerEnyonam.png'


const Logo: React.FC = () => <img src={SmagritradeLogo} alt="Smagritrade Logo" />;


// This is sample data.
const data = {
  user: {
    name: "Enyonam Affram-Beatson",
    email: "enyonambeatsonaffram@gmail.com",
    avatar: FarmersLogo,
  },
  teams: [
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
  ],
  navMain: [
    {
      title: "Marketplace",
      url: "/farmers",
      icon: Warehouse,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/farmers/overview",
          icon: LayoutGrid, 

        },
        {
          title: "Profile",
          url: "/farmers/profile",
          icon: UserRound,
        },
        {
          title: "Orders",
          url: "/farmers/orders",
          icon: BringToFront,
        },
        {
          title: "Products",
          url: "/farmers/products",
          icon: ShoppingBasket,
        },
        {
          title: "Farm Marketplace",
          url: "/farmers/marketplace",
          icon: ShoppingBasket,
        },
        {
          title: "Investments",
          url: "/farmers/investments",
          icon: TrendingUp,
        },
        {
          title: "",
          url: "/farmers/invesments",
        },
      ],
    },
    {
      title: "Farm For Me",
      url: "/farmers",
      icon: Factory,
      items: [
        {
          title: "Soil Analytics",
          url: "/farmers/soil-analytics",
        },
        {
          title: "Crop Analytics",
          url: "/farmers/crop-analytics",
        },
        {
          title: "Climate",
          url: "/farmers/climate",
        },
        {
          title: "Scarecrow",
          url: "/farmers/scarecrow",
        },
        {
          title: "A.M Analytics",
          url: "/farmers/am-analytics",
        },
    
      ],
    },
    
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
