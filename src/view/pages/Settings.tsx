import React, { useState } from 'react';
import Typography from '../components/Typography/Typography';
import { TypographyVariant } from '../components/types';
import UPLOAD from '../../assets/uplooad.svg';
import { TbLogout } from 'react-icons/tb';
import Modal from '../components/Modal';
import Logout from '../components/logout';

const Settings = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    window.location.href = '/';
    console.log('Logging out...');
  };

  return (
    <div className='px-6 py-4'>
      <Typography variant={TypographyVariant.TITLE}>Settings</Typography>
      <section className='flex flex-col justify-center items-center pt-24 w-full'>
        <img src={UPLOAD} alt='Coming soon' />
        <div className='text-center w-full max-w-md'>
          <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>Daniel Tesfaye</Typography>
          <Typography variant={TypographyVariant.SMALL}>Abeltesfaye@Gmail.com</Typography>
          <div className='bg-[#FFFFFF] py-4 flex items-center px-3 mt-3 w-full max-w-sm mx-auto' onClick={() => setShowLogoutModal(true)}>
            <TbLogout fontWeight={700} color='#C11F1F' />
            <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM} className='text-red-700 text-start px-2 cursor-pointer'>
              Log out
            </Typography>
          </div>
        </div>
      </section>

      <Modal isOpen={showLogoutModal}>
        <Logout
          onClose={() => setShowLogoutModal(false)}
          onLogout={() => {
            handleLogout();
            window.location.href = '/';
          }}
        />
      </Modal>
    </div>
  );
};

export default Settings;
