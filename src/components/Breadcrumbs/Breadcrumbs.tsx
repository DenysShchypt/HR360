import React, { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';
import Time from '../Time/Time';

const Breadcrumbs: FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
  const firstSegment = pathnames[0];

  return (
    <div className={styles.nav_box}>
      <nav aria-label="breadcrumb" className={styles.nav_wrap}>
        <h3 className={styles.page_path}>
          {firstSegment
            ? firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1)
            : 'Default Label'}
        </h3>
        <ul className={styles.nav_items}>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return (
              <li key={to}>
                {!isLast && index !== 1 ? (
                  <Link
                    to={to}
                    style={{ textDecoration: 'none', color: '#534feb' }}
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Link>
                ) : (
                  <span className={styles.current_path}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                )}
                {!isLast && <span className={styles.dot}></span>}
              </li>
            );
          })}
        </ul>
      </nav>
      <Time />
    </div>
  );
};

export default Breadcrumbs;
