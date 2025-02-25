import React, { useState, useEffect } from 'react';
import { useIcons } from '../../../hooks/useIcons';
import './Header.css';
import Typography from '../Typography/Typography';
import { TypographyVariant } from '../types';
import { RxAvatar } from "react-icons/rx";


interface IFilter {
  title: string;
  value: string;
  link: string;
  icon: string;
  color?: string;
  font: string;
  invert?: boolean;
}

interface IProps {
  shrinked: boolean;
  setShrinked: (v: boolean) => void;
  burgerClick: () => void;
  headTag: string;
}

export default function Header({ shrinked, setShrinked}: IProps) {
  const { shrink } = useIcons();

  const [dropValue] = useState<IFilter>({
    title: '',
    value: '',
    link: '',
    icon: '',
    font: '',
  });
  // const { isMobile } = useWindowSize();

  // const headData = [];

  useEffect(() => {}, [dropValue]);

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  return (
    <>
    <div className={`header-content ${shrinked ? 'expand' : ''}`}>
  {shrinked && (
    <div className="h-6 w-6" onClick={() => setShrinked(false)}>
      <img className="w-full h-full object-cover" src={shrink} alt="icon" />
    </div>
  )}
  <div className=" flex justify-end items-end  w-full ">
    <div className='flex justify-center items-center gap-2 cursor-pointer'>

    <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>Hi, Oluwaferanmi</Typography>
    <RxAvatar />


    </div>
  </div>
</div>

    </>
  );
}
