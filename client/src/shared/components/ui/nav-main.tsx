import { useState } from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar"
import { NavLink } from "react-router-dom"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
              <SidebarMenuSub>
      {item.items?.map((subItem) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
          <SidebarMenuSubItem key={subItem.title}>
            <NavLink to={subItem.url}>
              {({ isActive }) => (
                <SidebarMenuSubButton
                  asChild
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    backgroundColor: isActive
                      ? "#F0F0F0"
                      : isHovered
                      ? "#F0F0F0aa" // Darker background on hover
                      : "transparent",
                    color: isActive ? '#000' : isHovered ? "#11111199" : "#11111199",
                    borderRadius: "4px",
                    padding: "8px",
                    cursor: "pointer", // Pointer cursor for hover effect
                  }}
                >
                  <div>
                    {subItem.icon && <subItem.icon 
                    onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                  
                    color: isActive ? '#000' : isHovered ? "#11111199" : "#11111199",
                    cursor: "pointer", // Pointer cursor for hover effect
                  }}/>}
                    <span>{subItem.title}</span>
                  </div>
                </SidebarMenuSubButton>
              )}
            </NavLink>
          </SidebarMenuSubItem>
        );
      })}
    </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
