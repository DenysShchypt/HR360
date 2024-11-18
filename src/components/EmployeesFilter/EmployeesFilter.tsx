import React, { FC, useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { LuListFilter } from 'react-icons/lu';
import { PiCalendar } from 'react-icons/pi';
import { GrCloudUpload } from 'react-icons/gr';
import { MdOutlineCleaningServices } from 'react-icons/md';
import styles from './EmployeesFilter.module.css';
import { datePartShort } from '../../utils/helpers/time';
import SelectDepartment from './SelectDepartment/SelectDepartment';
import MainModal from '../Modal/MainModal';
import FilterModal from '../Modal/FilterModal/FilterModal';

interface IEmployeesFilterProps {
  setSearchParams: (value: string | URLSearchParams) => void;
  search: string;
  department: string;
  status: string[];
  employment: string[];
}

const EmployeesFilter: FC<IEmployeesFilterProps> = ({
  setSearchParams,
  search,
  department,
  status,
  employment,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => {
      const nextState = !prevState;
      document.body.style.overflow = nextState ? 'hidden' : '';
      return nextState;
    });
  };

  const updateQueryString = (search: string) => {
    const params = new URLSearchParams(window.location.search);
    if (search !== '') {
      params.set('search', search);
    } else {
      params.delete('search'); // Remove the search param if empty
    }
    setSearchParams(params.toString());
  };

  const handleCleanFilter = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('search');
    setSearchParams(params.toString());
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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
          value={search}
          placeholder="Search by name, role..."
          onChange={(e) => updateQueryString(e.target.value)}
          className={styles.input_data}
        />
        <button className={styles.clear} onClick={handleCleanFilter}>
          <MdOutlineCleaningServices size={16} />
        </button>
      </label>
      <div className={styles.filter_wrap}>
        <button className={styles.filter_button} onClick={toggleModal}>
          <span className={styles.filter_text}>Filter</span>
          <LuListFilter size={16} />
        </button>
      </div>
      <div className={styles.data_box}>
        <div className={styles.select_wrap}>
          <SelectDepartment
            setSearchParams={setSearchParams}
            department={department}
          />
        </div>
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
      {isModalOpen && (
        <MainModal closeModal={toggleModal}>
          <FilterModal
            status={status}
            employment={employment}
            setSearchParams={setSearchParams}
            onClose={toggleModal}
          />
        </MainModal>
      )}
    </div>
  );
};

export default EmployeesFilter;
