import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../../utils/hooks/hooks';
import { selectActivities } from '../../redux/slices/employees/employees.selectors';
import styles from './ActivityChat.module.css';
import { IActivity } from '../../common/types/activity';

const ActivityChat: FC = () => {
  const activities: IActivity[] = useAppSelector(selectActivities);
  useEffect(() => {}, [activities]);

  return (
    <div className={styles.activity_wrap}>
      <h3 className={styles.activity_title}>Activities</h3>
      <ul className={styles.chat_wrap}>
        {activities.map((activity) => (
          <li key={activity.id} className={styles.event_wrap}>
            <div className={styles.event}>
              <p className={styles.event_user}>
                {activity.author}{' '}
                <span className={styles.event_text}>{activity.event}</span>{' '}
                {activity.nameEmployee}
              </p>
            </div>
            <p className={styles.event_text}>{activity.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityChat;
