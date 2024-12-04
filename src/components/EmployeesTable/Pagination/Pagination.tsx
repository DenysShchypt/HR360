import React, { FC } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import styles from './Pagination.module.css';
import { IEmployee } from '../../../common/types/employees';

interface IPaginationProps {
  filterEmployees: IEmployee[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: FC<IPaginationProps> = ({
  filterEmployees,
  currentPage,
  setCurrentPage,
}) => {
  const tableRowPerPage = 7;
  const totalPages = Math.ceil(filterEmployees.length / tableRowPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className={styles.pagination_box}>
      <p className={styles.pagination_description}>
        Showing
        <span className={styles.number_employees}>
          {tableRowPerPage * (currentPage - 1) + 1} to
          {tableRowPerPage * currentPage} of {filterEmployees.length}
        </span>
        employees
      </p>
      <div className={styles.pagination}>
        <button
          className={styles.page_button_arrow}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <RiArrowLeftSLine size={20} />
        </button>
        <button
          className={styles.page_button}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          1
        </button>
        {currentPage > 2 && filterEmployees.length > tableRowPerPage && (
          <span className={styles.page_dots}>...</span>
        )}
        {totalPages !== currentPage &&
          currentPage !== 1 &&
          filterEmployees.length > tableRowPerPage && (
            <p className={styles.page_current}>{currentPage}</p>
          )}
        {totalPages - 1 !== currentPage &&
          filterEmployees.length > tableRowPerPage &&
          totalPages !== currentPage && <p className={styles.page_dots}>...</p>}
        {totalPages !== 1 && (
          <button
            className={styles.page_button}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {totalPages}
          </button>
        )}
        <button
          className={styles.page_button_arrow}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <RiArrowRightSLine size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
