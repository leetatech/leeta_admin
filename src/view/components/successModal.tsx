import React from 'react';
import successCheck from '../../assets/animation_500_lcqvyner 1@2x.svg';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  buttonText?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
                                                     isOpen,
                                                     onClose,
                                                     message = 'Order accepted successfully!',
                                                     buttonText = 'Close',
                                                   }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white flex flex-col items-center justify-center text-center rounded-lg p-6 w-96 shadow-xl animate-fade-in-up">
        <img src={successCheck} alt="Success" className="w-24 h-24 mb-4" />
        <p className="text-gray-700 text-sm mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#3EAF3F] text-white px-6 py-2 rounded-md text-sm hover:bg-[#359c36] transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;