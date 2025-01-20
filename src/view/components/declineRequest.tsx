import React, { useState } from 'react'
import WhatWentWrong from './whatWentWrong'

interface DeclineRequestProps {
  isOpen: boolean;
  onClose: () => void;
  onDecline: () => void;
}

const DeclineRequest: React.FC<DeclineRequestProps> = ({ isOpen, onClose, onDecline }) => {
  const [showWhatWentWrong, setShowWhatWentWrong] = useState(false);
  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white font-title rounded-t-lg p-6 w-96 flex justify-center flex-col">
            <h1 className="text-[22px] text-[#1D2939] text-center font-semibold mb-2">Decline Order Request?</h1>
            <div className="mb-6 flex justify-center items-center">
              <p className="text-gray-600 text-xs text-center">Are you sure you want to decline this order request? You can't undo this action</p>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={onClose}
                className="border w-full text-[15px] border-gray-300 text-d_gray font-normal rounded-lg py-2 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowWhatWentWrong(true)}
                className="bg-[#DC0121] text-[15px] font-normal text-white rounded-lg py-2 hover:bg-[#b30018] transition-colors"
              >
                Decline Order
              </button>
            </div>
          </div>
        </div>
      )}
      {showWhatWentWrong && (
        <WhatWentWrong 
          onClose={() => setShowWhatWentWrong(false)}
          onSubmit={() => {}}
        />
      )}
    </>
  )
}

export default DeclineRequest
