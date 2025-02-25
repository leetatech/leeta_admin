import { useEffect, useState } from 'react';
import { TypographyVariant } from '../types';
import Typography from '../Typography/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../state';
import { resetState, triggerSignin } from '../../../features/auth/auth_slice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const { error, userData, message, loading } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '';
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLogin = (e: any) => {
    e.preventDefault();
    const payload = {
      email: formData.email.trim(),
      password: formData.password.trim(),
      user_type: 'admin',
    };
    dispatch(triggerSignin(payload));
  };

  useEffect(() => {
    if (!error && Object.keys(userData).length > 0) {
      toast.success(`Login successfull`);
      setTimeout(() => {
        navigate('app/dashboard');
      }, 2000);
    } else if (error && message) {
      toast.error(`${message}`);
    }
    dispatch(resetState());
  }, [error, userData, message, loading, navigate, dispatch]);

  return (
    <div className='form-container bg-white shadow-md rounded-lg py-6 px-10 lg:py-16 lg:px-24'>
      <ToastContainer />
      <form className='space-y-4' onSubmit={handleLogin}>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-[#98A2B3] pb-1'>
            Email address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className='w-full mt-1 py-5 px-2 border border-[#D0D5DD] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D0D5DD] text-[#98A2B3]'
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='block text-sm font-medium text-[#98A2B3] pb-1'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            className='w-full mt-1 py-5 px-2 border border-[#D0D5DD] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D0D5DD] text-[#98A2B3]'
            required
          />
          <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM} className='text-orange-600 cursor-pointer'>
            I forgot my password
          </Typography>
        </div>
        <button
          type='submit'
          className={`w-full py-4 px-2 rounded-lg ${
            isFormValid ? 'bg-[#FD671E] text-white hover:bg-[#FD671E] focus:outline-none focus:ring-2 focus:ring-[#FD671E]' : 'bg-[#FD671E] text-white opacity-50 cursor-not-allowed'
          }`}
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <span className='flex items-center justify-center gap-2'>
              <svg className='animate-spin h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 12h2zm2 5.291A7.963 7.963 0 014 12H2c0 2.837 1.163 5.387 3.05 7.21l1.95-1.92z'></path>
              </svg>
            </span>
          ) : (
            'Log In'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
