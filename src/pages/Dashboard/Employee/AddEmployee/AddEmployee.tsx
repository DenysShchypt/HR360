import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './AddEmployee.module.css';
import { useAppSelector } from '../../../../utils/hooks/hooks';
import { selectDepartments } from '../../../../redux/slices/departments/departments.selectors';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { PiUserCircleMinus, PiUserCirclePlus } from 'react-icons/pi';
import { RiEditCircleLine } from 'react-icons/ri';

const AddEmployee: FC = () => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [dropdownArrow, setDropdownArrow] = useState(false);
  const [department, setDepartment] = useState('');

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

  const handleDepartment = (value: string) => {
    setDepartment(value);
    setDropdownArrow(false);
  };

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      department: department,
      employment: formData.get('employment'),
      //   status: formData.get('status'),
      //   startDate: formData.get('start-date'),
      //   endDate: formData.get('end-date'),
    };

    console.log(data);
  };

  return (
    <>
      <form className={styles.wrap} onSubmit={handleAddEmployee}>
        <label>
          <input
            type="text"
            name="first-name"
            placeholder="The first name "
            onChange={(e) => e}
          />
          <span className="slider">First Name</span>
        </label>

        <label>
          <input
            type="text"
            name="last-name"
            placeholder="The last name "
            onChange={(e) => e}
          />
          <span className="slider">Last name</span>
        </label>

        <div className={styles.select_wrapper} ref={selectRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className={styles.dropdown_header}
          >
            <span>{department ? department : 'All departments'}</span>
            {dropdownArrow ? (
              <IoIosArrowUp size={16} className={styles.icon_arrow} />
            ) : (
              <IoIosArrowDown size={16} className={styles.icon_arrow} />
            )}
          </button>

          {dropdownArrow && (
            <ul className={styles.dropdown_menu}>
              {allDepartments.map((department) => (
                <li
                  key={department.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDepartment(department.name);
                  }}
                  className={styles.dropdown_item}
                >
                  {department.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.filter_item}>
          <h3 className={styles.filter_title}>Employment Type</h3>
          <div className={styles.box_checkbox}>
            {['Full-time', 'Part-time', 'Contract'].map((type) => (
              <label key={type}>
                <input type="radio" name="employment" value={type} />
                <p className={styles.text}>{type}</p>
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="">
          ADD
        </button>
      </form>
      <div className={styles.setting_box}>
        <button className={styles.setting_button}>
          <PiUserCirclePlus size={20} className={styles.icon} />
        </button>
        <button className={styles.setting_button}>
          <PiUserCircleMinus size={20} className={styles.icon} />
        </button>
        <button className={styles.setting_button}>
          <RiEditCircleLine size={20} className={styles.icon} />
        </button>
      </div>
    </>
  );
};

export default AddEmployee;
