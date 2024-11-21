import React, { FC, useState } from 'react';
import styles from './Settings.module.css';
import { PiUserCircleMinus, PiUserCirclePlus } from 'react-icons/pi';
import { RiEditCircleLine } from 'react-icons/ri';
import Tippy from '@tippyjs/react';
import MainModal from '../../../../components/Modal/MainModal';
import AddEmployees from '../../../../components/Modal/AddEmployees/AddEmployees';
import RemoveEmployee from '../../../../components/Modal/RemoveEmployee/RemoveEmployee';

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
    duration={[500, 200]}
  >
    <button type="button" className={styles.setting_button} onClick={onClick}>
      <Icon size={30} className={styles.icon} />
    </button>
  </Tippy>
);

const Settings: FC = () => {
  const [modalType, setModalType] = useState<'add' | 'remove' | 'edit' | null>(
    null
  );
  const toggleModal = (type: 'add' | 'remove' | 'edit' | null) => {
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
          tooltip="Remove employee"
          onClick={() => toggleModal('remove')}
          Icon={PiUserCircleMinus}
        />
        <TooltipButton
          tooltip="Edit settings"
          onClick={() => console.log('Edit settings clicked')}
          Icon={RiEditCircleLine}
        />
      </div>
      {modalType === 'add' && (
        <MainModal closeModal={() => toggleModal(null)}>
          <AddEmployees onClose={() => toggleModal(null)} />
        </MainModal>
      )}
      {modalType === 'remove' && (
        <MainModal closeModal={() => toggleModal(null)} closeButton>
          <RemoveEmployee />
        </MainModal>
      )}
    </>
  );
};

export default Settings;
