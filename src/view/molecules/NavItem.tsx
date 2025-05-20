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
    <div className={`flex gap-4 items-center p-3 pl-5 rounded ${active && 'bg-[#F0F6FF]'}`}>
      {/* <div className='w-4'> */}
      <img src={active ? icon.active : icon.default} alt='icon' />
      {/* </div> */}
      <Typography className={`${active ? 'text-[#141388]' : 'text-black'}`} variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>
        {label}
      </Typography>
    </div>
  );
};

export default NavItem;
