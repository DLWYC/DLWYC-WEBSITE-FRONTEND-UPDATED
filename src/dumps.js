//   import { PaystackButton } from 'react-paystack';
// import Male from "/male.png"
// import Female from "/female.png"
// import { Wallet } from 'lucide-react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useState } from 'react';
// import { useNavigate } from '@tanstack/react-router'




  
//   function PayStack({userDetails, values, setValues, paymentOption }) {
//      const payment_reference = (new Date()).getTime().toString()
//      const backendURL = import.meta.env.VITE_BACKEND_URL
//      const [userPaymentValues, setUserPaymentValues] = useState({})
//      // const parts = userDetails?.uniqueId?.split('/');
//      // const reference = (parts && parts.length > 2) ? `${parts[1]}${parts[2]}` : '';
//      const amount = paymentOption == 'single' ? 2000 : 400000
//      const [paymentStatus , setPaymentStatus] = useState()
//      const navigate = useNavigate()


//      // When the Paymet Gateway has been closed
//      const handleSuccessAction = async (ref) =>{
//           console.log("Success", ref)

//           try{
//                const response = await axios.get(`https://api.paystack.co/transaction/verify/${ref.reference}`, {
//                     headers: {
//                          "Authorization": `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`
//                     }
//                })
//                const { status, reference, channel, paid_at, id } = await response.data.data
//                setUserPaymentValues({
//                     ...values,
//                     "paymentStatus": status,
//                     "reference": reference,
//                     "modeOfPayment": channel,
//                     "paymentTime": paid_at,
//                     "paymentOption": paymentOption,
//                     "paymentID": id,
//                })
               
//                console.log("THis is the respnse frpm base: ", response.data.data)
//                console.log("THis is the userPaymentValues Values", userPaymentValues)

//           // // if (status == "abandoned"){
//                     await axios.post(`${backendURL}/api/userRegisteredEvents`, userPaymentValues)
//                     .then(res=>{
//                          console.log("This is the Response From The DB", res)
//                          toast.success(`${res.response.data.message} Please Complete Payment To Register`)
//                          navigate({to: '/userdashboard'})
//                     })
//                     .catch(err=>{
//                          console.log("ERERER", err)
//                          toast.error(`Error: ${err?.response?.data?.errors?.error}`)
//                          navigate({to: '/userdashboard'})
//                     })
//           }
//           catch(err){
//                console.log("This is the errr", err)
//           }
//      }


//      // When the Paymet Gateway has been closed
//      const handleErrorAction = async () =>{
//           const response = await axios.get(`https://api.paystack.co/transaction/verify/${payment_reference}`, {
//                          headers: {
//                          "Authorization": `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`
//                     }
//                })
//                console.log("Response Frm PAYSTACK", response)
//           const { status, reference, channel, paid_at, id } = await response.data.data
//           setValues({
//                     ...values,
//                     "paymentStatus": status,
//                     "reference": reference,
//                     "modeOfPayment": channel,
//                     "paymentTime": paid_at,
//                     "paymentOption": paymentOption,
//                     "paymentID": id,
//           })
          
//           // if (status == "abandoned"){
//                     await axios.post(`${backendURL}/api/userRegisteredEvents`, values)
//                     .then(res=>{
//                          console.log("This is the Response From The DB", res)
//                          toast.warning(`${res.response.data.message} Please Complete Payment To Register`)
//                          navigate({to: '/userdashboard'})
//                     })
//                     .catch(err=>{
//                          console.log("ERERER", err?.response?.data?.errors?.error)
//                          toast.error(`Error: ${err?.response?.data?.errors?.error}`)
//                          navigate({to: '/userdashboard'})
//                     })
//           // }
//           console.log("Closed The Payment Gateway")
//      }

//      const handleError = (err)=>{
//           console.log("sdsssssssss: ",err)
//      }


//      const componentProps = {
//           publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
//           reference: payment_reference,
//           email: userDetails?.email,
//           amount: amount * 100, 
//           currency: 'NGN',
//           text: paymentStatus == "pending" ? <span class="loader"></span> : 'Proceed To Payment',
//           metadata: {
//                userId: userDetails?.uniqueId,
//                fullName: userDetails?.fullName,
//                paymentOption: paymentOption,
//           },

//           // 
//           onSuccess: (userReference)=> handleSuccessAction(userReference),
//           onClose: (userReference) => handleErrorAction(userReference),
//      }

//     return (
//       <div className="lg:flex grid items-center gap-4">
//           <div className="lg:basis-[50%] basis-[100%] grid place-content-center">

//                     <img src={userDetails?.gender == 'Male' ?  Male : Female} alt="" className='w-[300px]'/>
//           </div>
         
//          <div className="grid items-center lg:basis-[50%] basis-[100%] gap-4 ">
//          <h2 className="flex items-center text-[20px] py-3"> <Wallet className='mr-3 w-[30px]' /> Your Payment Details</h2>

//           <div className=" space-y-3 ">
//           <p className='text-[14px]'>  Name: <span className='ml-3 font-[500] text-primary-main'> {userDetails?.fullName} </span> </p>
//           <p className='text-[14px]'>  Email: <span className='ml-3 font-[500] text-primary-main'> {userDetails?.email} </span> </p>
//           <p className='text-[14px]'>  Unique ID: <span className='ml-3 font-[500] text-primary-main'> {userDetails?.uniqueId} </span> </p>
//           </div>
          
//           <div className="mb-4 space-y-3">
//           <p className='text-[14px]'>  Reference ID: <span className='ml-3 font-[500] text-reddish'> {payment_reference} </span> </p>
//           <p className='text-[14px]'>  Amount: <span className='ml-3 font-[500] text-reddish'> {amount} </span> </p>
//           </div>

//         <PaystackButton className='bg-primary-main [padding:var(--spacing-button)] rounded-sm hover:bg-text-header text-white transition ease-in-out delay-20 cursor-pointer' {...componentProps} />
//          </div>
//       </div>
//     );
//   }
  
//   export default PayStack;























// #:::::::::::::::  GET USER REGISTERED EVENTS :::::::::::::::::#
const {
  data: userRegisteredEvents,
  isLoading: fetchingUserRegisteredEvents,
  isError: errorLoadingUserRegisteredEvents
} = useQuery({
  queryKey: ['userRegisteredEvents', user?.uniqueId],
  queryFn: async () => {
    console.log('Fetching registered events for user:', user?.uniqueId);
    const response = await axios.get(
      `${backendUrl}/api/userRegisteredEvents/${user?.fullName}/${user?.uniqueId}`
    );
    return response.data.data;
  },
  enabled: !!user?.uniqueId, // More specific check
  onError: (error) => {
    console.error("Error fetching user registered events:", error);
  },
  staleTime: 5 * 60 * 1000, // 5 minutes instead of 1 second
  refetchOnWindowFocus: false, // Reduce unnecessary refetches
});

// #:::::::::::::::  GET ALL EVENTS WITH REGISTRATION STATUS :::::::::::::::::#
const {
  data: allEventsWithStatus,
  isLoading: fetchingAllEvents,
  isError: errorLoadingEvents,
} = useQuery({
  queryKey: ['allEventsWithStatus', user?.uniqueId],
  queryFn: async () => {
    console.log('Fetching all events and processing registration status');
    
    // Fetch all events
    const response = await axios.get(`${backendUrl}/api/admin/events`);
    const allEventsData = response.data.data;

    // Create a Map for O(1) lookup of registration data by eventId
    const registrationMap = new Map();
    
    if (userRegisteredEvents?.length) {
      userRegisteredEvents.forEach(regEvent => {
        registrationMap.set(regEvent.eventId, {
          isRegistered: true,
          paymentStatus: regEvent.paymentStatus,
          registrationDate: regEvent.registrationDate, // if available
          // Add other registration details as needed
        });
      });
    }

    // Process events with registration status
    const updatedEvents = allEventsData.map((event) => {
      const registrationInfo = registrationMap.get(event._id);
      
      return {
        ...event,
        // Clean boolean for registration status
        isRegistered: !!registrationInfo,
        // Specific payment status (null if not registered)
        paymentStatus: registrationInfo?.paymentStatus || null,
        // Additional registration info if needed
        registrationInfo: registrationInfo || null
      };
    });

    console.log({
      "Total Events": allEventsData.length,
      "Registered Events": userRegisteredEvents?.length || 0,
      "Updated Events Sample": updatedEvents.slice(0, 2) // Log first 2 for debugging
    });

    return updatedEvents;
  },
  // Only run when user exists and user registered events are loaded
  enabled: !!user?.uniqueId && !fetchingUserRegisteredEvents,
  onError: (error) => {
    console.error('Failed to load events:', error);
    // toast.error('Failed to load events');
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
  refetchOnWindowFocus: false,
});

// #:::::::::::::::  USER CHANGE EFFECT :::::::::::::::::#
useEffect(() => {
  if (user?.uniqueId) {
    console.log("User changed, invalidating queries for:", user.uniqueId);
    
    // Invalidate queries with correct keys
    queryClient.invalidateQueries({ 
      queryKey: ['userRegisteredEvents', user.uniqueId] 
    });
    queryClient.invalidateQueries({ 
      queryKey: ['allEventsWithStatus', user.uniqueId] 
    });
  }
}, [user?.uniqueId, queryClient]); // Add queryClient to dependencies

// #:::::::::::::::  HELPER FUNCTIONS :::::::::::::::::#

// Helper function to check if user is registered for a specific event
const isUserRegisteredForEvent = (eventId) => {
  if (!allEventsWithStatus) return false;
  
  const event = allEventsWithStatus.find(event => event._id === eventId);
  return event?.isRegistered || false;
};

// Helper function to get registration status for display
const getRegistrationDisplayInfo = (event) => {
  if (!event.isRegistered) {
    return {
      text: "Not Registered",
      className: "text-red-500",
      status: "not-registered"
    };
  }

  // Handle different payment statuses
  switch (event.paymentStatus) {
    case "success":
    case "completed":
      return {
        text: "Registered",
        className: "text-green-500",
        status: "registered-paid"
      };
    case "pending":
      return {
        text: "Registration Pending",
        className: "text-yellow-500",
        status: "registered-pending"
      };
    case "failed":
      return {
        text: "Payment Failed",
        className: "text-red-500",
        status: "registered-failed"
      };
    default:
      return {
        text: "Registered",
        className: "text-blue-500",
        status: "registered-unknown"
      };
  }
};

// #:::::::::::::::  UPDATED UI COMPONENT USAGE :::::::::::::::::#

// In your JSX component:
const EventCard = ({ event, index }) => {
  const registrationInfo = getRegistrationDisplayInfo(event);
  
  return (
    <div 
      key={index} 
      className="flex border justify-center space-y-2 flex-col rounded-[5px] px-[20px] py-[15px] bg-white border-[#e8e8e8]"
    > 
      {console.log("Event Registration Info:", {
        eventId: event._id,
        isRegistered: event.isRegistered,
        paymentStatus: event.paymentStatus,
        displayInfo: registrationInfo
      })}
      
      <div className="flex justify-between items-center">
        <h3 className="text-rubik text-[#1E293B] text-[17px] font-[500] flex items-center gap-2">
          {event.eventTitle}
        </h3>
        
        <p className="text-rubik text-[#1E293B] text-[13px] flex items-center">
          <span className={registrationInfo.className}>
            {registrationInfo.text}
          </span>
        </p>
      </div>
      
      {/* Optional: Show additional registration details */}
      {event.registrationInfo && (
        <div className="text-sm text-gray-600">
          <p>Status: {event.paymentStatus}</p>
          {event.registrationInfo.registrationDate && (
            <p>Registered: {new Date(event.registrationInfo.registrationDate).toLocaleDateString()}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Usage in your main component:
const EventsList = () => {
  // ... your query hooks here ...
  
  if (fetchingAllEvents) {
    return <div>Loading events...</div>;
  }
  
  if (errorLoadingEvents) {
    return <div>Error loading events</div>;
  }
  
  return (
    <div className="space-y-4">
      {allEventsWithStatus?.map((event, index) => (
        <EventCard key={event._id || index} event={event} index={index} />
      ))}
    </div>
  );
};

// Export the data and helper functions
export {
  allEventsWithStatus,
  fetchingAllEvents,
  errorLoadingEvents,
  userRegisteredEvents,
  fetchingUserRegisteredEvents,
  errorLoadingUserRegisteredEvents,
  isUserRegisteredForEvent,
  getRegistrationDisplayInfo
};




















// #:::::::::::::::  GET USER REGISTERED EVENTS :::::::::::::::::#
const {
  data: userRegisteredEvents,
  isLoading: fetchingUserRegisteredEvents,
  isError: errorLoadingUserRegisteredEvents
} = useQuery({
  queryKey: ['userRegisteredEvents', user?.uniqueId],
  queryFn: async () => {
    console.log('Fetching registered events for user:', user?.uniqueId);
    const response = await axios.get(
      `${backendUrl}/api/userRegisteredEvents/${user?.fullName}/${user?.uniqueId}`
    );
    return response.data.data;
  },
  enabled: !!user?.uniqueId, // More specific check
  onError: (error) => {
    console.error("Error fetching user registered events:", error);
  },
  staleTime: 5 * 60 * 1000, // 5 minutes instead of 1 second
  refetchOnWindowFocus: false, // Reduce unnecessary refetches
});

// #:::::::::::::::  GET ALL EVENTS WITH REGISTRATION STATUS :::::::::::::::::#
const {
  data: allEventsWithStatus,
  isLoading: fetchingAllEvents,
  isError: errorLoadingEvents,
} = useQuery({
  queryKey: ['allEventsWithStatus', user?.uniqueId],
  queryFn: async () => {
    console.log('Fetching all events and processing registration status');
    
    // Fetch all events
    const response = await axios.get(`${backendUrl}/api/admin/events`);
    const allEventsData = response.data.data;

    // Create a Map for O(1) lookup of registration data by eventId
    const registrationMap = new Map();
    
    if (userRegisteredEvents?.length) {
      userRegisteredEvents.forEach(regEvent => {
        registrationMap.set(regEvent.eventId, {
          isRegistered: true,
          paymentStatus: regEvent.paymentStatus,
          registrationDate: regEvent.registrationDate, // if available
          // Add other registration details as needed
        });
      });
    }

    // Process events with registration status
    const updatedEvents = allEventsData.map((event) => {
      const registrationInfo = registrationMap.get(event._id);
      
      return {
        ...event,
        // Clean boolean for registration status
        isRegistered: !!registrationInfo,
        // Specific payment status (null if not registered)
        paymentStatus: registrationInfo?.paymentStatus || null,
        // Additional registration info if needed
        registrationInfo: registrationInfo || null
      };
    });

    console.log({
      "Total Events": allEventsData.length,
      "Registered Events": userRegisteredEvents?.length || 0,
      "Updated Events Sample": updatedEvents.slice(0, 2) // Log first 2 for debugging
    });

    return updatedEvents;
  },
  // Only run when user exists and user registered events are loaded
  enabled: !!user?.uniqueId && !fetchingUserRegisteredEvents,
  onError: (error) => {
    console.error('Failed to load events:', error);
    // toast.error('Failed to load events');
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
  refetchOnWindowFocus: false,
});

// #:::::::::::::::  USER CHANGE EFFECT :::::::::::::::::#
useEffect(() => {
  if (user?.uniqueId) {
    console.log("User changed, invalidating queries for:", user.uniqueId);
    
    // Invalidate queries with correct keys
    queryClient.invalidateQueries({ 
      queryKey: ['userRegisteredEvents', user.uniqueId] 
    });
    queryClient.invalidateQueries({ 
      queryKey: ['allEventsWithStatus', user.uniqueId] 
    });
  }
}, [user?.uniqueId, queryClient]); // Add queryClient to dependencies

// #:::::::::::::::  HELPER FUNCTIONS :::::::::::::::::#

// Helper function to check if user is registered for a specific event
const isUserRegisteredForEvent = (eventId) => {
  if (!allEventsWithStatus) return false;
  
  const event = allEventsWithStatus.find(event => event._id === eventId);
  return event?.isRegistered || false;
};

// Helper function to get registration status for display
const getRegistrationDisplayInfo = (event) => {
  if (!event.isRegistered) {
    return {
      text: "Not Registered",
      className: "text-red-500",
      status: "not-registered"
    };
  }

  // Handle different payment statuses
  switch (event.paymentStatus) {
    case "success":
    case "completed":
      return {
        text: "Registered",
        className: "text-green-500",
        status: "registered-paid"
      };
    case "pending":
      return {
        text: "Registration Pending",
        className: "text-yellow-500",
        status: "registered-pending"
      };
    case "failed":
      return {
        text: "Payment Failed",
        className: "text-red-500",
        status: "registered-failed"
      };
    default:
      return {
        text: "Registered",
        className: "text-blue-500",
        status: "registered-unknown"
      };
  }
};

// Export the data and helper functions
export {
  allEventsWithStatus,
  fetchingAllEvents,
  errorLoadingEvents,
  userRegisteredEvents,
  fetchingUserRegisteredEvents,
  errorLoadingUserRegisteredEvents,
  isUserRegisteredForEvent,
  getRegistrationDisplayInfo
};













































import { useState, useEffect } from "react";
import Logo from "../../assets/main_logo.svg";
import dlw from "../../assets/registrationpage/dlw.jpeg";
import axios from "axios";
import Churches from "../../data/churches";
import Input from "../../components/Inputs/Inputs";
import {
     ageOptions,
     genderOptions,
     archdeaconryOptions,
     camperTypeOptions,
     denominationOptions,
} from "../../data/Inputs";
import { HandleData } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";

// Default values shown

export default function Registration() {
     // ## Set Loading State
     const [loadingState, setLoadingState] = useState(false);

     // ## This it to get the values of the inputs
     const [fullName, setFullName] = useState("");
     const [email, setEmail] = useState("");
     const [phoneNumber, setPhoneNumber] = useState("");
     const [gender, setGender] = useState("");
     const [age, setAge] = useState("");
     const [archdeaconry, setArchdeaconry] = useState("");
     const [parish, setParish] = useState("");
     const [inputError, setInputError] = useState({});
     const [generalError, setGeneralError] = useState({});
     const navigate = useNavigate();
     const [camperType, setCamperType] = useState("");
     const [denomination, setDenomination] = useState(null);
     const [churchList, setChurchList] = useState([]);
     const [selectedOption, setSelectedOption] = useState("");
     const [disable, setDisable] = useState();
     const [registrationStatus, setRegistrationStatus] = useState(true);
     const [paymentOption, setPaymentOption] = useState("Single");
     // const [noOfUnpaidCampers, setNoOfUnpaidCampers] = useState([]);
     const [noOfUnpaidCampersOption, setNoOfUnpaidCampersOption] = useState([]);
     const [noOfCampersToPayFor, setNoOfCampersToPayFor] = useState("");
     const [alert, setAlert] = useState("");

     const userInput = {
          fullName,
          email,
          phoneNumber,
          age,
          gender,
          archdeaconry,
          parish,
          camperType,
          denomination,
          paymentOption,
          noOfUnpaidCampersOption,
          noOfCampersToPayFor,
     };

     // ## Handle Input Changes
     //   ## Submit Form Data

     setTimeout(() => {
          setAlert(false);
     }, 6000);

     window.localStorage.setItem("paymentOption", paymentOption);

     const submitForm = async (e) => {
          setLoadingState(true);
          e.preventDefault();
          window.localStorage.setItem("email", userInput.email);
          try {
               const { data } = await axios.post(
                    "https://api.dlwyouth.org/api/registration",
                    // "http://localhost:5000/api/registration",
                    userInput
               );
               if (data.message === "Registration Successful") {
                    // window.localStorage.setItem("paymentUrl", data.paymentUrl);
                    // window.localStorage.setItem("ref", data.reference);
                    navigate("/registration/verify");
               } else {
                    setGeneralError({ message: 'Registration Failed' })
                    setRegistrationStatus(false);
                    console.log('first')
               }
          } catch (err) {
               setLoadingState(false);
               if (err.response && err.response.data.message === "Input Errors") {
                    setInputError(err.response.data.errors);
                    console.log(err.response.data.errors)
                    console.log('second')
               }
               else {
                    setGeneralError({ message: "Network Error" });
                    console.log('fourth')
                    setAlert(true);
               }
               // console.log(err.response.data.errors);
               console.log('gend')
               // console.log(err.response.data.errors);
          }
     };

     // console.log(loadingState)

     // ## Handle Dropdown Changes
     useEffect(() => {
          setDisable(HandleData(userInput));
     }, [userInput]);

     useEffect(() => {
          //   ## Filter Parishes by Archdeaconry
          if (archdeaconry) {
               const handleArchdeaconryFilter = Churches.filter(
                    (item) => item.archdeaconry === archdeaconry
               );
               const churches = handleArchdeaconryFilter.flatMap((churches) =>
                    churches.churches.map((church) => ({
                         value: church.name,
                         label: church.name,
                    }))
               );
               setChurchList(churches);
               setSelectedOption(null);
               setParish(null);
          } else {
               setChurchList([]);
               setSelectedOption(null);
               setParish(null);
          }
     }, [archdeaconry]);

     // ## Handle ArchdeaconryType
     useEffect(() => {
          if (denomination === "Anglican" && selectedOption) {
               setParish(selectedOption.value);
          } else if (denomination === "Non-Anglican") {
               setParish(null);
          } else {
               setParish(null);
          }
     }, [selectedOption, denomination]);

     // ## Handle Error Removal
     const removeError = (e) => {
          setInputError({ ...inputError, [e.target.name]: "" });
     };

     // # Get the payment type status
     const getPaymentModeValue = async (e) => {
          const paymentOptions = e.target.value;
          setPaymentOption(paymentOptions);
          if (paymentOptions === "Multiple") {
               const campers = await axios.get(
                    `https://api.dlwyouth.org/api/unPaidCampers?parish=` + parish
                    // `http://localhost:5000/api/unPaidCampers?parish=` + parish
               );
               const camperList = campers.data.map((camper) => ({
                    label: camper.fullName,
                    value: camper.uniqueID,
                    email: camper.email
               }));
               setNoOfUnpaidCampers(camperList);
          } else {
               setNoOfUnpaidCampers([]);
               setNoOfUnpaidCampersOption("");
          }
     };

     useEffect(() => {
          setNoOfCampersToPayFor(noOfUnpaidCampersOption.length);
     }, [noOfUnpaidCampersOption]);

     // ## Get the Number OF Unpaid Campers

     return (
          <div className="grid lg:p-3 p-0 relative h-full lg:grid-cols-2 lg:place-content-center font-rubik  ">
               <div className="rounded-lg flex  h-full flex-col space-y-2 lg:p-5 p-2 lg:basis-[50%] basis-full lg:justify-center relative  ">
                    <div className="justify-between items-center lg:flex grid space-y-3">
                         <a href={'/'}>
                              <img className="w-[250px] top-[10px]" src={Logo} alt="Logo" />
                         </a>
                    </div>

                    <div className="lg:text-[17px] font-normal font-rubik-moonrock text-primary-main flex justify-between">
                         <h1>
                              2024 <span className="text-red-600">Camp</span> Registration{" "}
                         </h1>
                         <p className="text-red-500 font-rubik-moonrock">
                              {" "}
                              <span className="text-primary-main ">Note:</span> All Input Fields
                              Are To Be Filled
                         </p>
                    </div>

                    <form method="post" className="space-y-5 font-rubik ">
                         <div className="space-y-3 ">
                              {/* FirstName */}
                              <div className="text-[15px] space-y-1">
                                   <Input
                                        // required
                                        error={inputError}
                                        // value={}
                                        removeError={removeError}
                                        onInput={(e) => setFullName(e.target.value)}
                                        type="text"
                                        placeholder="Enter Full Name"
                                        name="fullName"
                                        label="Full Name"
                                   />
                              </div>
                              {/* FirstName */}

                              {/* Email and Phone Number */}
                              <div className="flex lg:flex-row flex-col lg:space-x-2 text space-y-3 lg:space-y-0">
                                   <Input
                                        // required
                                        error={inputError}
                                        // value={''}
                                        removeError={removeError}
                                        onInput={(e) => setEmail(e.target.value)}
                                        type="email"
                                        placeholder="Enter Email"
                                        name="email"
                                        label="Email"
                                        basis
                                   />
                                   <Input
                                        // required
                                        error={inputError}
                                        // value={''}
                                        removeError={removeError}
                                        onInput={(e) => setPhoneNumber(e.target.value)}
                                        type="text"
                                        placeholder="Enter Phone Number"
                                        name="phoneNumber"
                                        label="Phone Number"
                                        basis
                                   />
                              </div>
                              {/* Email and Phone Number */}

                              {/* Age and Gender */}
                              <div className="flex lg:flex-row flex-col lg:space-x-2 text space-y-3 lg:space-y-0">
                                   <Input
                                        // required
                                        error={inputError}
                                        // value={''}
                                        removeError={removeError}
                                        onInput={(e) => setAge(e.target.value)}
                                        name="age"
                                        label="Age"
                                        basis
                                        options={ageOptions}
                                   />
                                   <Input
                                        // required
                                        error={inputError}
                                        // value={''}
                                        removeError={removeError}
                                        onInput={(e) => setGender(e.target.value)}
                                        name="gender"
                                        label="Gender"
                                        basis
                                        options={genderOptions}
                                   />
                              </div>
                              {/* Age and Gender */}

                              {/* Camper Type and Anglican Member */}
                              <div className="flex lg:flex-row flex-col lg:space-x-2 text space-y-3 lg:space-y-0">
                                   <Input
                                        // required
                                        error={inputError}
                                        // value={''}
                                        removeError={removeError}
                                        onInput={(e) => setCamperType(e.target.value)}
                                        name="camperType"
                                        label="Camper Type"
                                        basis
                                        options={camperTypeOptions}
                                   />
                                   <Input
                                        // required
                                        error={inputError}
                                        // value={''}
                                        removeError={removeError}
                                        onInput={(e) => setDenomination(e.target.value)}
                                        name="denomination"
                                        label="Denomination"
                                        basis
                                        options={denominationOptions}
                                   />
                              </div>
                              {/* Camper Type and Anglican Member */}

                              {/* Archdeaconry and Parish */}
                              {denomination === null ||
                                   denomination === "" ||
                                   denomination === "Non-Anglican" ? (
                                   ""
                              ) : (
                                   <div className="flex lg:flex-row flex-col lg:space-x-2 text space-y-3 lg:space-y-0">
                                        <Input
                                             // required
                                             error={inputError}
                                             // value={}
                                             removeError={removeError}
                                             onInput={(e) => setArchdeaconry(e.target.value)}
                                             name="archdeaconry"
                                             label="Archdeaconry"
                                             basis
                                             options={archdeaconryOptions}
                                             denomination={denomination}
                                        />
                                        <Input
                                             // required
                                             error={inputError}
                                             // value={}
                                             removeError={removeError}
                                             onChange={setSelectedOption}
                                             name="parish"
                                             label="Parish"
                                             basis
                                             options={churchList}
                                             value={selectedOption}
                                             denomination={denomination}
                                        />
                                   </div>
                              )}
                              {/* Archdeaconry and Parish */}

                              {/* Transaction/Payment ID: */}
                              {denomination === null ||
                                   denomination === "" ||
                                   denomination === "Non-Anglican" ? (
                                   ""
                              ) : denomination === "Anglican" && parish == null ? (
                                   ""
                              ) : (
                                   <div className="lg:flex grid items-center border">
                                        <label className="text-faint-blue font-normal tracking-[0.6px]">
                                             Payment Mode<span className="text-[red]">*</span>
                                        </label>
                                        <div className="flex lg:flex-row flex-col lg:gap-10 gap-4 p-3">
                                             <div className="flex items-center space-x-3">
                                                  <label htmlFor="single">Single:</label>
                                                  <input
                                                       type="radio"
                                                       name="paymentOptions"
                                                       value={"Single"}
                                                       id="single"
                                                       onClick={getPaymentModeValue}
                                                  />
                                             </div>

                                             <div className="flex items-center space-x-3">
                                                  <label htmlFor="multiple">Multiple:</label>
                                                  <input
                                                       type="radio"
                                                       name="paymentOptions"
                                                       value={"Multiple"}
                                                       id="multiple"
                                                       readOnly
                                                       onClick={getPaymentModeValue}
                                                  />
                                             </div>

                                             <div className="flex items-center space-x-3">
                                                  <label htmlFor="paidByChurch">Church Sponsored:</label>
                                                  <input
                                                       type="radio"
                                                       name="paymentOptions"
                                                       value={"Church Sponsored"}
                                                       id="paidByChurch"
                                                       onClick={getPaymentModeValue}
                                                  />
                                             </div>
                                        </div>
                                   </div>
                              )}


                              {/* Number Of Campers to pay for &7 Choices */}

                              {parish === "" || parish === null ? (
                                   ""
                              ) : (
                                   <>
                                        {paymentOption === "Multiple" ? (
                                             <div className="flex lg:flex-row flex-col lg:space-x-2 text space-y-3 lg:space-y-0">
                                                  <Input
                                                       required
                                                       error={inputError}
                                                       value={noOfCampersToPayFor}
                                                       removeError={removeError}
                                                       name="noOfCampersToPayFor"
                                                       label="Number Of Campers To Pay For"
                                                       basis
                                                       type={"number"}
                                                       readOnly
                                                  />
                                                  <Input
                                                       error={inputError}
                                                       // value={}
                                                       removeError={removeError}
                                                       onChange={setNoOfUnpaidCampersOption}
                                                       name="noOfUnpaidCampers"
                                                       label="List Of Unpaid Campers"
                                                       basis
                                                       options={noOfUnpaidCampers}
                                                       value={noOfUnpaidCampersOption}
                                                  // denomination={denomination}
                                                  />
                                             </div>
                                        ) : (
                                             ""
                                        )}
                                   </>
                              )}
                              {/* Number Of Campers to pay for &7 Choices */}

                              {/* Registration */}
                              <div className="flex gap-3 text-center justify-center">
                                   <p className="text-faint-blue">
                                        By Registering, you are indicating that you have <br /> Read and
                                        agreed to the{" "}
                                        <a href="" className="text-red-500 underline">
                                             Rules & Regulations
                                        </a>
                                        for the camp
                                   </p>
                              </div>
                              {/* Registration */}
                         </div>

                         <div className="mt-5 lg:flex gap-3 lg:space-y-0 space-y-3 relative">
                              {disable === true ? (
                                   <button
                                        className={`w-full outline-none ring-[0.3px] ring-text-primary bg-gray-200 transition-all rounded-md p-3 text-primary-main text-[15px] cursor-not-allowed `}
                                        disabled
                                   >
                                        Register
                                   </button>
                              ) : (
                                   <button
                                        type="submit"
                                        onClick={submitForm}
                                        className={`w-full outline-none ring-[0.3px] ring-text-primary ${loadingState ? "bg-[#85858580] cursor-not-allowed" : "bg-blue-900 hover:bg-reddish"
                                             } transition-all rounded-md p-3 text-white text-[15px] `}
                                   >
                                        {loadingState ? (
                                             'Registering...'
                                        ) : (
                                             " Register "
                                        )}
                                   </button>
                              )}
                              <a
                                   href="/"
                                   className="rounded-[5px] bg-reddish text-white lg:w-full w-full p-3 grid place-content-center hover:bg-blue-900 transition-all"
                              >
                                   Back
                              </a>
                         </div>
                    </form>
               </div>

               <div className="lg:flex fixed lg:right-0 w-[50%] h-full flex-col hidden  basis-[50%] space-y-2 justify-center items-center">
                    <div className="flex items-center reg_image ">
                         <img className="w-[full]" src={dlw} alt="" />
                    </div>

                    <div className="text-center p-3 space-y-3 basis-[20%]">
                         <h1 className="font-medium tracking-wider uppercase text-red-700">
                              Romans 16:26
                         </h1>
                         <p className="text-faint-blue font-normal">
                              “ But now is made manifest, and by the scriptures of the <br />{" "}
                              prophets, according to the commandment of the everlasting <br />
                              God, made known to all nations for the obedience of faith: “
                         </p>
                    </div>
               </div>

               {/* Notification */}
               <>
                    {/* Global notification live region, render this permanently at the end of the document */}
                    {registrationStatus === false ? (
                         <Alert
                              status={alert}
                              header={"Regitration Failed!"}
                              text={"Please Try Registering Again."}
                         />
                    ) : (
                         ""
                    )}
                    {generalError.message === "Registration Failed" ? (
                         <Alert
                              status={alert}
                              header={"Registration Failed!"}
                              text={
                                   "Error Trying to Register This User. Please Reach out to the Technical Unit"
                              }
                         />
                    ) : (
                         ""
                    )}
                    {generalError.message === "Network Error" ? (
                         <Alert
                              status={alert}
                              header={"Error Occured!"}
                              text={
                                   "Error Connecting with the server. Please Reach out to the Technical Unit"
                              }
                         />
                    ) : (
                         ""
                    )}
               </>
               {/* Notification */}
          </div>
     );
}
