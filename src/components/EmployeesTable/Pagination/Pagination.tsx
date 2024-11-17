import React, { FC } from 'react';
import styles from './Pagination.module.css';
import { IEmployee } from '../../../common/types/employees';

interface IPaginationProps {
  filterEmployees: IEmployee[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  paginatedEmployees: IEmployee[];
}

const Pagination: FC<IPaginationProps> = ({
  filterEmployees,
  currentPage,
  setCurrentPage,
  paginatedEmployees,
}) => {
  const tableRowPerPage = 5;
  const totalPages = Math.ceil(filterEmployees.length / tableRowPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      {paginatedEmployees.length >= 5 && (
        <div className={styles.pagination}>
          <button
            className={styles.page_button}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className={styles.page_button}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={styles.page_button}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className={styles.page_button}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
