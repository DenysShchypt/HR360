import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  IoMailOutline,
  IoNotificationsOutline,
  IoSunnyOutline,
} from 'react-icons/io5';
import {
  IoIosArrowDown,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowUp,
} from 'react-icons/io';
import { CiSettings } from 'react-icons/ci';
import logoUrl from '../../assets/logo.svg';
import styles from './Header.module.css';
import Sidebar from '../Sidebar/Sidebar';
import DropdownUserMenu from '../DropdownUserMenu/DropdownUserMenu';
import { useAppSelector } from '../../utils/hooks/hooks';
import { selectUserPhoto } from '../../redux/slices/auth/auth.selectors';

const Header: FC = () => {
  const userName = useAppSelector((state) => state.auth.user?.username);
  const userPhotoUrl = useAppSelector(selectUserPhoto);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [dropdownUserMenu, setDropdownUserMenu] = useState<boolean | null>(
    null
  );

  const toggleSideBar = () => setIsSidebarOpen((prev) => !prev);

  const onUserButtonChange = (e) => {
    e.stopPropagation();
    setDropdownUserMenu((prev) => !prev);
  };

  return (
    <header className={styles.container_header}>
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className={styles.logo_wrap}>
        <button
          type="button"
          onClick={toggleSideBar}
          className={styles.switch_sidebar}
        >
          {isSidebarOpen ? (
            <IoIosArrowBack
              size={20}
              className={`${styles.arrow} ${styles.arrow_close}`}
            />
          ) : (
            <IoIosArrowForward
              size={20}
              className={`${styles.arrow} ${styles.arrow_open}`}
            />
          )}
        </button>
        <NavLink to="/" className={styles.logo}>
          <img src={logoUrl} alt="Logo" width="40" height="40" />
          <span className={styles.logo_text}>HR.24/7</span>
        </NavLink>
      </div>
      <div className={styles.settings_wrap}>
        <div className={styles.greed_wrap}>
          {userName ? (
            <p className={styles.greed}>
              Welcome back, <span className={styles.name}>{userName}</span>
            </p>
          ) : (
            <p className={styles.greed}>Welcome to our application</p>
          )}
          <IoSunnyOutline />
        </div>
        <div className={styles.info_user_wrap}>
          <ul className={styles.user_notifications_wrap}>
            <li>
              <button type="button" className={styles.notifications_item}>
                <CiSettings size={24} className={styles.notifications_icon} />
              </button>
            </li>
            <li>
              <button type="button" className={styles.notifications_item}>
                <IoMailOutline
                  size={24}
                  className={styles.notifications_icon}
                />
              </button>
            </li>
            <li>
              <button type="button" className={styles.notifications_item}>
                <IoNotificationsOutline
                  size={24}
                  className={styles.notifications_icon}
                />
              </button>
            </li>
          </ul>
          <div className={styles.setting_user_wrap}>
            <img
              src={
                userPhotoUrl
                  ? `${userPhotoUrl}`
                  : 'https://i.pravatar.cc/150?img=50'
              }
              alt="user-avatar"
              width="40"
              height="40"
              className={styles.avatar_user}
            />
            <div className={styles.setting_arrow_wrap}>
              <button
                type="button"
                className={styles.setting_arrow}
                onClick={(e) => onUserButtonChange(e)}
              >
                {!dropdownUserMenu ? (
                  <IoIosArrowDown size={16} className={styles.icon_arrow} />
                ) : (
                  <IoIosArrowUp size={16} className={styles.icon_arrow} />
                )}
              </button>
              {dropdownUserMenu && (
                <DropdownUserMenu onClose={() => setDropdownUserMenu(null)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
