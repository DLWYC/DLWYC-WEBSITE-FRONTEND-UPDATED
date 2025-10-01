import {
  ListTodo,
  User,
  UserRound,
  Settings as SettingsIcon,
  Home,
  History,
  CalendarClockIcon,
  LucideBell,
  MapPin as Pin,
  TimerIcon,
  FileText,
  UserCircle,
  Lock,
  Shield,
  Bell,
} from "lucide-react";

const MenuItems = [
  { name: "Home", icon: Home, url: '/userdashboard' },
  // { name: "Event History", icon: ListTodo, url: '/userdashboard/eventhistory' },
  { name: "Payment History", icon: User, url: '/userdashboard/payments' },
  // { name: "Profile", icon: User, url: '/userdashboard/profile' },
];

const userDashboardTopMenu = [
  { name: "My Account", icon: UserRound, url: '/userdashboard/profile' },
  { name: "Settings", icon: SettingsIcon, url: '/userdashboard/profile' },
]


const DashboardCards = [
  { text: "Upcoming", icon: CalendarClockIcon, url: '/userdashboard/eventhistory', number: 3, IconColor: "#2563EB" },
  { text: "Registered", icon: History, url: '/userdashboard/eventhistory', number: 5, IconColor: "#10B981" },
  { text: "Notification", icon: LucideBell, url: '/userdashboard/eventhistory', number: 10, IconColor: "#F59E0B" },
]

const Events = [
  { text: "2025 Diocesan Youth Harvest ", eventDateIcon: CalendarClockIcon, eventDate: "15/12/25", locationIcon: Pin, location: "City Of God, Iyana Ipaja", timeIcon: TimerIcon, time: "10:00am - 4:00pm", registrationStatus: "Registered", date: new Date(2025, 8, 2) },
  { text: "2025 Diocesan Youth Camp", eventDateIcon: CalendarClockIcon, eventDate: "15/12/25", locationIcon: Pin, location: "Camp Site, Epe", timeIcon: TimerIcon, time: "10:00am - 4:00pm", registrationStatus: "Not Registered", date: new Date(2025, 8, 5) },
  { text: "Notification", eventDateIcon: CalendarClockIcon, eventDate: "15/12/25", locationIcon: Pin, location: "Camp Site, Epe", timeIcon: TimerIcon, time: "10:00am - 4:00pm", registrationStatus: "Pending", date: new Date(2025, 8, 7) },
]


const documentTypes = [
  'Driver License',
  'Passport',
  'National ID',
  'Birth Certificate',
  'Utility Bill',
  'Bank Statement',
  'Other'
];

const sidebarItems = [
  { id: 'profile', label: 'Profile Overview', icon: UserCircle },
  { id: 'password', label: 'Change Password', icon: Lock },
  // { id: 'documents', label: 'Documents', icon: FileText },
  // { id: 'notifications', label: 'Email Settings', icon: Bell },
  // { id: 'security', label: 'Security Settings', icon: Shield },
];

export { userDashboardTopMenu, Events, DashboardCards, documentTypes, sidebarItems }
export default MenuItems 
