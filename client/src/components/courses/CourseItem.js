import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CourseContext from '../../context/course/courseContext';

const CourseItem = ({ course }) => {
  const courseContext = useContext(CourseContext);
  const { deleteCourse, setCurrent, clearCurrent } = courseContext;

  const { _id, name, email, phone } = course;

  const onDelete = () => {
    deleteCourse(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(course)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseItem;
