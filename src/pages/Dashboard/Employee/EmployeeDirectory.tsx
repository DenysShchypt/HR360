import React, { FC, useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import EmployeesTable from '../../../components/EmployeesTable/EmployeesTable';
import { departments } from '../../../mockData/departments';
import styles from './EmployeeDirectory.module.css';

const EmployeeDirectory: FC = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  return (
    <>
      <div className={styles.swipe_wrap}>
        <Swiper
          speed={500}
          slidesPerView="auto"
          grabCursor={true}
          centeredSlides={false}
          spaceBetween={24}
          loop={true}
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
          <FaArrowRightLong size={30} className={styles.icon_arrow} />
        </button>
        <button
          className={styles.arrow_back}
          type="button"
          onClick={() => {
            swiperInstance?.slideNext();
          }}
        >
          <FaArrowLeftLong size={30} className={styles.icon_arrow} />
        </button>
      </div>
      <EmployeesTable />
    </>
  );
};

export default EmployeeDirectory;
