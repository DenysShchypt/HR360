import React, { FC, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/hooks';
import { selectDepartments } from '../../../redux/slices/departments/departments.selectors';
import { departmentsFilter } from '../../../redux/slices/employees/filter/filter.slice';
import styles from './SelectDepartment.module.css';

const SelectDepartment: FC = () => {
  const [dropdownArrow, setDropdownArrow] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All departments');
  const dispatch = useAppDispatch();
  const allDepartments = useAppSelector(selectDepartments);

  const toggleDropdown = () => {
    setDropdownArrow((prev) => !prev);
  };

  const handleFilter = (option: string) => {
    if (!option) {
      setSelectedOption('All departments');
    } else {
      setSelectedOption(option);
    }

    dispatch(departmentsFilter(option));
    setDropdownArrow(false);
  };

  return (
    <div className={styles.select_wrapper}>
      <button onClick={toggleDropdown} className={styles.dropdown_header}>
        <span>{selectedOption}</span>
        {dropdownArrow ? (
          <IoIosArrowUp size={16} className={styles.icon_arrow} />
        ) : (
          <IoIosArrowDown size={16} className={styles.icon_arrow} />
        )}
      </button>

      {dropdownArrow && (
        <ul className={styles.dropdown_menu}>
          <li onClick={() => handleFilter('')} className={styles.dropdown_item}>
            All departments
          </li>
          {allDepartments.map((department) => (
            <li
              key={department.id}
              onClick={() => handleFilter(department.name)}
              className={styles.dropdown_item}
            >
              {department.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDepartment;
