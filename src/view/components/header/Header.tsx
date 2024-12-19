import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { useIcons } from '../../../hooks/useIcons';

import { type RootState } from '../../../state';
import './Header.css';

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

export default function Header({ shrinked, setShrinked, burgerClick, headTag }: IProps) {
  const { logo, shrink } = useIcons();
  const { auth } = useSelector((state: RootState) => state);

  const [dropValue, setDropValue] = useState<IFilter>({
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
          <div className='h-6 w-6' onClick={() => setShrinked(false)}>
            <img className='w-full h-full object-cover' src={shrink} alt='icon' />
          </div>
        )}
        <div className='user-utils'></div>
      </div>
    </>
  );
}
