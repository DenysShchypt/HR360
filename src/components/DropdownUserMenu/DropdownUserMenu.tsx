import React, { FC, useEffect, useRef } from 'react';
import styles from './DropdownUserMenu.module.css';
import { useNavigate } from 'react-router-dom';

interface IDropdownUserMenu {
  onClose: () => void;
}

const DropdownUserMenu: FC<IDropdownUserMenu> = ({ onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={menuRef} className={styles.dropdown_menu_wrap}>
      <ul className={styles.setting_arrow}>
        <li>
          <button
            type="button"
            className={styles.user_chose}
            onClick={() => {
              navigate('/');
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
    </div>
  );
};

export default DropdownUserMenu;
