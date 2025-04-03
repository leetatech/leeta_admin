import React, { useState } from 'react';
import Typography from '../components/Typography/Typography';
import { TypographyVariant } from '../components/types';
import UPLOAD from '../../assets/uplooad.svg';
import { TbLogout } from 'react-icons/tb';
import Modal from '../components/Modal';
import Logout from '../components/logout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';

const Settings = () => {
  const { userInfo, loading } = useSelector((state: RootState) => state.user);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const name = `${userInfo?.first_name} ${userInfo.last_name}`;

  const handleLogout = () => {
    localStorage.removeItem('leeta_token');
    navigate('/');
    console.log('Logging out...');
  };

  return (
    <div className='px-6 py-4'>
      <Typography variant={TypographyVariant.TITLE}>Settings</Typography>
      <section className='flex flex-col justify-center items-center pt-24 w-full'>
        <img src={UPLOAD} alt='Coming soon' />
        <div className='text-center w-full max-w-md'>
          <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>{name}</Typography>
          <Typography variant={TypographyVariant.SMALL}>{userInfo?.email?.address}</Typography>
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
            setShowLogoutModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Settings;
