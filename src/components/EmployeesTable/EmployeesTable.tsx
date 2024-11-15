import React, { FC } from 'react';
import styles from './EmployeesTable.module.css';
import { dateDayMonth } from '../../utils/helpers/time';
import { IEmployee } from '../../common/types/employees';
import { useAppSelector } from '../../utils/hooks/hooks';
import { selectVisibleEmployees } from '../../redux/slices/employees/employees.selectors';

interface IEmployeesTableProps {
  search: string;
  department: string;
}
const EmployeesTable: FC<IEmployeesTableProps> = ({ search, department }) => {
  const employees = useAppSelector(selectVisibleEmployees) as IEmployee[];
  const filterEmployees = employees.filter((employee) => {
    const searchInput =
      search === '' ||
      employee.role.toLowerCase().includes(search.toLowerCase()) ||
      employee.name.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment = !department || employee.department === department;

    return searchInput && matchesDepartment;
  });

  return (
    <div className={styles.table_wrap}>
      <table className={styles.table}>
        <thead className={styles.head_table_wrap}>
          <tr>
            <th className={styles.head_column}>Date</th>
            <th className={styles.head_column}>Employee</th>
            <th className={styles.head_column}>Role</th>
            <th className={styles.head_column}>Employment Type</th>
            <th className={styles.head_column}>Status</th>
            <th className={styles.head_column}>Check In</th>
            <th className={styles.head_column}>Check Out</th>
            <th className={styles.head_column}>Over Time</th>
          </tr>
        </thead>
        <tbody>
          {filterEmployees &&
            filterEmployees.map((employee) => {
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
                  <td className={styles.item}>{employee.checkIn}</td>
                  <td className={styles.item}>{employee.checkOut}</td>
                  <td className={styles.item}>{employee.overTime}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
