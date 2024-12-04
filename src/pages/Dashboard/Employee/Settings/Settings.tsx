import React, { FC, useState } from 'react';
import styles from './Settings.module.css';
import { PiUserCircleMinus, PiUserCirclePlus } from 'react-icons/pi';
import Tippy from '@tippyjs/react';
import MainModal from '../../../../components/Modal/MainModal';
import AddEditEmployees from '../../../../components/Modal/AddEditEmployees/AddEditEmployees';
import RemoveEditEmployee from '../../../../components/Modal/RemoveEditEmployee/RemoveEditEmployee';
import ActivityChat from '../../../../components/ActivityChat/ActivityChat';

interface ITooltipButtonProps {
  tooltip: string;
  onClick: () => void;
  Icon: FC<{ size: number; className?: string }>;
}

const TooltipButton: FC<ITooltipButtonProps> = ({ tooltip, onClick, Icon }) => (
  <Tippy
    content={tooltip}
    placement="top"
    className={styles.tooltip}
    animation="fade"
  >
    <button type="button" className={styles.setting_button} onClick={onClick}>
      <Icon size={30} className={styles.icon} />
      <span className={styles.text_button}>
        {tooltip === 'Add a new employee'
          ? 'New employee'
          : 'Edit/remove employee'}
      </span>
    </button>
  </Tippy>
);

const Settings: FC = () => {
  const [modalType, setModalType] = useState<'add' | 'remove' | null>(null);
  const toggleModal = (type: 'add' | 'remove' | null) => {
    setModalType(type);
    document.body.style.overflow = type ? 'hidden' : '';
  };

  return (
    <>
      <div className={styles.setting_box}>
        <TooltipButton
          tooltip="Add a new employee"
          onClick={() => toggleModal('add')}
          Icon={PiUserCirclePlus}
        />
        <TooltipButton
          tooltip="Modify or remove the employees"
          onClick={() => toggleModal('remove')}
          Icon={PiUserCircleMinus}
        />
      </div>
      <div className="">
        <ActivityChat />
      </div>
      {modalType === 'add' && (
        <MainModal closeModal={() => toggleModal(null)}>
          <AddEditEmployees onClose={() => toggleModal(null)} />
        </MainModal>
      )}
      {modalType === 'remove' && (
        <MainModal closeModal={() => toggleModal(null)} closeButton>
          <RemoveEditEmployee />
        </MainModal>
      )}
    </>
  );
};

export default Settings;
