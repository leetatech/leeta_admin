import React from 'react';

export default function Loader({ width = '50px', height = '50px' }) {
  return <div className='animate-spin rounded-full border-4 border-gray-300 border-t-blue-500' style={{ width, height }} />;
}
