import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
const AuthContext = createContext();

export function AuthProvider({children}){
     const queryClient = useQueryClient()
     const backendUrl = import.meta.env.VITE_BACKEND_URL

     // #:::::::::::::::  GET USER LOGIN FUNCTION :::::::::::::::::#
     const login = useMutation({
    mutationFn: async({values})=>{
       const res = await axios.post(`https://dlwyc-api.onrender.com/api/userLogin`, values);
      //  const res = await axios.post(`${backendUrl}/api/userLogin`, values);
       localStorage.setItem("token", res.data.token);
      return res
    }, onSuccess: (res) =>{
      queryClient.invalidateQueries({ queryKey: ['user'] });
      return res
    },
    onError: async (err) =>{
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
  

  console.log("User From Auth Context: ", user)

  
  
  // #:::::::::::::::  GET USER PAYMENT RECORDS FUNCTION :::::::::::::::::#
  const {data: userPaymentRecord, isLoading: fetchingUserPaymentRecordLoadingStatus, isError: errorLoadingUserPaymentRecord, refetch} = useQuery({
    queryKey: ['UserPaymentRecord', user?.uniqueId],
    queryFn: async () =>{
      const UserPaymentRecord = await axios.get(`${backendUrl}/api/payment/payment-history/${user?.uniqueId}`)
      
        return UserPaymentRecord.data.data
    },
    onError: (error)=>{
      // console.log("Error: ", error)
    },
    enabled: !!user?.uniqueId,
    refetchOnWindowFocus: false,
    staleTime: 1000
  })


  // #:::::::::::::::  GET USER PAYMENT RECORDS FUNCTION :::::::::::::::::#
  
  
  
  // #:::::::::::::::  GET USER REGISETRED FUNCTION :::::::::::::::::#
  const {data: userRegisteredEvents, isLoading: fetchingUserRegisteredEventsLoadingStatus, isError: errorLoadingUserRegisteredEvents} = useQuery({
    queryKey: ['userRegisteredEvents', user?.uniqueId],
    queryFn: async () =>{
      const userRegisteredEvents = await axios.get(`${backendUrl}/api/userRegisteredEvents/${user?.fullName}/${user?.uniqueId}`)
      
        return userRegisteredEvents.data.data
    },
    onError: (error)=>{
      console.log("Error: ", error)
    },
    enabled: !!user?.uniqueId,
    refetchOnWindowFocus: false,
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
    const response = await axios.get(`${backendUrl}/api/admin/events`);
    const allEventsData = response.data.data;

       const registrationMap = new Map();
    
    if (userRegisteredEvents?.length) {
      userRegisteredEvents.forEach(regEvent => {
        registrationMap.set(regEvent.eventId, {
          isRegistered: regEvent.paymentStatus == 'success' ? true : false,
          paymentStatus: regEvent.paymentStatus,
          registrationDate: regEvent.registrationDate, // if available
          // Add other registration details as needed
        });
      });
    }


    const updatedEvents = allEventsData.map((event) => {
      const registrationInfo = registrationMap.get(event._id);
      return {
        ...event,
        isRegistered: registrationInfo?.isRegistered,
        paymentStatus: registrationInfo?.paymentStatus ,
      };
    });

    // console.log({
    //   "Total Events": allEventsData.length,
    //   "Registered Events": userRegisteredEvents?.length || 0,
    //   "Updated Events Sample": updatedEvents // Log first 2 for debugging
    // });
    console.log("updated", updatedEvents)
    return updatedEvents;

  },
  enabled: !!user?.uniqueId && !fetchingUserRegisteredEventsLoadingStatus, // Depend on first query
  onSuccess: (updatedEvents) => {
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
}, [user, userRegisteredEvents]);
  // #:::::::::::::::  GET ALL EVENT FUNCTION :::::::::::::::::#
  



  // #:::::::::::::::  USER LOGOUT FUNCTION :::::::::::::::::#
  const logout = () => {
    localStorage.setItem('token', '')
    queryClient.clear();
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


              userPaymentRecord, 
              refetch,
              fetchingUserPaymentRecordLoadingStatus,

               allEvent,
               fetchingAllEvents,
               errorLoadingEvents
          }}>

          {children}
     </AuthContext.Provider>
     )
}
export const useAuth = () => useContext(AuthContext)