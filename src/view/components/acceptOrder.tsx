import React from 'react';
import successCheck from '../../assets/animation_500_lcqvyner 1@2x.svg';
interface AcceptOrderProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (v: string) => void;
}

const AcceptOrder: React.FC<AcceptOrderProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white flex flex-col pb-6 items-center justify-center text-center rounded-t-lg p-3 w-96'>
        <span className='text-[px] py-2'>
          <img src={successCheck} alt='' />
        </span>
        <div className='mb-6 flex justify-center items-center'>
          <p className='text-gray-600 text-xs text-center'>Are you sure you want to accept this order request?</p>
        </div>
        <div className='flex flex-col gap-3'>
          <button onClick={() => onSubmit("ACCEPTED")} className='bg-[#FD671E] text-white w-[343px] h-[44px]  rounded-md text-[15px]'>
            Accept Order!
          </button>
          <button onClick={onClose} className='border w-full text-[15px] border-gray-300 text-d_gray font-normal rounded-lg py-2 hover:bg-gray-50 transition-colors'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptOrder;
