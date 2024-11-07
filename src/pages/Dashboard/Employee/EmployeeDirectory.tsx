import React, { FC, useEffect, useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import EmployeesTable from '../../../components/EmployeesTable/EmployeesTable';
import styles from './EmployeeDirectory.module.css';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/hooks';
import { fetchDepartments } from '../../../redux/slices/departments/departments.thunks';
import { selectDepartments } from '../../../redux/slices/departments/departments.selectors';
import EmployeesFilter from '../../../components/EmployeesFilter/EmployeesFilter';

const EmployeeDirectory: FC = () => {
  const dispatch = useAppDispatch();
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  const departments = useAppSelector(selectDepartments);
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);
  return (
    <>
      <div className={styles.swipe_wrap}>
        <Swiper
          speed={500}
          slidesPerView={Math.min(departments.length, 3)}
          grabCursor={true}
          centeredSlides={false}
          spaceBetween={24}
          slidesPerGroup={1}
          loop={departments.length > 3}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
        >
          {departments.map((department) => (
            <SwiperSlide key={department.id} className={styles.slide}>
              <div className={styles.item_department}>
                <h4 className={styles.title}>{department.name}</h4>
                <div className={styles.description}>
                  <div className={styles.icon_wrap}>
                    <AiOutlineUsergroupAdd size={20} className={styles.icon} />
                  </div>
                  <p className={styles.description_text}>
                    <span className={styles.description_text_count}>
                      {department.headcountChange}
                    </span>
                    Headcount change last month
                  </p>
                </div>
                <div className={styles.total_wrap}>
                  <h3 className={styles.total_text}>Total Employee</h3>
                  <p className={styles.total_count}>
                    {department.totalEmployee}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={styles.arrow_forward}
          type="button"
          onClick={() => swiperInstance?.slidePrev()}
        >
          <MdOutlineArrowForwardIos size={30} className={styles.icon_arrow} />
        </button>
        <button
          className={styles.arrow_back}
          type="button"
          onClick={() => {
            swiperInstance?.slideNext();
          }}
        >
          <MdOutlineArrowBackIosNew size={30} className={styles.icon_arrow} />
        </button>
      </div>
      <EmployeesFilter />
      <EmployeesTable />
    </>
  );
};

export default EmployeeDirectory;
