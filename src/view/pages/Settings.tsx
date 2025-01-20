import React, { useState } from "react";
import Typography from "../components/Typography/Typography";
import { TypographyVariant } from "../components/types";
import UPLOAD from "../../assets/uplooad.svg";
import { TbLogout } from "react-icons/tb";
// import OrderDeclined from "../components/orderDeclined";

const Settings = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    window.location.href = '/';
    console.log("Logging out...");
  };

  return (
    <div className="px-6 py-4">
      <Typography variant={TypographyVariant.TITLE}>Settings</Typography>
      <section className="flex flex-col justify-center items-center pt-24 w-full">
        <img src={UPLOAD} alt="Coming soon" />
        <div className="text-center w-full max-w-md">
          <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>
            Daniel Tesfaye
          </Typography>
          <Typography variant={TypographyVariant.SMALL}>
            Abeltesfaye@Gmail.com
          </Typography>
          <div 
            className="bg-[#FFFFFF] py-4 flex items-center px-3 mt-3 w-full max-w-sm mx-auto"
            onClick={() => setShowLogoutModal(true)}
          >
            <TbLogout fontWeight={700} color="#C11F1F" />
            <Typography
              variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
              className="text-red-700 text-start px-2 cursor-pointer"
            >
              Log out
            </Typography>
          </div>
        </div>
      </section>

      {showLogoutModal && (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        //   <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
        //     <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM} className="mb-4">
        //       Are you sure you want to log out?
        //     </Typography>
        //     <div className="flex justify-end gap-4">
        //       <button
        //         className="px-4 py-2 text-gray-600"
        //         onClick={() => setShowLogoutModal(false)}
        //       >
        //         Cancel
        //       </button>
        //       <button
        //         className="px-4 py-2 bg-red-600 text-white rounded"
        //         onClick={() => {
        //           handleLogout();
        //           window.location.href = '/';
        //         }}
        //       >
        //         Logout
        //       </button>
        //     </div>
        //   </div>
 


        // </div>
        <div className="fixed w-full h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {/* Modal */}
        <div className="bg-white rounded-t-lg h-[249px] font-title  p-6 w-[375px] shadow-t-lg">
          <div className="flex justify-center items-center flex-col mb-6">
            <h2 className="text-[22px] font-semibold mb-2">Log Out</h2>
            <p className="text-gray-600 text-[11px] font-title font-normal">Are you sure you want to log out?</p>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center">
            <button 
              // onClick={onClose}
              onClick={() => setShowLogoutModal(false)}
              className="border border-gray-300 text-[15px] font-title rounded-md w-[343px] h-[44px] py-2 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              // onClick={onLogout}
              onClick={() => {
                        handleLogout();
                       window.location.href = '/';
                         }}
              className="bg-[#DC0121] text-[15px] font-title text-white rounded-md w-[343px] h-[44px] py-2 hover:bg-[#b30018] transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Settings;
