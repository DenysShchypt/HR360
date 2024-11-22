import React, { FC, useState } from 'react';
import styles from './Settings.module.css';
import { PiUserCircleMinus, PiUserCirclePlus } from 'react-icons/pi';
import Tippy from '@tippyjs/react';
import MainModal from '../../../../components/Modal/MainModal';
import AddEditEmployees from '../../../../components/Modal/AddEditEmployees/AddEditEmployees';
import RemoveEditEmployee from '../../../../components/Modal/RemoveEditEmployee/RemoveEditEmployee';
import { LiaUserEditSolid } from 'react-icons/lia';

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
          onClick={() => toggleModal('edit')}
          Icon={LiaUserEditSolid}
        />
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
