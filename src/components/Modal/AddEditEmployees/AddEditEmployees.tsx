import React, { FC, useState } from 'react';

import { useAppDispatch } from '../../../utils/hooks/hooks';
import styles from './AddEditEmployees.module.css';
import {
  addEmployee,
  editEmployee,
} from '../../../redux/slices/employees/employees.thunks';
import { IEmployee } from '../../../common/types/employees';
import { getRandomTime } from '../../../utils/helpers/time';
import SelectDepartmentModal from '../../EmployeesFilter/SelectDepartmentModal/SelectDepartmentModal';
import Employments from '../../EmployeesFilter/Employments/Employments';

interface IAddEmployeesProps {
  onClose: () => void;
  employee?: IEmployee;
}

const AddEditEmployees: FC<IAddEmployeesProps> = ({ onClose, employee }) => {
  const dispatch = useAppDispatch();
  const [department, setDepartment] = useState(employee?.department || '');
  const [employment, setEmployment] = useState(employee?.employment || '');

  const randomNumber = Math.floor(Math.random() * (100 - 50 + 1)) + 20;

  const handleDepartment = (value: string) => {
    setDepartment(value);
  };

  const handleEmploymentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployment(e.target.value);
  };

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: IEmployee = {
      id: employee?.id || crypto.randomUUID(),
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
    if (employee?.id) {
      dispatch(editEmployee({ body: data, id: employee.id }));
    } else {
      dispatch(addEmployee(data));
    }

    onClose();
  };

  return (
    <form className={styles.wrap} onSubmit={handleAddEmployee}>
      <label className={styles.input_wrap}>
        <span className="slider">First Name:</span>
        <input
          type="text"
          name="first-name"
          value={employee?.name && employee.name.split(' ')[0]}
          placeholder={employee?.name ? '' : 'Type the first name'}
          onChange={(e) => e}
          className={styles.input_field}
        />
      </label>

      <label className={styles.input_wrap}>
        <span className="slider">Last name:</span>
        <input
          type="text"
          name="last-name"
          value={employee?.name && employee.name.split(' ')[1]}
          placeholder={employee?.name ? '' : 'Type the last name'}
          onChange={(e) => e}
          className={styles.input_field}
        />
      </label>

      <SelectDepartmentModal
        handleDepartment={handleDepartment}
        department={department}
      />

      <Employments
        employment={employment}
        handleEmploymentTime={handleEmploymentTime}
      />

      <button type="submit" className={styles.add_button}>
        ADD
      </button>
    </form>
  );
};

export default AddEditEmployees;
