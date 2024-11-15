import React, { FC, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useAppSelector } from '../../../utils/hooks/hooks';
import { selectDepartments } from '../../../redux/slices/departments/departments.selectors';

import styles from './SelectDepartment.module.css';
interface IEmployeesFilterProps {
  setSearchParams: (value: string) => void;
  department: string;
}
const SelectDepartment: FC<IEmployeesFilterProps> = ({
  setSearchParams,
  department,
}) => {
  const [dropdownArrow, setDropdownArrow] = useState(false);

  const allDepartments = useAppSelector(selectDepartments);

  const toggleDropdown = () => {
    setDropdownArrow((prev) => !prev);
  };

  const handleFilter = (department: string) => {
    const nextParams = department !== '' ? { department } : ``;
    setSearchParams(nextParams as string);
    setDropdownArrow(false);
  };

  return (
    <div className={styles.select_wrapper}>
      <button onClick={toggleDropdown} className={styles.dropdown_header}>
        <span>{department === '' ? 'All departments' : department}</span>
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
