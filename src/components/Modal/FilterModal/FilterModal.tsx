import React, { FC } from 'react';
import styles from './FilterModal.module.css';

interface IFilterModalProps {
  onClose: () => void;
  setSearchParams: (value: string | URLSearchParams) => void;
  status: string[];
  employment: string[];
}

const FilterModal: FC<IFilterModalProps> = ({
  onClose,
  setSearchParams,
  status,
  employment,
}) => {
  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
  };

  const handleCheckboxChangeStatus = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value: string = e.target.value;

    const params = new URLSearchParams(window.location.search);
    if (status.includes(value)) {
      const removeStatuses = status.filter((item) => item !== value);
      params.delete('status');
      removeStatuses.forEach((item) => params.append('status', item));
    } else {
      const addStatuses = [...status, value];
      addStatuses.forEach((item) => params.append('status', item));
    }
    setSearchParams(params.toString());
  };
  const handleCheckboxChangeEmployment = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value: string = e.target.value;

    const params = new URLSearchParams(window.location.search);
    if (employment.includes(value)) {
      const removeStatuses = employment.filter((item) => item !== value);
      params.delete('employment');
      removeStatuses.forEach((item) => params.append('employment', item));
    } else {
      const addStatuses = [...employment, value];
      addStatuses.forEach((item) => params.append('employment', item));
    }

    setSearchParams(params.toString());
  };
  return (
    <form onSubmit={handleFilter} className={styles.filter_wrap}>
      <div className={styles.filter_item}>
        <h3 className={styles.filter_title}>Employment Type</h3>
        <div className={styles.box_checkbox}>
          <label
            className={
              employment.find((checkbox) => checkbox === 'Full-time')
                ? styles.custom_full_checkbox
                : styles.custom_sub_checkbox
            }
          >
            <input
              type="checkbox"
              name="full"
              value="Full-time"
              onChange={handleCheckboxChangeEmployment}
            />
            <p className={styles.text}>Full-Time</p>
          </label>
          <label
            className={
              employment.find((checkbox) => checkbox === 'Part-time')
                ? styles.custom_part_checkbox
                : styles.custom_sub_checkbox
            }
          >
            <input
              type="checkbox"
              name="part"
              value="Part-time"
              onChange={handleCheckboxChangeEmployment}
            />
            <p className={styles.text}>Part-Time</p>
          </label>
          <label
            className={
              employment.find((checkbox) => checkbox === 'Contract')
                ? styles.custom_contract_checkbox
                : styles.custom_sub_checkbox
            }
          >
            <input
              type="checkbox"
              name="contract"
              value="Contract"
              onChange={handleCheckboxChangeEmployment}
            />
            <p className={styles.text}>Contract</p>
          </label>
        </div>
      </div>
      <div className={styles.filter_item}>
        <h3 className={styles.filter_title}>Status</h3>
        <div className={styles.box_checkbox}>
          <label
            className={
              status.find((checkbox) => checkbox === 'Present')
                ? styles.custom_present_checkbox
                : styles.custom_sub_checkbox
            }
          >
            <input
              type="checkbox"
              name="present"
              value="Present"
              onChange={handleCheckboxChangeStatus}
            />
            <p className={styles.text}>Present</p>
          </label>
          <label
            className={
              status.find((checkbox) => checkbox === 'Late')
                ? styles.custom_late_checkbox
                : styles.custom_sub_checkbox
            }
          >
            <input
              type="checkbox"
              name="late"
              value="Late"
              onChange={handleCheckboxChangeStatus}
            />
            <p className={styles.text}>Late</p>
          </label>
          <label
            className={
              status.find((checkbox) => checkbox === 'Absent')
                ? styles.custom_absent_checkbox
                : styles.custom_sub_checkbox
            }
          >
            <input
              type="checkbox"
              name="absent"
              value="Absent"
              onChange={handleCheckboxChangeStatus}
            />
            <p className={styles.text}>Absent</p>
          </label>
        </div>
      </div>
      <button type="submit" className={styles.filter_button}>
        Apply
      </button>
    </form>
  );
};

export default FilterModal;
