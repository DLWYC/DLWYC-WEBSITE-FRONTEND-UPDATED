import { createFileRoute} from '@tanstack/react-router'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {Events} from "@/data/Dashboard"


export const Route = createFileRoute('/userdashboard/')({
  component: UserDashboard,
})

function UserDashboard() {
  return (
     <div className="">
      {/* Home Dashbaord inner Content */}
             <div className="h-screen p-3">
               <div className="">
                 <h3 className="font-poppins text-[35px] text-[#30373eff] font-[600] px-5">Home</h3>
               </div>
     
     
             {/* Upcoming Events */}
     
                <div className="flex items-center justify-center flex-col space-y-2 mt-6">
                <div className=" w-[90%]">

             <p className='text-[#99a1af] text-[14px]'>Upcoming Events</p>
                </div>

             <Carousel className='w-[92%]'>
               <CarouselContent>
                 {Events.map((_, index) => (
                       <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                         <div className="p-1">
                           <Card>
                             <CardContent className="flex justify-center space-y-4 flex-col rounded-[10px] py-[15px] px-[20px] bg-white shadow-[0px_0px_4px_2px_#e8e8e8]">
                               <h3 className="text-rubik text-primary-main text-[17px]">{_.name}</h3>
                               <p className="text-[13px] text-[#99a1af] tracking-[1.3px]">{_.description}</p>
                               <button className="border border-[#091e5442] py-2 text-primary-main hover:bg-primary-main hover:text-white rounded-[5px] transition-all duration-500 text-[15px]">Register</button>
                             </CardContent>
                           </Card>
                         </div>
                       </CarouselItem>
                     ))}
               </CarouselContent>
                 <CarouselPrevious />
                   <CarouselNext />
             </Carousel>
                </div>
             {/* </div> */}
             {/* Upcoming Events */}
     </div>
     </div>
  )
}
