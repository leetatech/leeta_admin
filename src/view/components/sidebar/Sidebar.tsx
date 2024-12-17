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
// import { RASContext } from '../../../context/Context';
import { useIcons } from '../../../hooks/useIcons';
import { useDispatch, useSelector } from 'react-redux';
// import { authorized } from '../../../utilities/helpers';
// import { SingleLineLoader } from '../../atoms/Loaders/single-line-loader/SingleLineLoader';
import './Sidebar.css';

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
      to: 'dashboard',
      active: location.pathname.includes('dashboard'),
      icon: [home, homei],
    },
    {
      name: 'Orders',
      id: 2,
      nav: 2,
      to: 'orders',
      active: location.pathname.includes('orders'),
      icon: [cart, carti],
    },
    {
      name: 'Settings',
      id: 3,
      nav: 3,
      to: 'settings',
      active: location.pathname.includes('settings'),
      icon: [setting, settingi],
    },
  ];

  const SidebarLinkNamesBottom = [
    {
      name: 'Log Out',
      id: 4,
      nav: 4,
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
              {/* <img src={theme === 'light' ? logoi : logo} alt='logo' className='sidebarComponent__logo' /> */}
              <p className='text-xs-bold ml-2'>Leeta Vendor</p>
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
      <div
        className={`sidebarComponent__navbar ${shrinked ? 'shrink' : ''}`}
        style={{ marginTop: shrinked ? '8rem' : '' }}
      >
        <div className='nav-items-wrapper'>
          <div className='nav-items-con'>
            {SidebarLinkNames.map(({ name, id, to, icon, nav, active }, idx) => (
              <div key={idx} className='nav-item'>
                {/* {shrinked ? } */}
                {/* <Link to={to}>
                  <NavItem
                    // countValue={0}
                    icon={{
                      iconBefore: {
                        active: icon[1],
                        default: icon[0],
                      },
                    }}
                    id={id}
                    nav={activeNav}
                    setNav={setActiveNav}
                    label={shrinked ? '' : name}
                    active={active}
                    onClick={() => closeModal!()}
                    sx={{
                      paddingLeft: shrinked && '0',
                      paddingRight: shrinked && '0',
                      // fontSize: '18px',
                    }}
                    width='100%'
                  />
                </Link> */}
              </div>
            ))}
          </div>
        </div>
        <div className='nav-items-wrapper'>
          <div className='nav-items-con2'>
            {SidebarLinkNamesBottom.map(({ name, id, to, icon, nav, active }, idx) => (
              <div key={idx} className={`nav-item ${id === 11 && 'log-out'}`}>
                <Link to={to} target={id === 10 ? '_blank' : ''}>
                  {/* <NavItem
                    // countValue={0}
                    icon={{
                      iconBefore: {
                        active: icon[1],
                        default: icon[0],
                      },
                    }}
                    id={id}
                    nav={activeNav}
                    setNav={setActiveNav}
                    label={shrinked ? '' : name}
                    active={active}
                    onClick={() => {
                      if (name === 'Log Out') {
                        setShowLogoutModal(true);
                      }
                    }}
                    sx={{
                      paddingLeft: shrinked && '0',
                      paddingRight: shrinked && '0',
                      // fontSize: '18px',
                    }}
                    width='100%'
                  /> */}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
