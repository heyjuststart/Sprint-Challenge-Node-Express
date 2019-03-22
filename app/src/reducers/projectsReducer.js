import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECT_ACTIONS,
  FETCH_PROJECT_ACTIONS_SUCCESS,
  REQUEST_ERROR
} from '../actions';

const initialState = {
  loggingIn: false,
  fetchingProjects: false,
  projects: [],
  error: null
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return { ...state, fetchingProjects: true };
    case FETCH_PROJECTS_SUCCESS:
      return { ...state, projects: action.payload, fetchingProjects: false };
    case FETCH_PROJECT_ACTIONS:
      return { ...state, fetchingProjectActions: true };
    case FETCH_PROJECT_ACTIONS_SUCCESS:
      const newProjects = [...state.projects];
      const project = newProjects.find(p => p.id === action.payload.project_id);
      project.actions = action.payload.actions;
      return {
        ...state,
        projects: newProjects,
        fetchingProjectActions: false
      };
    case REQUEST_ERROR:
      return {
        ...initialState,
        projects: state.projects,
        error: action.payload
      };
    default:
      return state;
  }
};
