import React from 'react'

const LogoutModal = ({ 
  isOpen, 
  onClose, 
  onLogout 
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}) => {
  if (!isOpen) return null;

  return (
    // Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal */}
      <div className="bg-white rounded-t h-44 p-6 w-96 shadow-lg">
        <div className="flex justify-center flex-col mb-6">
          <h2 className="text-xl font-semibold mb-2">Log Out</h2>
          <p className="text-gray-600">Are you sure you want to log out?</p>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <button 
            onClick={onClose}
            className="border border-gray-300 rounded-md w-1/2 py-2 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onLogout}
            className="bg-[#DC0121] text-white rounded-md w-1/2 py-2 hover:bg-[#b30018] transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
