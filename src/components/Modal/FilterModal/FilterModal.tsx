import React, { FC } from 'react';
import styles from './FilterModal.module.css';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/hooks';
import { selectFilter } from '../../../redux/slices/employees/employees.selectors';
import { statusFilter } from '../../../redux/slices/employees/filter/filter.slice';

interface IFilterModalProps {
  onClose: () => void;
}

const FilterModal: FC<IFilterModalProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const chosenCheckboxes = useAppSelector(selectFilter);
  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const form = e.currentTarget;
    // const formData = new FormData(form);

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    onClose();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    if (chosenCheckboxes.includes(value)) {
      const removeCheckbox = chosenCheckboxes.filter((item) => item !== value);
      dispatch(statusFilter(removeCheckbox));
    } else {
      dispatch(statusFilter([...chosenCheckboxes, value]));
    }
  };
  return (
    <form onSubmit={handleFilter} className={styles.filter_wrap}>
      <div className={styles.filter_item}>
        <h3 className={styles.filter_title}>Employment Type</h3>
        <div className={styles.box_checkbox}>
          <label
            className={
              chosenCheckboxes.find((checkbox) => checkbox === 'Full-time')
                ? styles.custom_full_checkbox
                : styles.custom_sub_checkbox
            }
          >
            <input
              type="checkbox"
              name="full"
              value="Full-time"
              onChange={handleCheckboxChange}
            />
            <p className={styles.text}>Full-Time</p>
          </label>
          <label
            className={
              chosenCheckboxes.find((checkbox) => checkbox === 'Part-time')
                ? styles.custom_part_checkbox
                : styles.custom_sub_checkbox
            }
          >
            <input
              type="checkbox"
              name="part"
              value="Part-time"
              onChange={handleCheckboxChange}
            />
            <p className={styles.text}>Part-Time</p>
          </label>
          <label
            className={
              chosenCheckboxes.find((checkbox) => checkbox === 'Contract')
                ? styles.custom_contract_checkbox
                : styles.custom_sub_checkbox
            }
          >
            <input
              type="checkbox"
              name="contract"
              value="Contract"
              onChange={handleCheckboxChange}
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
              chosenCheckboxes.find((checkbox) => checkbox === 'Present')
                ? styles.custom_present_checkbox
                : styles.custom_sub_checkbox
            }
          >
            <input
              type="checkbox"
              name="present"
              value="Present"
              onChange={handleCheckboxChange}
            />
            <p className={styles.text}>Present</p>
          </label>
          <label
            className={
              chosenCheckboxes.find((checkbox) => checkbox === 'Late')
                ? styles.custom_late_checkbox
                : styles.custom_sub_checkbox
            }
          >
            <input
              type="checkbox"
              name="late"
              value="Late"
              onChange={handleCheckboxChange}
            />
            <p className={styles.text}>Late</p>
          </label>
          <label
            className={
              chosenCheckboxes.find((checkbox) => checkbox === 'Absent')
                ? styles.custom_absent_checkbox
                : styles.custom_sub_checkbox
            }
          >
            <input
              type="checkbox"
              name="absent"
              value="Absent"
              onChange={handleCheckboxChange}
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
