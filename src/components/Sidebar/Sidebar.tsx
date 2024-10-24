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
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from './Sidebar.module.css';

const Sidebar: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <>
      <div className={`container ${styles.container_sidebar}`}>
        <div
          className={styles.logo_wrap}
          onClick={(e) => {
            e.stopPropagation(); // Prevent other handlers from interfering
            toggleSidebar();
          }}
        >
          {isSidebarOpen ? (
            <NavLink to="/" className={styles.logo}>
              <img src={logoUrl} alt="Logo" width="40" height="40" />
              <span className={styles.logo_text}>HR.24/7</span>
            </NavLink>
          ) : (
            <NavLink to="/">
              <img src={logoUrl} alt="Logo" width="20" height="20" />
            </NavLink>
          )}

          {/* <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={styles.switch_sidebar}
          >
            {isSidebarOpen ? (
              <IoIosArrowBack size={20} />
            ) : (
              <IoIosArrowForward size={15} />
            )}
          </button> */}
        </div>

        {isSidebarOpen ? (
          <aside className={isSidebarOpen ? 'open' : 'closed'}>
            <nav>
              <ul>
                <li>
                  <NavLink to="/">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/">Employee</NavLink>
                </li>
                <li>
                  <NavLink to="/">Recruitment</NavLink>
                </li>
                <li>
                  <NavLink to="/">Performance M</NavLink>
                </li>
                <li>
                  <NavLink to="/">Payroll</NavLink>
                </li>
                <li>
                  <NavLink to="/">Training and Develop</NavLink>
                </li>
                <li>
                  <NavLink to="/">Schedule</NavLink>
                </li>
                <li>
                  <NavLink to="/">Reports and Analytics</NavLink>
                </li>
                <li>
                  <NavLink to="/">Logout</NavLink>
                </li>
              </ul>
            </nav>
          </aside>
        ) : (
          <aside className="">
            <nav>
              <ul>
                <li>
                  <NavLink to="/">
                    <RxDashboard />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <RiTeamLine />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <GoPersonAdd />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <BsGraphUp />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <TbCashRegister />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <GrBook />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <GrSchedule />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <TbFileAnalytics />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <AiOutlineExclamationCircle />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <TbLogout />
                  </NavLink>
                </li>
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </>
  );
};
export default Sidebar;
