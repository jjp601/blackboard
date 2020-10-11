import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CourseItem from './CourseItem';
import Spinner from '../layout/Spinner';
import CourseContext from '../../context/course/courseContext';

const Courses = () => {
  const courseContext = useContext(CourseContext);

  const { courses, filtered, getCourses, loading } = courseContext;

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line
  }, []);

  if (courses !== null && courses.length === 0 && !loading) {
    return <h4>Please add a course</h4>;
  }

  return (
    <Fragment>
      {courses !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(course => (
                <CSSTransition
                  key={course._id}
                  timeout={500}
                  classNames='item'
                >
                  <CourseItem course={course} />
                </CSSTransition>
              ))
            : courses.map(course => (
                <CSSTransition
                  key={course._id}
                  timeout={500}
                  classNames='item'
                >
                  <CourseItem course={course} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Courses;
