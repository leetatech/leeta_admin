import React from 'react';
import Typography from '../components/Typography/Typography';
import { TypographyVariant } from '../components/types';

interface INav {
  icon: { active: string; default: string };
//   id: number;
//   nav: number;
  setNav: (nav: number) => void;
  label: string;
  active: boolean;
}

const NavItem = ({ icon, setNav, label, active }: INav) => {
  return (
    <div className={`flex gap-4 items-center p-2 rounded ${active && 'bg-[#141388]'}`}>
      {/* <div className='w-4'> */}
      <img src={active ? icon.active : icon.default} alt='icon' />
      {/* </div> */}
      <Typography className={`${active ? 'text-white' : 'text-black'}`} variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>
        {label}
      </Typography>
    </div>
  );
};

export default NavItem;
