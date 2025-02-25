import React from 'react';

interface Iprops {
  color?: string;
}

export const Spinner = ({ color }: Iprops) => (
  <span className='flex items-center justify-center gap-2'>
    <svg className={`animate-spin h-5 w-5 text-${color ? color : 'white'}`} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 12h2zm2 5.291A7.963 7.963 0 014 12H2c0 2.837 1.163 5.387 3.05 7.21l1.95-1.92z'></path>
    </svg>
  </span>
);
