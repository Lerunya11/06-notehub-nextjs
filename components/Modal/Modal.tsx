// components/Modal/Modal.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
 
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={event => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
