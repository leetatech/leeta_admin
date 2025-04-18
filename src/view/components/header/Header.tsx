import React, { useState, useEffect } from 'react';
import { useIcons } from '../../../hooks/useIcons';
import './Header.css';
import Typography from '../Typography/Typography';
import { TypographyVariant } from '../types';
import { RxAvatar } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state';
import SkimmerLoader from '../SkimmerBar';

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
}

export default function Header({ shrinked, setShrinked }: IProps) {
  const { userInfo, loading } = useSelector((state: RootState) => state.user);

  const name = `${userInfo?.first_name} ${userInfo.last_name}`;

  const { shrink } = useIcons();

  const [dropValue] = useState<IFilter>({
    title: '',
    value: '',
    link: '',
    icon: '',
    font: '',
  });

  useEffect(() => {}, [dropValue]);

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  return (
    <>
      <div className={`header-content ${shrinked ? 'expand' : ''}`}>
        {shrinked && (
          <div className='h-6 w-6' onClick={() => setShrinked(false)}>
            <img className='w-full h-full object-cover' src={shrink} alt='icon' />
          </div>
        )}
        <div className='flex justify-end items-end w-full'>
          <div className='flex justify-center items-center gap-2 cursor-pointer w-[20%]'>
            {loading ? <SkimmerLoader /> : <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>Hi, {name}</Typography>}
            <RxAvatar />
          </div>
        </div>
      </div>
    </>
  );
}
