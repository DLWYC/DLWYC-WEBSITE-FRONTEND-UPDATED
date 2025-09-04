import { createFileRoute} from '@tanstack/react-router'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {Events, DashboardCards} from "@/data/Dashboard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar as CalenderIcon } from 'lucide-react'
import UserProfileImage from '@/components/UserProfileImage/UserProfileImage'
import { Calendar } from "@/components/ui/calendar"
import { useState } from 'react'
import { formatDate } from 'date-fns/format'
import NotFound from '@/assets/Dashboard/notfound.png'

export const Route = createFileRoute('/userdashboard/')({
  component: UserDashboard,
})

function UserDashboard() {
  const [date, setDate] = useState(new Date())
  const [filteredEvents, setFilteredEvents] = useState(Events);

const handleFilter = () => {
  if (!date) {
    // If no date is selected, show all events
    setFilteredEvents(Events);
    return;
  }

  const selectedDateString = formatDate(date, "yyyy-MM-dd");

  const newFilteredEvents = Events.filter(event => {
    // Format the event date to a string for comparison
    const eventDateString = formatDate(event.date, "yyyy-MM-dd");
    console.log(eventDateString, selectedDateString)
    return eventDateString == selectedDateString;
  });

  setFilteredEvents(newFilteredEvents);
};


  return (
     <div className="">
      {/* Home Dashbaord inner Content */}
             <div className="pt-4 space-y-4">
               <div className="rounded-[5px] border text-primary-main  px-5 py-3 flex flex-wrap lg:flex-row flex-col lg:items-center">
                <UserProfileImage imageWidth={60} />
                <div className="flex justify-center flex-col lg:px-5 font-rubik">
                <h3 className="text-[30px] font-[500] ">Welcome back, Timilehin</h3>
                <div className='flex lg:flex-row flex-col lg:gap-9'>
                <p className='text-[#64748B] text-[14px]'>Email: timmyaof02@gmail.com</p>
                <p className='text-[#64748B] text-[14px]'>Unique ID: DLWYC/13/8627</p>
                </div>
                </div>
               </div>
     
     
             {/* Top Sector */}
                <div className="flex  space-y-2 ">
                <div className="p-1 basis-[100%] grid lg:grid-cols-3 gap-4  font-inter">
                {DashboardCards.map((_, index) => (
                           <Card key={index}>
                             <CardContent className="flex border justify-center space-y-2 flex-col rounded-[5px] px-[20px] py-[15px] bg-white border-[#e8e8e8]">
                             
                               <h3 className="text-rubik text-[#64748B] text-[14px] flex items-center gap-2"> {_.icon && <_.icon className={`w-[15px]`} color={`${_.IconColor}`} />}{_.text}</h3>
                               <p className="text-[24px] font-[600] tracking-[1.3px] text-[#1E293B]">{_.number}</p>
                             </CardContent>
                           </Card>
                ))}
                         </div>
                </div>
             {/* Top Sector */}



             {/* Upcoming Events */}
             <div className=" flex lg:flex-row flex-col p-1 gap-5 font-inter">
                <div className="basis-[70%] border bg-white px-6 py-6 space-y-3 ">
                  {/*  */}
                <div className=" flex justify-between items-center">
                  <h3 className="text-[#64748B] text-[15px] font-[400]">Upcoming Events</h3>
                  <p className='text-[#64748B] text-[14px] flex items-center gap-2'>{filteredEvents.length} Events <CalenderIcon className='w-[13px]' /></p>
                </div>
                  {/*  */}

                  {/*  */}
                  <ScrollArea className={`${filteredEvents.length === 0 ? 'flex items-center justify-center' : ''} h-[420px] w-full`}>
                    <div className='space-y-4'>
                  {filteredEvents.length === 0 ? ( 
                    <div className="border flex flex-col justify-center items-center h-[410px] space-y-5">
                    <img src={NotFound} alt="" className='w-[90px]' />
                    <p className='text-red-500'>Sorry No Event For The Day</p>
                    </div>
                  ):filteredEvents.map((_, index) => (
                             <div key={index} className="flex border justify-center space-y-2 flex-col rounded-[5px] px-[20px] py-[15px] bg-white border-[#e8e8e8]">
                              
                              <div className="flex justify-between items-center ">
                               <h3 className="text-rubik text-[#1E293B] text-[17px] font-[500] flex items-center gap-2">{_.text}</h3>
                               <p className="text-rubik text-[#1E293B] text-[13px] flex items-center "><span className={`${_.registrationStatus == "Registered" ? 'text-[green]' : _.registrationStatus == "Not Registered" ? 'text-[red]': 'text-[orange]' }`}>{_.registrationStatus}</span></p>
                              </div>

                               <div className="flex flex-wrap items-center lg:gap-5 gap-2">
                                <p className="text-[#64748B] text-[14px] flex items-center gap-1">  {_.eventDateIcon && <_.eventDateIcon className={`w-[14px]`} />}{_.eventDate}</p>
                                <p className="text-[#64748B] text-[14px] flex items-center gap-1">  {_.timeIcon && <_.timeIcon className={`w-[14px]`} />}{_.time}</p>
                                <p className="text-[#64748B] text-[14px] flex items-center gap-1">  {_.locationIcon && <_.locationIcon className={`w-[14px]`} />}{_.location}</p>
                               </div>
                             
                             
                             <div className="flex justify-end">
                              <a className='text-[14px] transition-all duration-150 border border-primary-main hover:bg-primary-main hover:text-white px-[30px] py-[7px] cursor-pointer '>Register</a>
                             </div>
                             </div>

                  ))}
                           </div>
                </ScrollArea> 
                  {/*  */}
                </div>



                <div className="basis-[30%] h-fit flex flex-col space-y-3">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg border w-full"
                  captionLayout="dropdown"
                />

                  <div className="border space-y-3 grid">
                    <p>Select Date To Find Event For That Day</p>
                  <button className='text-[14px] transition-all duration-150 border border-primary-main hover:bg-primary-main hover:text-white px-[30px] py-[7px] cursor-pointer' onClick={handleFilter}>Find Events</button>
                  </div>
                </div>
             </div>
             {/* Upcoming Events */}
     </div>
     </div>
  )
}
