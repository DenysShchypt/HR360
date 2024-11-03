import React, { FC, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsGrid, BsGraphUp } from 'react-icons/bs';
import { GoPersonAdd } from 'react-icons/go';
import {
  RiMoneyDollarBoxLine,
  RiCalendarScheduleLine,
  RiLogoutBoxLine,
  RiTeamLine,
} from 'react-icons/ri';
import { GiBookmark } from 'react-icons/gi';
import { SiSimpleanalytics } from 'react-icons/si';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import styles from './Sidebar.module.css';
import { useAppDispatch } from '../../utils/hooks/hooks';
import { logout } from '../../redux/slices/auth/auth.thunks';

interface ISidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: FC<ISidebarProps> = ({ isSidebarOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});
  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <div
      className={`${styles.container_sidebar} ${isSidebarOpen ? styles.open : ''}`}
    >
      <aside>
        <nav className={styles.nav}>
          <ul className={styles.list_wrap}>
            <li className={styles.list_item}>
              <NavLink to="/dashboard" className={styles.nav_item}>
                <BsGrid size={20} className={styles.icon} />
                {isSidebarOpen && 'Dashboard'}
              </NavLink>
            </li>
            <li className={styles.list_item}>
              <button
                type="button"
                className={styles.nav_item}
                onClick={() => toggleGroup('employee')}
              >
                <RiTeamLine size={20} className={styles.icon} />
                {isSidebarOpen && <p className={styles.title_item}>Employee</p>}
                {!openGroups['employee'] ? (
                  <IoIosArrowDown size={16} className={styles.icon} />
                ) : (
                  <IoIosArrowUp size={16} className={styles.icon} />
                )}
              </button>
              {openGroups['employee'] && (
                <ul className={styles.list_sub_items}>
                  <li className={styles.sub_item}>
                    <NavLink to="/dashboard/employee/directory">
                      Employee directory
                    </NavLink>
                  </li>
                  <li className={styles.sub_item}>
                    <NavLink to="/dashboard/employee/attendance">
                      Attendance
                    </NavLink>
                  </li>
                  <li className={styles.sub_item}>
                    <NavLink to="/dashboard/employee/requests">
                      Leave requests
                    </NavLink>
                  </li>
                  <li className={styles.sub_item}>
                    <NavLink to="/dashboard/employee/absence">
                      Absence Trends
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className={styles.list_item}>
              <button
                type="button"
                className={styles.nav_item}
                onClick={() => toggleGroup('recruitment')}
              >
                <GoPersonAdd size={20} className={styles.icon} />
                {isSidebarOpen && (
                  <p className={styles.title_item}>Recruitment</p>
                )}
                {!openGroups['recruitment'] ? (
                  <IoIosArrowDown size={16} className={styles.icon} />
                ) : (
                  <IoIosArrowUp size={16} className={styles.icon} />
                )}
              </button>
              {openGroups['recruitment'] && (
                <ul className={styles.list_sub_items}>
                  <li className={styles.sub_item}>
                    <NavLink to="/">Employee directory</NavLink>
                  </li>
                  <li className={styles.sub_item}>
                    <NavLink to="/">Attendance</NavLink>
                  </li>
                  <li className={styles.sub_item}>
                    <NavLink to="/">Leave requests</NavLink>
                  </li>
                  <li className={styles.sub_item}>
                    <NavLink to="/">Absence Trends</NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className={styles.list_item}>
              <NavLink to="/" className={styles.nav_item}>
                <BsGraphUp size={20} className={styles.icon} />
                {isSidebarOpen && 'Performance M'}
              </NavLink>
            </li>
            <li className={styles.list_item}>
              <NavLink to="/" className={styles.nav_item}>
                <RiMoneyDollarBoxLine size={20} className={styles.icon} />
                {isSidebarOpen && 'Payroll'}
              </NavLink>
            </li>
            <li className={styles.list_item}>
              <NavLink to="/" className={styles.nav_item}>
                <GiBookmark size={20} className={styles.icon} />
                {isSidebarOpen && 'Training and Develop'}
              </NavLink>
            </li>
            <li className={styles.list_item}>
              <NavLink to="/" className={styles.nav_item}>
                <RiCalendarScheduleLine size={20} className={styles.icon} />
                {isSidebarOpen && 'Schedule'}
              </NavLink>
            </li>
            <li className={styles.list_item}>
              <NavLink to="/" className={styles.nav_item}>
                <SiSimpleanalytics size={20} className={styles.icon} />
                {isSidebarOpen && 'Reports and Analytics'}
              </NavLink>
            </li>
          </ul>
          <ul className={styles.list_wrap}>
            <li>
              <NavLink to="/" className={styles.nav_item}>
                <AiOutlineExclamationCircle size={20} className={styles.icon} />
                {isSidebarOpen && 'Help'}
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  dispatch(logout());
                  navigate('/');
                }}
                className={styles.nav_item_logout}
              >
                <RiLogoutBoxLine size={20} className={styles.icon} />
                {isSidebarOpen && 'Logout'}
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};
export default Sidebar;
