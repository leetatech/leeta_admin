import React, { useState } from 'react';
import { TypographyVariant } from '../types';
import Typography from '../Typography/Typography';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '';

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-container bg-white shadow-md rounded-lg py-6 px-10 md:py-16 md:px-24">
      <form className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#98A2B3] pb-1"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full mt-1 py-5 px-2 border border-[#D0D5DD] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D0D5DD] text-[#98A2B3]"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#98A2B3] pb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full mt-1 py-5 px-2 border border-[#D0D5DD] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D0D5DD] text-[#98A2B3]"
            required
          />
          <Typography
            variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
            className="text-orange-600 cursor-pointer"
          >
            I forgot my password
          </Typography>
        </div>
        <button
          type="submit"
          className={`w-full py-4 px-2 rounded-lg ${
            isFormValid
              ? 'bg-[#FD671E] text-white hover:bg-[#FD671E] focus:outline-none focus:ring-2 focus:ring-[#FD671E]'
              : 'bg-[#FD671E] text-white opacity-50 cursor-not-allowed'
          }`}
          onClick={() => navigate('app/dashboard')}
          disabled={!isFormValid}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
