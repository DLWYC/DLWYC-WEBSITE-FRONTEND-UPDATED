  import { PaystackButton } from 'react-paystack';
import Male from "/male.png"
import Female from "/female.png"
import { Wallet } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router'




  
  function PayStack({userDetails, values, setValues, paymentOption }) {
     const reference = (new Date()).getTime().toString()
     const amount = paymentOption == 'single' ? 2000 : 400000
     const amountInkobo = amount * 100
     const [paymentStatus , setPaymentStatus] = useState()
     const navigate = useNavigate()

     // console.log("Amoun: ", amount, "Amount In Kobo: ", amountInkobo)

     const config = {
     reference: reference,
     email: userDetails?.email,
     amount: amountInkobo, //Amount is in the country's lowest currency. E.g Kobo, so 20000 
     currency: 'NGN',
     publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
     metadata: {
          userId: userDetails?.uniqueId,
          fullName: userDetails?.fullName,
          paymentOption: paymentOption,
          // custom_fields: [
          //      {
          //           display_name: "Payment Type",
          //           variable_name: "payment_type",
          //           value: paymentOption
          //      }
          // ]
     },
     };



     const verifyTransactionResponse =  async (ref) => {   
          try{
              const verifyTransactionResponse =  await axios.get(`https://api.paystack.co/transaction/verify/${ref}`, {
                    headers: {
                         Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`
               }
          })
          const {status, reference, channel, id } = verifyTransactionResponse?.data?.data

           switch(status){
                case 'reversed':
                    setPaymentStatus(status)
                    toast.dismiss("Payment UnSuccessful")
                    break;
                    case 'success':
                    setPaymentStatus(status)
                    toast.success("Payment Successful")
                    setValues({...values, 
                         paymentID: id,
                         paymentStatus: status,
                         reference: reference,
                         modeOfPayment: channel
                    })
                    break;
               case "failed":
                    setPaymentStatus(status)
                    toast.error("Payment Failed, Please Try Again")
                    navigate ({to: '/userdashboard'})
                    break;
               }

               // console.log("Response", status)
          }
          catch(error){     
               toast.dark("error from paystack",error)
               console.log("Error From payStach", error)
          }
     }


    // you can call this function anything
    const handlePaystackSuccessAction = async (reference) => {
     // console.log(reference, "sdjkfnsjdfjsndfkjn")
          await verifyTransactionResponse(reference?.reference)
     }

      // Implementation for whatever you want to do with reference and after success call.


    // you can call this function anything
    const handlePaystackCloseAction = async () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
               await verifyTransactionResponse(reference)

      console.log('closed')
    }

    const componentProps = {
        ...config,
        text: paymentStatus == "pending" ? <span class="loader"></span> : 'Proceed To Payment',
        onSuccess: (ref) => handlePaystackSuccessAction(ref),
        onClose:  handlePaystackCloseAction,
    };

    

    return (
      <div className="lg:flex grid items-center gap-4">
          <div className="lg:basis-[50%] basis-[100%] grid place-content-center">

                    <img src={userDetails?.gender == 'Male' ?  Male : Female} alt="" className='w-[300px]'/>
          </div>
         
         <div className="grid items-center lg:basis-[50%] basis-[100%] gap-4 ">
         <h2 className="flex items-center text-[20px] py-3"> <Wallet className='mr-3 w-[30px]' /> Your Payment Details</h2>

          <div className=" space-y-3 ">
          <p className='text-[14px]'>  Name: <span className='ml-3 font-[500] text-primary-main'> {userDetails?.fullName} </span> </p>
          <p className='text-[14px]'>  Email: <span className='ml-3 font-[500] text-primary-main'> {userDetails?.email} </span> </p>
          <p className='text-[14px]'>  Unique ID: <span className='ml-3 font-[500] text-primary-main'> {userDetails?.uniqueId} </span> </p>
          </div>
          
          <div className="mb-4 space-y-3">
          <p className='text-[14px]'>  Reference ID: <span className='ml-3 font-[500] text-reddish'> {reference} </span> </p>
          <p className='text-[14px]'>  Amount: <span className='ml-3 font-[500] text-reddish'> {amount} </span> </p>
          </div>

        <PaystackButton className='bg-primary-main [padding:var(--spacing-button)] rounded-sm hover:bg-text-header text-white transition ease-in-out delay-20 cursor-pointer' {...componentProps} />
         </div>
      </div>
    );
  }
  
  export default PayStack;