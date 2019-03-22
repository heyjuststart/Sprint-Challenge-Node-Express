import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  REQUEST_ERROR,
} from '../actions';

const initialState = {
  loggingIn: false,
  fetchingProjects: false,
  projects: [],
  error: null,
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return { ...state, fetchingProjects: true };
    case FETCH_PROJECTS_SUCCESS:
      return { ...state, projects: action.payload, fetchingProjects: false };
    case REQUEST_ERROR:
      return { ...initialState, projects: state.projects, error: action.payload };
    default:
      return state;
  }
};

