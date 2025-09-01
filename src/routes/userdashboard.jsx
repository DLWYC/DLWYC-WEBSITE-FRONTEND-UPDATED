
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import  AppSidebar  from  "@/components/AppSideBar/AppSidebar";
import { cn } from "@/lib/utils";
import UserDashboardTopNav from '@/components/AppTopNav/AppTopNav';



export const Route = createFileRoute('/userdashboard')({
  component: UserDashboard,
})

function UserDashboard() {
  return (
     <div className="">
     <SidebarProvider className="relative">
          <AppSidebar/>
       <main
          className={cn(
            "relative bg-[#f4f7fa] w-full px-2"
          )}
        >
        <UserDashboardTopNav />
          <Outlet />
        </main>
        </SidebarProvider>
     </div>
  )
}
