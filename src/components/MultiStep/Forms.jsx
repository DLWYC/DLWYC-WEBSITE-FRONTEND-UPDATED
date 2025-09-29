import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { useLocation, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "react-toastify";


const Form = ({ className, array, text, values, setValues, setPaymentCodeStatus, selectedOption }) => {
  const navigate = useNavigate();
  const [paymentCode, setpaymentCode] = useState()
  const [payersId, setpayersId] = useState()
  const [numberOfPayment, setNumberOfPayment] = useState(0)
  console.log("Forms", typeof numberOfPayment)
  const verifyCode = async () => {
    try{
    
    if(!payersId || payersId == ''){
      toast.error("Please Enter The Payer's ID")
      return
    }
    else if(!paymentCode || paymentCode == ''){
      toast.error("Please Enter The Payment Code")
      return
    }
    

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-code`, {
        "payersId": payersId,
        "archdeaconry": values?.archdeaconry,
        "paymentCode": paymentCode,
        "eventTitle": values?.eventTitle
      })
      setPaymentCodeStatus(response?.data?.message)
      toast.success(response?.data?.message)
      console.log("REsponse", response?.data?.message)
    }

    catch(error){
       const errorMessage = error?.response?.data?.error?.error || 
                        'An error occurred during verification';
      setPaymentCodeStatus(error?.response?.data?.error?.error)
    toast.error(errorMessage);
    }
    
      
  };

  useEffect(()=>{

    selectedOption == 'single' ?
      setValues({
        ...values,
        "modeOfPayment": "Code",
        "paymentID": paymentCode,
        "payersId": payersId
      })
      : 
      setValues({
        ...values,
        "numberOfPayment": numberOfPayment,
      })
  }, [paymentCode, numberOfPayment])

// 
  return (
    <div className={`${className}  font-rubik `}>
      <div className=" grid gap-[15px]">
        {array.map((fields, index) => (
          <div className="w-full items-center flex flex-row gap-1 relative" key={index}>
               <label
              htmlFor={fields.name}
              className={`${"bottom-2 left-0 transition-all peer-focus:-translate-y-[120%] text-[#060f3b] peer-focus:text-reddish"}  ${values[fields.name] ? " font-500 text-[14px]" : "text-base"} `}
            >
              {fields.fieldName}:
            </label>

            <Input
              type={fields.type}
              id={fields.name}
              className="peer border-0  w-[80%] rounded-none focus:shadow-reddish"
              placeholder={""}
              required
              readOnly={fields?.readOnly ? fields.readOnly : ''}
              onChange={(e) =>
                setValues({ ...values, [fields.name]: e.target.value })
              }
              value={
                values[fields.name] || ""
              }
            />
            
          </div>
        ))}


        <div className="lg:flex grid items-center">
          {selectedOption == 'multiple' ? (
            <div className="">
               <div className="lg:flex  items-center">
        <label htmlFor="numberOfPayment" className="mr-2 font-500 text-[14px] text-[#060f3b]">Select Number: <span className="text-red-500">*</span></label>
        <Input type="number" name="numberOfPayment" id="numberOfPayment" placeholder="0" className="border-0 border border-gray-600  lg:w-[50%] rounded-none mr-2" onChange={(e)=>setNumberOfPayment(Number(e.target.value))}/>
        </div>
            </div>
          ) : (
            <div className="flex">

            <div className="lg:flex  items-center">
        <label htmlFor="payersId" className="mr-2 font-500 text-[14px] text-[#060f3b]">Payer UniqueID: <span className="text-red-500">*</span></label>
        <Input type="text" name="payersId" id="payersId" className="border-0 border border-gray-600  lg:w-[50%] rounded-none mr-2" onChange={(e)=>setpayersId(e.target.value)}/>
        </div>

<div className="lg:flex  items-center">
        <label htmlFor="verifyCode" className="font-500 mr-2 text-[14px] text-[#060f3b]">Payment Code:</label>
        <Input type="text" name="verifyCode" id="verifyCode" className="border-0 border border-gray-600 lg:w-[50%] rounded-none mr-2" onChange={(e)=>setpaymentCode(e.target.value)}/>
</div>
          <button className="relative py-2 px-4 lg:mt-0 mt-3 cursor-pointer bg-primary-main text-white text-[13px]" onClick={verifyCode}>
            Verify Code
          </button>
            </div>
          )} 
        </div>
        
       
      </div>
    </div>
  );
};

export default Form;
