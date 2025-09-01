import {
  ListTodo,
  User,
  Home,
  UserRound, 
  Settings as SettingsIcon,
} from "lucide-react";

const MenuItems = [
  { name: "Home", icon: Home, url: '/userdashboard' },
  { name: "Event History", icon: ListTodo, url: '/userdashboard/eventhistory' },
  { name: "Profile", icon: User, url: '/userdashboard/profile' },
];

const userDashboardTopMenu = [
  { name: "My Account", icon: UserRound, url: '/userdashboard/profile' },
  { name: "Settings", icon: SettingsIcon, url: '/userdashboard/profile' },
]


const Events =[
  { name: "2024 Camp", icon: ListTodo, url: '/userdashboard/eventhistory', description:"lotrmsdkjfkjsdbfkjdsbf" },
  { name: "2024 Camp", icon: ListTodo, url: '/userdashboard/eventhistory', description:"lotrmsdkjfkjsdbfkjdsbf" },
]

export { userDashboardTopMenu, Events }
export default MenuItems 
