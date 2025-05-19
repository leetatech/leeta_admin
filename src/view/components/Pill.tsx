import React from 'react';

interface Iprops {
  text: string;
}
const Pill = ({ text }: Iprops) => {
  let bgClass = '';
  let textClass = '';

  switch (text) {
    case 'PENDING':
      bgClass = 'bg-yellow-100';
      textClass = 'text-yellow-800';
      break;
    case 'ACCEPTED':
      bgClass = 'bg-blue-100';
      textClass = 'text-blue-800';
      break;
    case 'PROCESSED':
      bgClass = 'bg-purple-100';
      textClass = 'text-purple-800';
      break;
    case 'SHIPPED':
      bgClass = 'bg-green-100';
      textClass = 'text-green-800';
      break;
    case 'CANCELLED':
    case 'REJECTED':
      bgClass = 'bg-red-100';
      textClass = 'text-red-800';
      break;
    case 'COMPLETED':
      bgClass = 'bg-teal-100';
      textClass = 'text-teal-800';
      break;
    default:
      bgClass = 'bg-gray-100';
      textClass = 'text-gray-800';
  }

  return <div className={`${bgClass} ${textClass} px-2 py-1 rounded`}>{text}</div>;
};

export default Pill;
