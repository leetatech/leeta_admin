/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect, useContext } from 'react';

import { type RootState } from '../../../state';
import { Link, useLocation } from 'react-router-dom';
import NavItem from '../../molecules/NavItem';
// import { RASContext } from '../../../context/Context';
import { useIcons } from '../../../hooks/useIcons';
import { useDispatch, useSelector } from 'react-redux';
// import { authorized } from '../../../utilities/helpers';
// import { SingleLineLoader } from '../../atoms/Loaders/single-line-loader/SingleLineLoader';
import './Sidebar.css';
import Typography from '../Typography/Typography';
import { TypographyVariant } from '../types';

interface IsideProp {
  icon: string[];
  name: string;
  id: number;
  active: boolean;
  to: string;
  nav: number;
}

interface IProps {
  shrinked?: boolean;
  setShrinked?: (v: boolean) => void;
  removeShrink?: boolean;
  closeModal?: () => void;
  setHeadTag: (v: string) => void;
  setShowLogoutModal: (v: boolean) => void;
  showLogoutModal: boolean;
}

const Sidebar = ({ shrinked, setShrinked, removeShrink, closeModal, setHeadTag, setShowLogoutModal, showLogoutModal }: IProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();
  const { shrink, logo, home, homei, cart, carti, setting, settingi, logout } = useIcons();

  const location = useLocation();
  const [activeNav, setActiveNav] = useState(1);
  // const [showLogoutModal, setShowLogoutModal] = useState(false);
  const SidebarLinkNames = [
    {
      name: 'Dashboard',
      id: 1,
      nav: 1,
      to: '/app/dashboard',
      active: location.pathname.includes('dashboard'),
      icon: [home, homei],
    },
    {
      name: 'Orders',
      to: '/app/orders',
      active: location.pathname.includes('orders'),
      icon: [cart, carti],
    },
    {
      name: 'Settings',
      to: '/app/settings',
      active: location.pathname.includes('settings'),
      icon: [setting, settingi],
    },
  ];

  const SidebarLinkNamesBottom = [
    {
      name: 'Log Out',
      to: '#',
      active: location.pathname.includes('logout'),
      icon: [logout, logout],
    },
  ];

  return (
    <div className={`sidebarComponent sidebar-bg  ${shrinked ? 'shrink' : ''}`}>
      <div className={`sidebarComponent__logo-div  ${shrinked ? 'shrink' : ''}`}>
        <div className='logo-wrapper display-f align-center  '>
          {shrinked ? (
            <div className='logo-img-con logo-con'>
              <img src={logo} alt='symbol' />
            </div>
          ) : (
            <div className='logo-img-con full-logo-con'>
              <img src={logo} alt='symbol' className='sidebarComponent__logo-img' />
              <Typography className='font-bold ml-3' variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>
                Leeta Vendor
              </Typography>
            </div>
          )}
        </div>

        <div
          className='sidebarComponent__shrink'
          onClick={() => {
            setShrinked!(!shrinked);
          }}
        >
          <img src={shrink} alt='' className={`chevron ${shrinked && 'chevron-2'}`} />
        </div>
      </div>
      <div className={`sidebarComponent__navbar ${shrinked ? 'shrink' : ''}`}>
        <div className='nav-items-wrapper'>
          <div className='nav-items-con'>
            {SidebarLinkNames.map(({ name, to, icon, active }, idx) => (
              <div key={idx} className='nav-item'>
                <Link to={to}>
                  <NavItem
                    icon={{
                      active: icon[1],
                      default: icon[0],
                    }}
                    setNav={setActiveNav}
                    label={shrinked ? '' : name}
                    active={active}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='nav-items-wrapper'>
          <div className='nav-items-con2'>
            {SidebarLinkNamesBottom.map(({ name, to, icon, active }, idx) => (
              <Link to={to}>
                <NavItem
                  icon={{
                    active: icon[1],
                    default: icon[0],
                  }}
                  setNav={setActiveNav}
                  label={shrinked ? '' : name}
                  active={active}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
