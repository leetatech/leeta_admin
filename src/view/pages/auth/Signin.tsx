/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable import/no-duplicates */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../../state';

import './Signin.css';

const SignIn = (props: any) => {
  const { auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<any>();

  const handleChange = (e: any): void => {
    const { name, value } = e;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  useEffect(() => {}, []);

  return <div>Login</div>;
};

export default SignIn;
