import React, { FC, useEffect, useState } from 'react';
import { datePart, timePart } from '../../utils/helpers/time';
import styles from './Time.module.css';

const Time: FC = () => {
  const [time, setTime] = useState(timePart);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(timePart);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.time_wrap}>
      <p className={styles.time}>{datePart}</p>
      <p className={styles.time}>{time}</p>
    </div>
  );
};

export default Time;
