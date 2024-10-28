import React, { FC } from 'react';
import styles from './DropdownUserMenu.module.css';
import { useNavigate } from 'react-router-dom';

interface IDropdownUserMenu {
  onClose: () => void;
}

const DropdownUserMenu: FC<IDropdownUserMenu> = ({ onClose }) => {
  const navigate = useNavigate();
  const onBackdropClick = (e) => {
    console.log(e.target);
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return (
    <>
      <ul className={styles.setting_arrow}>
        <li>
          <button
            type="button"
            className={styles.user_chose}
            onClick={() => {
              navigate('/register');
              onClose();
            }}
          >
            Profile
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.user_chose}
            onClick={() => navigate('/')}
          >
            Edit
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.user_chose}
            onClick={() => navigate('/')}
          >
            Settings
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.user_chose}
            onClick={() => navigate('/')}
          >
            Logout
          </button>
        </li>
      </ul>
      <div onClick={onBackdropClick}></div>
    </>
  );
};

export default DropdownUserMenu;
