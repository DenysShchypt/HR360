import React, { FC, useState } from 'react';
import logoUrl from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';
import { RiTeamLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { GoPersonAdd } from 'react-icons/go';
import { BsGraphUp } from 'react-icons/bs';
import { TbCashRegister } from 'react-icons/tb';
import { GrBook } from 'react-icons/gr';
import { GrSchedule } from 'react-icons/gr';
import { TbFileAnalytics } from 'react-icons/tb';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from './Sidebar.module.css';

{
  /* <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={styles.switch_sidebar}
          >
            {isSidebarOpen ? (
              <IoIosArrowBack size={20} />
            ) : (
              <IoIosArrowForward size={15} />
            )}
          </button> */
}
const Sidebar: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsSidebarOpen((prev) => !prev);
  return (
    <>
      <div className={styles.container_sidebar}>
        <div className={styles.logo_wrap}>
          <button onClick={toggleMenu} className={styles.switch_sidebar}>
            {isSidebarOpen ? (
              <IoIosArrowBack size={20} />
            ) : (
              <IoIosArrowForward size={20} />
            )}
          </button>
          <NavLink to="/login" className={styles.logo}>
            {isSidebarOpen && (
              <>
                <img src={logoUrl} alt="Logo" width="40" height="40" />
                <span className={styles.logo_text}>HR.24/7</span>
              </>
            )}
          </NavLink>
        </div>
        <aside>
          <nav>
            <ul className={styles.list_wrap}>
              <li className={styles.list_item}>
                <NavLink to="/" className={styles.nav_item}>
                  <RxDashboard size={20} />
                  {isSidebarOpen && 'Dashboard'}
                </NavLink>
              </li>
              <li className={styles.list_item}>
                <NavLink to="/" className={styles.nav_item}>
                  <RiTeamLine size={20} className={styles.icon} />
                  {isSidebarOpen && 'Employee'}
                </NavLink>
              </li>
              <li className={styles.list_item}>
                <NavLink to="/" className={styles.nav_item}>
                  <GoPersonAdd size={20} />
                  {isSidebarOpen && 'Recruitment'}
                </NavLink>
              </li>
              <li className={styles.list_item}>
                <NavLink to="/" className={styles.nav_item}>
                  <BsGraphUp size={20} />
                  {isSidebarOpen && 'Performance M'}
                </NavLink>
              </li>
              <li className={styles.list_item}>
                <NavLink to="/" className={styles.nav_item}>
                  <TbCashRegister size={20} />
                  {isSidebarOpen && 'Payroll'}
                </NavLink>
              </li>
              <li className={styles.list_item}>
                <NavLink to="/" className={styles.nav_item}>
                  <GrBook size={20} />
                  {isSidebarOpen && 'Training and Develop'}
                </NavLink>
              </li>
              <li className={styles.list_item}>
                <NavLink to="/" className={styles.nav_item}>
                  <GrSchedule size={20} />
                  {isSidebarOpen && 'Schedule'}
                </NavLink>
              </li>
              <li className={styles.list_item}>
                <NavLink to="/" className={styles.nav_item}>
                  <TbFileAnalytics size={20} />
                  {isSidebarOpen && 'Reports and Analytics'}
                </NavLink>
              </li>
              <li className={styles.list_item}>
                <NavLink to="/" className={styles.nav_item}>
                  <AiOutlineExclamationCircle size={20} />
                  {isSidebarOpen && 'Help'}
                </NavLink>
              </li>
              <li className={styles.list_item}>
                <NavLink to="/" className={styles.nav_item}>
                  <TbLogout size={20} />
                  {isSidebarOpen && 'Logout'}
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
};
export default Sidebar;
