import React, { FC } from 'react';
import { datePart, timePart } from '../../utils/helpers/time';
import styles from './Time.module.css';

const Time: FC = () => {
  return (
    <div className={styles.time_wrap}>
      <p className={styles.time}>{datePart}</p>
      <p className={styles.time}>{timePart}</p>
    </div>
  );
};

export default Time;
