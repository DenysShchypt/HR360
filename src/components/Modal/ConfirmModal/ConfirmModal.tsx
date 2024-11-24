import React, { FC } from 'react';
import styles from './ConfirmModal.module.css';
interface IConfirmModalProps {
  onClose: () => void;
  handleEvent: () => void;
}

const ConfirmModal: FC<IConfirmModalProps> = ({ onClose, handleEvent }) => {
  return (
    <div className={styles.wrap}>
      <h4 className={styles.text}>Are you sure?</h4>
      <div className={styles.button_box}>
        <button className={styles.chose_button} type="button" onClick={onClose}>
          No
        </button>
        <button
          className={styles.chose_button}
          type="button"
          onClick={handleEvent}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
