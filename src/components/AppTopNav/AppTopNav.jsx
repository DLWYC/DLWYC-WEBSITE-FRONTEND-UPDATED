import {SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "@tanstack/react-router";
import {userDashboardTopMenu} from "@/data/Dashboard"
import { Power } from "lucide-react";




const UserDashboardTopNav = () => {
     const navigate = useNavigate();
     return (
          <div className="flex items-center justify-between border-0 py-3 px-5">
          {/* Left Alignment */}
          <div className="left">
               <SidebarTrigger className="flex cursor-pointer" />
          </div>
          {/* Left Alignment */}

          {/* Right Alignment */}
               <div className="flex font-inter">
                    <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                         <Avatar>
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>CN</AvatarFallback>
                         </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="bg-white rounded-[5px] top-[10px] right-[20px] relative font-inter">
                    <DropdownMenuLabel>Profile</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                         <div className="flex items-center space-x-4">
                              <Avatar>
                                   <AvatarImage src="https://github.com/shadcn.png" />
                                   <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div>
                                   <h2 className="text-[14px] font-[400] text-[#30373eff]">Chinedu Okeke</h2>
                                   <p className="text-[13px] font-[400] text-primary-main">timmyaof02@gmail.com</p>
                              </div>
                         </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    {userDashboardTopMenu.map((item, idx) => (
                         <DropdownMenuItem key={idx}> 
                              <a onClick={()=>navigate({to: item.url})} className="cursor-pointer w-full py-2 gap-3 flex items-center text-[13px]">
                              {item.icon && <item.icon />}
                              {item.name}</a>
                         </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500 flex items-center gap-3 cursor-pointer">
        <Power className="text-red-500"/>
          Log out
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
               </div>
          {/* Right Alignment */}
          </div>
     )
}
export default UserDashboardTopNav;