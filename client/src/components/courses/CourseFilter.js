import React, { useContext, useRef, useEffect } from 'react';
import CourseContext from '../../context/course/courseContext';

const CourseFilter = () => {
  const courseContext = useContext(CourseContext);
  const text = useRef('');

  const { filterCourses, clearFilter, filtered } = courseContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterCourses(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Courses...'
        onChange={onChange}
      />
    </form>
  );
};

export default CourseFilter;
