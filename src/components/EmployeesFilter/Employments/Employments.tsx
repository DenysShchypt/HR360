import React, { FC } from 'react';
import styles from './Employments.module.css';

interface IEmploymentsProps {
  employment: string;
  handleEmploymentTime: (string) => void;
}

const Employments: FC<IEmploymentsProps> = ({
  employment,
  handleEmploymentTime,
}) => {
  const employments = ['Full-time', 'Part-time', 'Contract'];
  return (
    <div className={styles.employment_wrap}>
      <h3 className={styles.employment_title}>Employment Type</h3>
      <div className={styles.box_radio}>
        {employments.map((type) => (
          <label
            key={type}
            className={
              employment === 'Contract' && type === 'Contract'
                ? styles.custom_contract_radio
                : employment === 'Part-time' && type === 'Part-time'
                  ? styles.custom_part_radio
                  : employment === 'Full-time' && type === 'Full-time'
                    ? styles.custom_full_radio
                    : styles.custom_sub_radio
            }
          >
            <input
              type="radio"
              name="employment"
              value={type}
              style={{ display: 'none' }}
              onChange={handleEmploymentTime}
            />
            <p className={styles.text}>{type}</p>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Employments;
