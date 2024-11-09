import React, { FC } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { LuListFilter } from 'react-icons/lu';
import { PiCalendar } from 'react-icons/pi';
import { GrCloudUpload } from 'react-icons/gr';
import { MdOutlineCleaningServices } from 'react-icons/md';
import styles from './EmployeesFilter.module.css';
import { datePartShort } from '../../utils/helpers/time';
import { useAppDispatch } from '../../utils/hooks/hooks';
import { statusFilter } from '../../redux/slices/employees/filter/filter.slice';

const EmployeesFilter: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.box}>
      <label className={styles.input_wrap}>
        <button className={styles.search}>
          <IoIosSearch size={16} />
        </button>
        <input
          type="text"
          name="filter"
          autoComplete="on"
          placeholder="Search by name, role, department..."
          onChange={(e) => dispatch(statusFilter(e.target.value))}
          className={styles.input_data}
        />
        <button className={styles.clear}>
          <MdOutlineCleaningServices size={16} />
        </button>
      </label>
      <div className={styles.filter_wrap}>
        <button className={styles.filter_button}>
          <span className={styles.filter_text}>Filter</span>
          <LuListFilter size={16} />
        </button>
      </div>
      <div className={styles.data_box}>
        <label className={styles.select_wrap}>
          All Departments
          <select name="departments" className={styles.select_button}></select>
        </label>
        <div className={styles.calendar_wrap}>
          <button className={styles.calendar_button}>
            <PiCalendar size={20} />
            <span className={styles.calendar_date}>{datePartShort}</span>
          </button>
        </div>
        <div className={styles.sv_wrap}>
          <button className={styles.sv_button}>
            <span>Export CSV</span>
            <GrCloudUpload size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeesFilter;
