import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PaymentSelection from './paymentSelection';
import Form from './Forms';
import { formStep } from '@/data/Forms';
import PayStack from './PayStack';



// Custom MultiStep component that mimics react-multistep

const MultiStep = ({
  steps,
  stepCustomStyle,
  prevButton,
  nextButton,
  showNavigation = true,
  showTitles = true,
  direction = 'row'
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="multistep-container">
      {/* **************** Step Indicator  **************** */}
      {showTitles && (
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex flex-col items-center ${direction === 'column' ? 'mb-4' : ''}`}>
                <div className={`w-[35px] h-[35px] rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-primary-main text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className={`mt-2 text-xs font-medium transition-colors ${
                  index === currentStep ? 'text-primary-main' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>

              {index < steps.length - 1 && direction === 'row' && (
                <div className={`w-16 h-[5px] rounded-full mx-3 transition-colors duration-300 ${
                  index < currentStep ? 'bg-reddish' : 'bg-gray-200'
                }`} />
                
              )}
            </div>
          ))}
        </div>
      )}
      {/* **************** Step Indicator  **************** */}

      {/* Step Content */}
      <div 
        className="step-content-container min-h-[300px] flex items-center justify-center"
        style={stepCustomStyle}
      >
        <div className="w-full">
          {currentStepData.component}
        </div>
      </div>

      {/* Navigation Buttons */}
      {showNavigation && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            style={{
              ...prevButton.style,
              opacity: currentStep === 0 ? 0.5 : 1,
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
            }}
            className="flex items-center transition-all duration-200 hover:shadow-md disabled:hover:shadow-none"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {prevButton.title}
          </button>
          
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
          
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            style={{
              ...nextButton.style,
              opacity: currentStep === steps.length - 1 ? 0.5 : 1,
              cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer'
            }}
            className="flex items-center transition-all duration-200 hover:shadow-md disabled:hover:shadow-none"
          >
            {nextButton.title}
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};






// const StepTwo = ({ heading }) => (
//   <div className="step-content  p-6 ">
//      <Form array={formStep}  />
//   </div>
// );

// const StepThree = () => (
//   <div className="step-content p-6 bg-white rounded-lg shadow-sm text-center">
//     <div className="mb-6">
//       <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//         <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//         </svg>
//       </div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Complete!</h2>
//       <p className="text-gray-600">Thank you for registering!</p>
//     </div>
//     <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
//       <p className="text-green-800">A confirmation email will be sent to you shortly.</p>
//     </div>
//   </div>
// );

// Main component
const MultiSteps = ({userData, eventDetails}) => {
     const [selectedOption, setSelectedOption] = useState('single');
  const [values, setValues] = useState({});
//   console.log("sdsdfdsf", eventDetails)
     
  useEffect(()=>{
     setValues({
    "uniqueID": userData?.uniqueId,
    "fullName": userData?.fullName,
    "email": userData?.email,
    "eventId": eventDetails._id,
    "eventTitle": eventDetails.eventTitle,
    "paymentOption": selectedOption,
    "parish": userData?.parish,
    "archdeaconry": userData?.archdeaconry
     })
  }, [userData, eventDetails])
     
  const steps = [
    {
      title: 'Payment Type',
      component:   <PaymentSelection 
     selectedOption={selectedOption}
     setSelectedOption={setSelectedOption}
  />,
    },
    {
      title: 'Confirm Details',
      component: <Form array={formStep} values={values} setValues={setValues} />,
    },
    {
      title: 'Proceed To Payment',
      component: <PayStack userDetails={userData} paymentOption={selectedOption} values={values} setValues={setValues} />,
    },
  ];

  return (
       <div className="p-6 bg-[#f4f7fa] rounded-xl  w-full mx-auto">
       {console.log("All Gathered: ", values)}
      <MultiStep
        steps={steps}
        stepCustomStyle={{
          transition: 'all 0.3s ease-in-out',
        }}
        prevButton={{
          title: 'Back',
          style: {
            backgroundColor: '#ab0606', // Tailwind red-400
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
          },
        }}
        nextButton={{
          title: 'Continue',
          style: {
            backgroundColor: '#091e54', // Tailwind primary-main
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
          },
        }}
        showNavigation={true}
        showTitles={true}
        direction="row"
      />
    </div>
  );
};

export default MultiSteps;