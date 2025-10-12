import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute,  } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../lib/AuthContext'
import MultiSteps from '../../../components/MultiStep/MultiStep'



export const Route = createFileRoute('/userdashboard/event/$id')({
  component: SingleEvent,
})

function SingleEvent() {
     const {userData, userRegisteredEvents} = useAuth()
     const queryClient = useQueryClient()
     const {id}   = Route.useParams()
     const [cachedEvent, setCachedEvent] = useState('')

useEffect(() => {
const events = queryClient.getQueryData(['allEvent', userData?.uniqueId, userRegisteredEvents])
const event = events?.find((event) => event._id === id);
setCachedEvent(event)
  }, [queryClient]);

  console.log('sdsdfaaaaaaa: ', cachedEvent)

  return(
     <div className=" bg-white mt-3 py-[30px] flex items-center justify-center font-rubik">
          <div className="basis-[80%] flex flex-col gap-3 ">
               <p className='text-[18px]  '>Register For: <span className='text-primary-main font-bold'>{cachedEvent.eventTitle}</span> </p>

               <div className="flex items-center ">
                    <MultiSteps userData={userData} eventDetails={cachedEvent} />
               </div>
          </div>
     </div>
  )
}
