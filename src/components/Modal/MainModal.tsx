import React, { FC, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { BsXLg } from 'react-icons/bs'; // Assuming this is the correct icon
import styles from './MainModal.module.css'; // Assuming this is the CSS module for styles

interface IMainModalProps {
  closeModal: () => void;
  children: React.ReactNode;
  closeButton: boolean;
  fullScreen: boolean;
}

const modalRoot = document.querySelector('#modal-root');

const MainModal: FC<IMainModalProps> = ({
  closeModal,
  children,
  closeButton,
  fullScreen,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  if (!modalRoot) return null;

  return createPortal(
    <div className={styles.overlay} onMouseDown={handleBackdropClick}>
      <div
        className={`${fullScreen ? styles.fullscreen_modal : styles.main_modal}`}
      >
        {closeButton && (
          <button className={styles.close_btn} onClick={closeModal}>
            <BsXLg size="100%" />
          </button>
        )}
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default MainModal;
