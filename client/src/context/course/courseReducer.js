import {
  GET_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_COURSE,
  FILTER_COURSES,
  CLEAR_FILTER,
  COURSE_ERROR,
  CLEAR_COURSES
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [action.payload, ...state.courses],
        loading: false
      };
    case UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map(course =>
          course._id === action.payload._id ? action.payload : course
        ),
        loading: false
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(
          course => course._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_COURSES:
      return {
        ...state,
        courses: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_COURSES:
      return {
        ...state,
        filtered: state.courses.filter(course => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return course.name.match(regex) || course.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
