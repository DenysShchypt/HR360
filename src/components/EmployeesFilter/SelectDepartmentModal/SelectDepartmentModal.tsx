import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './SelectDepartmentModal.module.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useAppSelector } from '../../../utils/hooks/hooks';
import { selectDepartments } from '../../../redux/slices/departments/departments.selectors';
interface ISelectDepartmentModalProps {
  handleDepartment: (department: string) => void;
  department: string;
}
const SelectDepartmentModal: FC<ISelectDepartmentModalProps> = ({
  handleDepartment,
  department,
}) => {
  const [dropdownArrow, setDropdownArrow] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
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

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownArrow((prev) => !prev);
  };
  return (
    <div className={styles.select_wrapper} ref={selectRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={styles.select_toggle}
      >
        <span className={styles.select_point}>Departments:</span>
        <div className={styles.dropdown_header}>
          <span className={styles.select_title}>
            {department ? department : 'All departments'}
          </span>
          {dropdownArrow ? (
            <IoIosArrowUp size={16} />
          ) : (
            <IoIosArrowDown size={16} />
          )}
        </div>
      </button>

      {dropdownArrow && (
        <ul className={styles.dropdown_menu}>
          {allDepartments.map((department) => (
            <li
              key={department.id}
              onClick={() => {
                handleDepartment(department.name);
                setDropdownArrow(false);
              }}
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

export default SelectDepartmentModal;
