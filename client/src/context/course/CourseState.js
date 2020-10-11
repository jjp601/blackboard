import React, { useReducer } from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import {
  GET_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_COURSE,
  FILTER_COURSES,
  CLEAR_COURSES,
  CLEAR_FILTER,
  COURSE_ERROR
} from '../types';

const CourseState = props => {
  const initialState = {
    courses: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(courseReducer, initialState);

  // Get Courses
  const getCourses = async () => {
    try {
      const res = await axios.get('/api/courses');

      dispatch({
        type: GET_COURSES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Course
  const addCourse = async course => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/courses', course, config);

      dispatch({
        type: ADD_COURSE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Course
  const deleteCourse = async id => {
    try {
      await axios.delete(`/api/courses/${id}`);

      dispatch({
        type: DELETE_COURSE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Course
  const updateCourse = async course => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/courses/${course._id}`,
        course,
        config
      );

      dispatch({
        type: UPDATE_COURSE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Courses
  const clearCourses = () => {
    dispatch({ type: CLEAR_COURSES });
  };

  // Set Current Course
  const setCurrent = course => {
    dispatch({ type: SET_CURRENT, payload: course });
  };

  // Clear Current Course
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Courses
  const filterCourses = text => {
    dispatch({ type: FILTER_COURSES, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <CourseContext.Provider
      value={{
        courses: state.courses,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addCourse,
        deleteCourse,
        setCurrent,
        clearCurrent,
        updateCourse,
        filterCourses,
        clearFilter,
        getCourses,
        clearCourses
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseState;
