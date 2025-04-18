import React  from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { AppDispatch, RootState } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import { resetStatusUpdate, triggerOrderList } from '../../features/orders/order_slice';

interface DeclineOrderProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeclineOrder: React.FC<DeclineOrderProps> = ({ isOpen, onClose }) => {
  const { details, action } = useSelector((state: RootState) => state.order);
  const dispatch: AppDispatch = useDispatch();

  const handleGotIt = () => {
    const payload = {
      paging: {
        index: 0,
        size: 100,
      },
    };
    dispatch(triggerOrderList(payload));
    onClose();
    dispatch(resetStatusUpdate());
  };

  if (!(action === 'REJECTED' && isOpen)) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white pb-8 flex flex-col items-center justify-center text-center rounded-t-lg p-3 w-96'>
        <DotLottieReact src='https://lottie.host/c81588e3-c977-45ba-9a02-bdbe215522fa/KOILNm93MO.lottie' loop autoplay />
        <h1 className='text-[22px] font-semibold'>You’ve Declined this Order</h1>
        <p className='text-[11px] leading-[16px]'>{`We’ll let ${details.delivery_details.name} know that you can’t fulfill this order at the moment.`}</p>
        <button onClick={handleGotIt} className='bg-[#FD671E] text-white w-full h-[44px] px-[138px] rounded-md text-[15px]'>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default DeclineOrder;
