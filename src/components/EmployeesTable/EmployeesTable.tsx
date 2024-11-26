import React, { FC, useMemo, useState } from 'react';
import styles from './EmployeesTable.module.css';
import { dateDayMonth, formatEventDate } from '../../utils/helpers/time';
import { IEmployee } from '../../common/types/employees';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hooks';
import { selectAllEmployees } from '../../redux/slices/employees/employees.selectors';
import Pagination from './Pagination/Pagination';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { removeEmployee } from '../../redux/slices/employees/employees.thunks';
import { LiaUserEditSolid } from 'react-icons/lia';
import MainModal from '../Modal/MainModal';
import AddEditEmployees from '../Modal/AddEditEmployees/AddEditEmployees';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';
import { useModal } from '../../utils/hooks/useModal';
import { addEmployeeActivity } from '../../redux/slices/employees/activity/activity.thunks';
import { selectUser } from '../../redux/slices/auth/auth.selectors';
import { IActivity } from '../../common/types/activity';

interface IEmployeesTableProps {
  search: string;
  department: string;
  status?: string[];
  employment?: string[];
  settings?: boolean;
}
const EmployeesTable: FC<IEmployeesTableProps> = ({
  search,
  department,
  status = [],
  employment = [],
  settings,
}) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen: isOpenEditModal, toggle: toggleEditModal } = useModal();
  const { isOpen: isModalConfirm, toggle: toggleConfirmModal } = useModal();
  const [employee, setEmployee] = useState<IEmployee>();
  const [removeEmployeeId, setRemoveEmployeeId] = useState('');
  const currentUser = useAppSelector(selectUser);
  const employees = useAppSelector(selectAllEmployees) as IEmployee[];
  const rowsPerPage = 7;

  const filterEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const searchInput =
        search === '' ||
        employee.role.toLowerCase().includes(search.toLowerCase()) ||
        employee.name.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        !department || employee.department === department;

      const showStatus =
        status.length === 0 || status.includes(employee.status);
      const showEmployment =
        employment.length === 0 || employment.includes(employee.employment);

      return searchInput && matchesDepartment && showStatus && showEmployment;
    });
  }, [employees, search, department, status, employment]);

  const paginatedEmployees = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;

    return filterEmployees.slice(startIdx, endIdx);
  }, [filterEmployees, currentPage]);

  const removeWorker = () => {
    const removeEmployeeFromList = filterEmployees.filter(
      (employee) => employee.id === removeEmployeeId
    );

    const newEmployeeList = filterEmployees.filter(
      (employee) => employee.id !== removeEmployeeId
    );
    const activity: IActivity = {
      id: crypto.randomUUID(),
      nameEmployee: removeEmployeeFromList[0].name,
      time: formatEventDate(new Date()),
      author: currentUser.username,
      event: 'removed employee ',
    };
    dispatch(addEmployeeActivity(activity));
    dispatch(removeEmployee(removeEmployeeId));
    toggleConfirmModal();
    setCurrentPage(Math.ceil(newEmployeeList.length / rowsPerPage));
  };
  console.log(currentPage);
  return (
    <>
      <div className={styles.table_wrap}>
        <table className={styles.table}>
          <thead className={styles.head_table_wrap}>
            <tr>
              <th className={styles.head_column}>Date</th>
              <th className={styles.head_column}>Employee</th>
              <th className={styles.head_column}>Role</th>
              <th className={styles.head_column}>Employment Type</th>
              {!settings && <th className={styles.head_column}>Status</th>}
              {!settings && <th className={styles.head_column}>Check In</th>}
              {!settings && <th className={styles.head_column}>Check Out</th>}
              {!settings && (
                <th className={styles.head_column_center}>Over Time</th>
              )}
              {settings && <th className={styles.head_column_center}>Edit</th>}
              {settings && (
                <th className={styles.head_column_center}>Remove</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((employee) => {
              return (
                <tr key={employee.id} className={styles.item_row}>
                  <td className={styles.item}>{dateDayMonth}</td>
                  <td className={styles.item_worker}>
                    <img
                      src={employee.photo}
                      alt="worker-avatar"
                      width="40"
                      height="40"
                      className={styles.avatar_worker}
                    />
                    <span className={styles.name_worker}>{employee.name}</span>
                  </td>
                  <td className={styles.item}>{employee.role}</td>
                  <td className={styles.item}>
                    <div
                      className={
                        employee.employment === 'Full-time'
                          ? styles.worker_full
                          : employee.employment === 'Part-time'
                            ? styles.worker_part
                            : styles.worker_contract
                      }
                    >
                      {employee.employment}
                    </div>
                  </td>
                  {!settings && (
                    <td className={styles.item}>
                      <div
                        className={
                          employee.status === 'Present'
                            ? styles.worker_present
                            : employee.status !== 'Late'
                              ? styles.worker_absent
                              : styles.worker_late
                        }
                      >
                        {employee.status}
                      </div>
                    </td>
                  )}
                  {!settings && (
                    <td className={styles.item}>{employee.checkIn}</td>
                  )}
                  {!settings && (
                    <td className={styles.item}>{employee.checkOut}</td>
                  )}
                  {!settings && (
                    <td className={styles.item_center}>{employee.overTime}</td>
                  )}
                  {settings && (
                    <td className={styles.item_center}>
                      <button
                        onClick={() => {
                          toggleEditModal();
                          setEmployee(employee);
                        }}
                      >
                        <LiaUserEditSolid size={20} />
                      </button>
                    </td>
                  )}
                  {settings && (
                    <td className={styles.item_center}>
                      <button
                        onClick={() => {
                          setRemoveEmployeeId(employee.id);
                          toggleConfirmModal();
                        }}
                      >
                        <AiOutlineUsergroupDelete size={20} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          filterEmployees={filterEmployees}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {isOpenEditModal && (
        <MainModal closeModal={toggleEditModal}>
          <AddEditEmployees onClose={toggleEditModal} employee={employee} />
        </MainModal>
      )}
      {isModalConfirm && (
        <MainModal closeModal={toggleConfirmModal}>
          <ConfirmModal
            onClose={toggleConfirmModal}
            handleEvent={removeWorker}
          />
        </MainModal>
      )}
    </>
  );
};

export default EmployeesTable;
