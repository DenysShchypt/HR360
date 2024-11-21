import React, { FC, useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/hooks';
import { selectDepartments } from '../../../redux/slices/departments/departments.selectors';
import styles from './AddEmployees.module.css';
import { addEmployee } from '../../../redux/slices/employees/employees.thunks';
import { IEmployee } from '../../../common/types/employees';
import { getRandomTime } from '../../../utils/helpers/time';

interface IAddEmployeesProps {
  onClose: () => void;
}

const AddEmployees: FC<IAddEmployeesProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const selectRef = useRef<HTMLDivElement>(null);
  const [dropdownArrow, setDropdownArrow] = useState(false);
  const [department, setDepartment] = useState('');
  const [employment, setEmployment] = useState('');
  const allDepartments = useAppSelector(selectDepartments);

  const employments = ['Full-time', 'Part-time', 'Contract'];
  const randomNumber = Math.floor(Math.random() * (100 - 50 + 1)) + 20;

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

  const handleEmploymentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployment(e.target.value);
  };

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: IEmployee = {
      id: crypto.randomUUID(),
      department: department || 'Unassigned',
      employment: formData.get('employment') as string,
      name: `${formData.get('first-name')} ${formData.get('last-name')}`,
      photo: `https://i.pravatar.cc/150?img=${randomNumber}`,
      role: department,
      checkIn: getRandomTime(),
      checkOut: getRandomTime(),
      status: 'Present',
      overTime: '2h',
    };
    dispatch(addEmployee(data));
    onClose();
  };
  return (
    <form className={styles.wrap} onSubmit={handleAddEmployee}>
      <label className={styles.input_wrap}>
        <span className="slider">First Name:</span>
        <input
          type="text"
          name="first-name"
          placeholder="Type the first name "
          onChange={(e) => e}
          className={styles.input_field}
        />
      </label>

      <label className={styles.input_wrap}>
        <span className="slider">Last name:</span>
        <input
          type="text"
          name="last-name"
          placeholder="Type the last name "
          onChange={(e) => e}
          className={styles.input_field}
        />
      </label>

      <div className={styles.select_wrapper} ref={selectRef}>
        <button onClick={toggleDropdown} className={styles.select_toggle}>
          <span>Departments:</span>
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
                onClick={() => handleDepartment(department.name)}
                className={styles.dropdown_item}
              >
                {department.name}
              </li>
            ))}
          </ul>
        )}
      </div>

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
      <button type="submit" className={styles.add_button}>
        ADD
      </button>
    </form>
  );
};

export default AddEmployees;
