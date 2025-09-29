import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "react-toastify";

const Confirmation = ({values}) => {
    const navigate = useNavigate();
  

     console.log("ONFIRMATION PAGE:", values)
      const updateValues = {
                "payersId": values?.payersId, 
                "paymentCode": values?.paymentID, 
                "archdeaconry": values?.archdeaconry,
                "eventTitle": values?.eventTitle,
                "userName": values?.fullName, 
                "userId": values?.uniqueID, 
                "userEmail": values?.email
            }

     const confirmRegistration = async (e) =>{
          e.preventDefault()
          // console.log("Update Values", updateValues)
          // const UpdateCodeStatus = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/update-code-status`, updateValues)
          //   console.log("UpdateCodeStatus", UpdateCodeStatus)
            
          //   const registrationStatus = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userRegisteredEvents`, values)
          //   console.log("Sdaasdasd", registrationStatus)
            
          //   if (registrationStatus){
          //     toast.success("Registration Successful") 
          //       navigate({to: '/userDashboard'})
          // }
          // toast.warning("Issh")
          // console.log("sdfsdf")
     }

     return(
  <div className="step-content p-6 bg-white rounded-lg shadow-sm text-center">
    <div className="mb-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Registration</h2>
      <p className="text-gray-600">Click The Button Below!!</p>
    </div>
    <div className="">
      <button className="border border-blue-500 bg-primary-main text-white px-7 py-2" onClick={confirmRegistration}>Click Here</button>
    </div>
    {/* <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
      <p className="text-green-800">A confirmation email will be sent to you shortly.</p>
    </div> */}
  </div>
)};



export default Confirmation