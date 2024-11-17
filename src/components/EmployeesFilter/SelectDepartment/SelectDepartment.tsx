import React, { FC, useEffect, useRef, useState } from 'react';
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
  const selectRef = useRef<HTMLDivElement>(null);
  const [dropdownArrow, setDropdownArrow] = useState(false);

  const allDepartments = useAppSelector(selectDepartments);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setDropdownArrow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownArrow]);

  const toggleDropdown = () => {
    setDropdownArrow((prev) => !prev);
  };

  const handleFilter = (department: string) => {
    const params = new URLSearchParams(window.location.search);
    if (department !== '') {
      params.set('department', department);
    } else {
      params.delete('department');
    }
    setSearchParams(params.toString());
    setDropdownArrow(false);
  };

  return (
    <div className={styles.select_wrapper} ref={selectRef}>
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
