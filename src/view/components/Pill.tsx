import React from 'react';

interface Iprops {
  text: string;
}
const Pill = ({ text }: Iprops) => {

  const style = text === 'PENDING' ? '[#FD671E]' : text === 'CANCELLED' || text === 'REJECTED' ? '[#DC0121]' : '[#3EAF3F]';
  return <div className={`bg-${style} text-white px-1 py-0`}>{text}</div>;
};

export default Pill;
