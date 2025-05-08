import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavItem from '../../molecules/NavItem';
import { useIcons } from '../../../hooks/useIcons';
import Typography from '../Typography/Typography';
import { TypographyVariant } from '../types';
import './Sidebar.css';

interface IProps {
  shrinked?: boolean;
  setShrinked?: (v: boolean) => void;
  removeShrink?: boolean;
  closeModal?: () => void;
  setHeadTag: (v: string) => void;
  setShowLogoutModal: (v: boolean) => void;
  showLogoutModal: boolean;
}

const Sidebar = ({ shrinked, setShrinked }: IProps) => {
  const { shrink, logo, home, homei, cart, carti, setting, settingi, logout } = useIcons();

  const location = useLocation();
  // Only the setter is needed for this case
  const [, setActiveNav] = useState(1);
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
      name: 'Demo',
      to: '/app/demo',
      active: location.pathname.includes('demo'),
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
        <Link to="/app/dashboard" className="logo-wrapper display-f align-center">
          {shrinked ? (
              <div className="logo-img-con logo-con">
                <img src={logo} alt="symbol" />
              </div>
          ) : (
              <div className="logo-img-con full-logo-con">
                <img src={logo} alt="symbol" />
                <Typography className="font-bold ml-3" variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>
                  Leeta Vendor
                </Typography>
              </div>
          )}
        </Link>

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
            {SidebarLinkNamesBottom.map(({ name, to, icon, active},idx ) => (
              <Link to={to} key={idx}>
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
