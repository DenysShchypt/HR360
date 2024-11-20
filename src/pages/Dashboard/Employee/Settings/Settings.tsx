import React, { FC, useState } from 'react';
import styles from './Settings.module.css';
import { PiUserCircleMinus, PiUserCirclePlus } from 'react-icons/pi';
import { RiEditCircleLine } from 'react-icons/ri';
import Tippy from '@tippyjs/react';
import MainModal from '../../../../components/Modal/MainModal';
import AddEmployees from '../../../../components/Modal/AddEmployees/AddEmployees';

const Settings: FC = () => {
  const [isAddModal, setIsAddModal] = useState(false);

  const toggleModal = () => {
    setIsAddModal((prevState) => {
      const nextState = !prevState;
      document.body.style.overflow = nextState ? 'hidden' : '';
      return nextState;
    });
  };
  return (
    <>
      <div className={styles.setting_box}>
        <Tippy
          content="Add a new employee"
          placement="top"
          className={styles.tooltip}
          animation="fade"
          duration={[500, 200]}
        >
          <button
            type="button"
            className={styles.setting_button}
            onClick={() => setIsAddModal(true)}
          >
            <PiUserCirclePlus size={20} className={styles.icon} />
          </button>
        </Tippy>
        <button type="button" className={styles.setting_button}>
          <PiUserCircleMinus size={20} className={styles.icon} />
        </button>
        <button type="button" className={styles.setting_button}>
          <RiEditCircleLine size={20} className={styles.icon} />
        </button>
      </div>
      {isAddModal && (
        <MainModal closeModal={toggleModal}>
          <AddEmployees onClose={toggleModal} />
        </MainModal>
      )}
    </>
  );
};

export default Settings;
