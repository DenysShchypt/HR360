import React, { FC } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import { MdAppRegistration } from 'react-icons/md';
import styles from './Statistic.module.css';

const Statistic: FC = () => {
  return (
    <div className={styles.statistic_box}>
      <ul className={styles.items_wrap}>
        <li className={styles.item_statistic}>
          <div className={styles.description}>
            <div className={styles.icon_wrap}>
              <AiOutlineUsergroupAdd size={20} className={styles.icon} />
            </div>
            <p className={styles.description_text}>
              <span className={styles.description_text_count}>10 </span> Users
              add last month
            </p>
          </div>
          <div className={styles.total_wrap}>
            <h3 className={styles.total_text}>Total Users</h3>
            <p className={styles.total_count}>151</p>
          </div>
        </li>
        <li className={styles.item_statistic}>
          <div className={styles.description}>
            <div className={styles.icon_wrap}>
              <VscFeedback size={20} className={styles.icon} />
            </div>
            <p className={styles.description_text}>
              <span className={styles.description_text_count}>79 </span>
              Feedbacks add last month
            </p>
          </div>
          <div className={styles.total_wrap}>
            <h3 className={styles.total_text}>Total Feedbacks</h3>
            <p className={styles.total_count}>2896</p>
          </div>
        </li>
        <li className={styles.item_statistic}>
          <div className={styles.description}>
            <div className={styles.icon_wrap}>
              <MdAppRegistration size={20} className={styles.icon} />
            </div>
            <p className={styles.description_text}>
              <span className={styles.description_text_count}>2</span> Features
              add last month
            </p>
          </div>
          <div className={styles.total_wrap}>
            <h3 className={styles.total_text}>Total Features</h3>
            <p className={styles.total_count}>24</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Statistic;
