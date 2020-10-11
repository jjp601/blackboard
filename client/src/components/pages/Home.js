import React from 'react';
import Courses from '../courses/Courses';
import CourseForm from '../courses/CourseForm';
import CourseFilter from '../courses/CourseFilter';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <CourseForm />
      </div>
      <div>
        <CourseFilter />
        <Courses />
      </div>
    </div>
  );
};

export default Home;
