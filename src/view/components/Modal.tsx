import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
//   onClose: () => void;
  children: ReactNode; // Typing for the children prop
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed w-full h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      {children}
    </div>
  );
};

export default Modal;
