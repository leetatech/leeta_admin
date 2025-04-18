import React, { useEffect, useState } from 'react';
import { GoX } from 'react-icons/go';
import DeclineOrder from './declineOrder';
import { RootState } from '../../state';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Spinner } from './Spinner';

interface WhatWentWrongProps {
  onClose: () => void;
  onSubmit: (status: string, reason: string) => void;
  closeDecline: () => void;
}
const WhatWentWrong: React.FC<WhatWentWrongProps> = ({ onClose, onSubmit, closeDecline }) => {
  const { orderUpdate, action } = useSelector((state: RootState) => state.order);
  const [selectedReason, setSelectedReason] = useState('');
  const [, setDeclineOrder] = useState(false);
  const [gotItModal, setGotItModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReason) {
      onSubmit('REJECTED', selectedReason);
    }
  };

  useEffect(() => {
    if (action === 'REJECTED' && orderUpdate.data.success === 'success' && !orderUpdate.error) {
      setGotItModal(true);
      // dispatch(resetStatusUpdate());
    } else if (orderUpdate.message && orderUpdate.error) {
      toast.error(`${orderUpdate.message}`);
    }
  }, [orderUpdate]);


  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white font-title rounded-lg p-6 w-96'>
        <div className='flex justify-end'>
          <GoX className='cursor-pointer text-xl' onClick={onClose} />
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='text-[22px] text-[#1D2939] text-start font-semibold'>What went wrong?</h2>
          <form onSubmit={handleSubmit} className='flex flex-col pt-1 gap-3'>
            {[
              { id: 'unreachable', label: 'Customer unreachable' },
              { id: 'unavailable', label: 'Product unavailable' },
              { id: 'distance', label: 'Delivery distance too far' },
              { id: 'address', label: "Customer's address is incorrect" },
              { id: 'safety', label: 'Safety concerns' },
            ].map(({ id, label }) => (
              <div className='flex items-center gap-2' key={id}>
                <div className='flex justify-between w-full'>
                  <label htmlFor={id}>{label}</label>
                  <input type='radio' id={id} name='issue' value={label} onChange={(e) => setSelectedReason(e.target.value)} />
                </div>
              </div>
            ))}
            <div className='flex flex-col pt-4 gap-3 mt-4'>
              <button
                // onClick={() => setDeclineOrder(true)}
                type='submit'
                className='border w-full text-[15px] border-gray-300 text-d_gray font-normal rounded-lg py-2 hover:bg-gray-50 transition-colors'
              >
                {orderUpdate.loading ? <Spinner color='black' /> : <>Done</>}
              </button>
            </div>
          </form>
        </div>
      </div>
      <DeclineOrder
        isOpen={gotItModal}
        onClose={() => {
          setGotItModal(false);
          setDeclineOrder(false);
          closeDecline();
        }}
      />
    </div>
  );
};

export default WhatWentWrong;
