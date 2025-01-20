import React from 'react';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


interface DeclineOrderProps {
    isOpen: boolean;  
    // Whether the modal is open or not
    onClose: () => void;
    // onSubmit: (reason: string) => void; // Uncomment if needed
}

const DeclineOrder: React.FC<DeclineOrderProps> = ({ 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  const handleDone = () => {
    window.location.href = '/auth/orders';
    console.log("orders...");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white pb-8 flex flex-col items-center justify-center text-center rounded-t-lg p-3 w-96">
        
    <DotLottieReact
      src="https://lottie.host/c81588e3-c977-45ba-9a02-bdbe215522fa/KOILNm93MO.lottie"
      loop
      autoplay
    />
        <h1 className='text-[22px] font-semibold'>You’ve Declined this Order</h1>
        <p className='text-[11px] leading-[16px]'>We’ll let Daniel Tesfaye know that you can’t fulfill this order at the moment.</p>
          <button
            onClick={() => {
                handleDone();
                window.location.href = '/app/orders';
              }}
            
            className='bg-[#FD671E] text-white w-full h-[44px] px-[138px] rounded-md text-[15px]'>Got it!</button>
      </div>
    </div>
  );
}

export default DeclineOrder;