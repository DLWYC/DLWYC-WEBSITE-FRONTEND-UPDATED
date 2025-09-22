import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
const AuthContext = createContext();

export function AuthProvider({children}){
     const backendUrl = import.meta.env.VITE_BACKEND_URL
     const queryClient = useQueryClient()

     // #:::::::::::::::  GET USER LOGIN FUNCTION :::::::::::::::::#
     const login = useMutation({
    mutationFn: async({values})=>{
       const res = await axios.post(`${backendUrl}/api/userLogin`, values);
       localStorage.setItem("token", res.data.token);
       console.log(res)
      return res
    }, onSuccess: (res) =>{
      queryClient.invalidateQueries({ queryKey: ['user'] });
      console.log("Successsss")
      return res
    },
    onError: async (err) =>{
        console.log(err, err.response?.data?.errors)
        const errType = err.response?.data?.errors
        throw errType
        
    }
  })
     // #:::::::::::::::  GET USER LOGIN FUNCTION :::::::::::::::::#





     // #:::::::::::::::  GET USER DATA FUNCTION :::::::::::::::::#
     // Get User Data From the DB For the Dashboard
  const {data: user, isLoading: isLoadingUserData, error: errorLoadingUserData, } = useQuery({
     queryKey: ['user'],
     queryFn: async () =>{
      try{

        const userToken = localStorage.getItem('token');
        const userDashboardData = await axios.get(`${backendUrl}/api/userDashboard`, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        if(!userDashboardData){
          throw new Error("Dailed To Fetch User Data")
        }
        return userDashboardData.data.data
      }
      catch(err){
        const errMessage = (err?.response?.data?.message)
        if(errMessage == "Invalid token"){
          throw new Error("INVALID_TOKEN")
        }
      }

},
retry: false,
  })
  // #:::::::::::::::  GET USER DATA FUNCTION :::::::::::::::::#
  


  
  
  // #:::::::::::::::  GET USER REGISETRED FUNCTION :::::::::::::::::#
  const {data: userRegisteredEvents, isLoading: fetchingUserRegisteredEventsLoadingStatus, isError: errorLoadingUserRegisteredEvents} = useQuery({
    queryKey: ['userRegisteredEvents', user?.uniqueId],
    queryFn: async () =>{
      console.log('Fetching registered events for user:', user?.uniqueId, 'fullName:', user?.fullName); 
      const userRegisteredEvents = await axios.get(`${backendUrl}/api/userRegisteredEvents/${user?.fullName}/${user?.uniqueId}`)
      console.log("userRegisteredEventsdsjfbskdjbfb", userRegisteredEvents)
      
        return userRegisteredEvents.data.data
    },
    onError: (error)=>{
      console.log("Error: ", error)
    },
    enabled: !!user,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000
  })
  // #:::::::::::::::  GET USER REGISETRED FUNCTION :::::::::::::::::#
  
  


  // #:::::::::::::::  GET ALL EVENT FUNCTION :::::::::::::::::#
const {
  data: allEvent, // Renamed for clarity (was 'allEvent')
  isLoading: fetchingAllEvents,
  isError: errorLoadingEvents,
} = useQuery({
  queryKey: ['allEvent', user?.uniqueId], // Include user ID since personalized
  queryFn: async () => {
    // console.log('Fetching all events for user:', user?.uniqueId, 'using registered count:', userRegisteredEvents?.length || 0);
    const response = await axios.get(`${backendUrl}/api/admin/events`);
    const allEventsData = response.data.data;

    // Safe now: userRegisteredEvents is loaded, or query is disabled
    const registeredEventIds = new Set(userRegisteredEvents?.map((regEvent) => regEvent.eventId) || []);

    const updatedEvents = allEventsData.map((event) => ({
      ...event,
      isRegistered: registeredEventIds.has(event._id),
    }));
    
    console.log({ "All Events": allEventsData})
    return updatedEvents;
  },
  enabled: !!user && !fetchingUserRegisteredEventsLoadingStatus, // Depend on first query
  onSuccess: (updatedEvents) => {
    // console.log('Updated events:', updatedEvents);
    return updatedEvents // Moved here; proper array logging
  },
  onError: (error) => {
    console.error('Failed to load all events:', error);
    // toast.error('Failed to load events');
  },
  refetchOnMount: true,
  refetchOnWindowFocus: true,
});



  useEffect(() => {
  if (user?.uniqueId) {
    // Invalidate and refetch for this user
    console.log("This is User From this point: ",user)
    queryClient.invalidateQueries({ queryKey: ['userRegisteredEvents', user?.uniqueId] });
    queryClient.invalidateQueries({ queryKey: ['allEvents', user?.uniqueId] });
  }
}, [user]);

  // const {data: allEvent, isLoading: fetchingAllEvents, isError: errorLoadingEvents} = useQuery({
  //   queryKey: ['allEvent', user?.uniqueId],
  //   queryFn: async () =>{
  //     const allEvents = await axios.get(`${backendUrl}/api/admin/events`)
  //     console.log("allEvent Error", errorLoadingUserRegisteredEvents, fetchingUserRegisteredEventsLoadingStatus)
      
  //     const allEve =  allEvents.data.data
      
      
      
  //     const updatedEvents = allEve.map(event => {
  //         const registeredEventIds = new Set(
  //          userRegisteredEvents?.map(event => event.eventId)
  //        );
  //         if(fetchingUserRegisteredEventsLoadingStatus){
  //           return {
  //             ...event,
  //             isRegistered: false,
  //           };
  //       }
  //         const isRegistered = registeredEventIds.has(event._id);
  //         return {
  //           ...event,
  //           isRegistered: isRegistered,
  //         };
  //       })
        
  //       console.log(`This is the updated Events: ${updatedEvents}`)
  //       return updatedEvents
  //     },
  //       enabled: !!user,
  //       refetchOnMount: true,
  //       refetchOnWindowFocus: true
  
  // })
  // })
  // #:::::::::::::::  GET ALL EVENT FUNCTION :::::::::::::::::#
  



  // #:::::::::::::::  USER LOGOUT FUNCTION :::::::::::::::::#
  const logout = () => {
    localStorage.setItem('token', '')
    // console.log("LOGOUT::::", queryClient.getQueriesData())
    queryClient.clear();
    // console.log("Logout Successful") 
  }
  // #:::::::::::::::  USER LOGOUT FUNCTION :::::::::::::::::#










     return(
     <AuthContext.Provider  
          value={{
              login: login.mutateAsync,
              loginIsLoading: login.isPending,
               logout,

               userData: user,
               isLoadingUserData,
               errorLoadingUserData,

              userRegisteredEvents,
              fetchingUserRegisteredEventsLoadingStatus,
              errorLoadingUserRegisteredEvents,


               allEvent,
               fetchingAllEvents,
               errorLoadingEvents
          }}>

          {children}
     </AuthContext.Provider>
     )
}
export const useAuth = () => useContext(AuthContext)