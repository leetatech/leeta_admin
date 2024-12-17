/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { useIcons } from '../../../hooks/useIcons';

import { type RootState } from '../../../state';

import './Header.css';
// interface IProps {
//   burgerClick: () => void;
// }

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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch<any>();
  const [searchTerm, setSearchTerm] = useState('');
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
      <div className={`header-content sidebar-bg  ${shrinked ? 'expand' : ''}`}>
        {/* <div className='left-hand'>
          <div className='menu-box burger-icon-color' onClick={burgerClick}>
            <img src={menu} alt='menu' />
          </div>
          <div className='head-tag'>
            <Typography>{headTag}</Typography>
          </div>
        </div> */}

        <div className='user-utils'></div>
      </div>
    </>
  );
}
