import React, { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks/hooks';
import styles from './AddEditEmployees.module.css';
import {
  addEmployee,
  editEmployee,
} from '../../../redux/slices/employees/employees.thunks';
import { IEmployee } from '../../../common/types/employees';
import { formatEventDate, getRandomTime } from '../../../utils/helpers/time';
import SelectDepartmentModal from '../../EmployeesFilter/SelectDepartmentModal/SelectDepartmentModal';
import Employments from '../../EmployeesFilter/Employments/Employments';
import MainModal from '../MainModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useModal } from '../../../utils/hooks/useModal';
import { addEmployeeActivity } from '../../../redux/slices/employees/activity/activity.thunks';
import { selectUser } from '../../../redux/slices/auth/auth.selectors';

interface IAddEmployeesProps {
  onClose: () => void;
  employee?: IEmployee;
}

const AddEditEmployees: FC<IAddEmployeesProps> = ({ onClose, employee }) => {
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [department, setDepartment] = useState(employee?.department || '');
  const [employment, setEmployment] = useState(employee?.employment || '');
  const [firstName, setFirstName] = useState(
    employee?.name.split(' ')[0] || ''
  );
  const [lastName, setLastName] = useState(employee?.name.split(' ')[1] || '');
  const { isOpen: isModalConfirm, toggle: toggleConfirmModal } = useModal();

  const randomNumber = Math.floor(Math.random() * (100 - 50 + 1)) + 20;

  const handleDepartment = (value: string) => {
    setDepartment(value);
  };

  const handleEmploymentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployment(e.target.value);
  };

  const handleAddEmployee = () => {
    const data: IEmployee = {
      id: employee?.id || crypto.randomUUID(),
      department: department,
      employment: employment,
      name: `${firstName} ${lastName}`,
      photo: employee?.photo || `https://i.pravatar.cc/150?img=${randomNumber}`,
      role: department,
      checkIn: getRandomTime(),
      checkOut: getRandomTime(),
      status: 'Present',
      overTime: '2h',
    };

    const activity = {
      id: crypto.randomUUID(),
      nameEmployee: `${firstName} ${lastName}`,
      time: formatEventDate(new Date()),
      author: currentUser.username,
    };
    if (employee?.id) {
      dispatch(editEmployee({ body: data, id: employee.id }));

      dispatch(
        addEmployeeActivity({ ...activity, event: 'made the change to ' })
      );
    } else {
      dispatch(addEmployee(data));
      dispatch(
        addEmployeeActivity({ ...activity, event: 'add a new employee, ' })
      );
    }

    onClose();
  };

  return (
    <>
      <form className={styles.wrap}>
        <label className={styles.input_wrap}>
          <span className="slider">First Name:</span>
          <input
            type="text"
            value={firstName}
            placeholder={employee?.name ? '' : 'Type the first name'}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.input_field}
          />
        </label>

        <label className={styles.input_wrap}>
          <span className="slider">Last name:</span>
          <input
            type="text"
            value={lastName}
            placeholder={employee?.name ? '' : 'Type the last name'}
            onChange={(e) => setLastName(e.target.value)}
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
        <div className={styles.button_box}>
          <button
            type="button"
            className={styles.add_button}
            onClick={() => toggleConfirmModal()}
          >
            {!employee?.id ? 'Add Employee' : 'Edit Employee'}
          </button>
          <button
            type="button"
            className={styles.add_button}
            onClick={() => onClose()}
          >
            Exit
          </button>
        </div>
      </form>
      {isModalConfirm && (
        <MainModal closeModal={toggleConfirmModal}>
          <ConfirmModal
            onClose={toggleConfirmModal}
            handleEvent={handleAddEmployee}
          />
        </MainModal>
      )}
    </>
  );
};

export default AddEditEmployees;
