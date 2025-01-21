import React from 'react';

const Logout = ({ onClose, onLogout }: { onClose: () => void; onLogout: () => void }) => {
  // if (!isOpen) return null;

  return (
    <div className='bg-white rounded-t p-6 w-96 shadow-t-lg'>
      <div className='flex justify-center flex-col mb-6'>
        <h2 className='text-xl font-semibold mb-2'>Log Out</h2>
        <p className='text-gray-600'>Are you sure you want to log out?</p>
      </div>
      <div className='flex flex-col gap-3 justify-center items-center'>
        <button onClick={onClose} className='border border-gray-300 rounded-md w-full py-2 hover:bg-gray-50 transition-colors'>
          Cancel
        </button>
        <button onClick={onLogout} className='bg-[#DC0121] text-white rounded-md w-full py-2 hover:bg-[#b30018] transition-colors'>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Logout;
