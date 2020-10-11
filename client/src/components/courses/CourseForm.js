import React, { useState, useContext, useEffect } from 'react';
import CourseContext from '../../context/course/courseContext';

const CourseForm = () => {
  const courseContext = useContext(CourseContext);

  const { addCourse, updateCourse, clearCurrent, current } = courseContext;

  useEffect(() => {
    if (current !== null) {
      setCourse(current);
    } else {
      setCourse({
        name: '',
        email: '',
        phone: ''
      });
    }
  }, [courseContext, current]);

  const [course, setCourse] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const { name, email, phone } = course;

  const onChange = e =>
    setCourse({ ...course, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addCourse(course);
    } else {
      updateCourse(course);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Course' : 'Add Course'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Course' : 'Add Course'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default CourseForm;
