
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
  SidebarFooter
} from "@/components/ui/sidebar";
// import { NavUser } from "./NavUser";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import MenuItems from "@/data/Dashboard";
// import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

// This is sample data.

export function AppSidebar() {
  const [sideBarLinks, setSideBarLinks] = useState(MenuItems);

//   const { student, logOut } = useAuth();
  const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logOut();
//       navigate({ to: "/" });
//     } catch (error) {
//       console.log(`This is the error Logging-Out ${error}`);
//       toast.error("Error Loggin Out");
//     }
//   };


  // Get the SideBar NAVLINKS
  useEffect(()=>{
    if(pathname.startsWith('/userdashboard')){
      setSideBarLinks(MenuItems) 
    }
    else{
      setSideBarLinks(AdminSideBar)
    }
  }, [pathname])

  return (
    <Sidebar className="lg:bg-primary font-rubik z-[600]">
      <SidebarHeader >
          <img src="/main_logo.svg" alt="" />
      </SidebarHeader>
      <SidebarContent className='lg:bg-transparent lg:text-white text-black mt-4'>
        {sideBarLinks.map((item, idx) => (
          <Link to={item.url} key={idx}>
            <SidebarGroup
              className={`${
                (pathname == item.url)
                  ? "bg-primary-main font-bolder"
                  : "font-[200]"
              } flex `}
            >
              <SidebarGroupLabel className={`${(pathname == item.url) ? 'text-white': ''} lg:w-[190px] flex items-center gap-6 text-[15px] `}>
                {item.icon && <item.icon />}
                {item.name}
              </SidebarGroupLabel>
            </SidebarGroup>
          </Link>
        ))}

        <SidebarGroupLabel
          className="mt-[50px] cursor-pointer px-4 py-[20px] text-[15px] bg-red text-white"
          onClick={() => handleLogout()}
        >
          Log-Out
        </SidebarGroupLabel>
      </SidebarContent>
      <SidebarRail />

      {/* Footer */}
      <SidebarFooter>
        <p className="text-[13px]">Developed By DLWYC</p>
      </SidebarFooter>
    </Sidebar>
  );
}
