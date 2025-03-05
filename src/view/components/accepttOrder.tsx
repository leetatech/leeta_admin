import React from 'react';
import successCheck from '../../assets/animation_500_lcqvyner 1@2x.svg';
import { RootState } from '../../state';
import { useSelector } from 'react-redux';
interface AcceptOrderProps {
  isOpen: boolean;
  onClose: () => void;
}

const AcceptOrder: React.FC<AcceptOrderProps> = ({ isOpen, onClose }) => {
  const { details,action } = useSelector((state: RootState) => state.order);

  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white flex flex-col pb-6 items-center justify-center text-center rounded-t-lg p-3 w-96'>
        <span className='text-[px] py-2'>
          <img src={successCheck} alt='' />
        </span>
        <div className='pb-6 flex flex-col gap-0'>
          <p className='text-[11px] text-d_gray font-title leading-[0.5] !important font-semibold'>
            {`You've ${action} this Order We'll let ${details.delivery_details.name} know that you've ${action} the order request and you're on it!`}
          </p>
        </div>
        <button onClick={onClose} className='bg-[#FD671E] text-white w-[343px] h-[44px]  rounded-md text-[15px]'>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default AcceptOrder;
