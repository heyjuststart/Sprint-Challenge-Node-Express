import axios from 'axios';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECT_ACTIONS = 'FETCH_PROJECT_ACTIONS';
export const FETCH_PROJECT_ACTIONS_SUCCESS = 'FETCH_PROJECT_ACTIONS_SUCCESS';

export const REQUEST_ERROR = 'REQUEST_ERROR';

export const fetchProjects = () => dispatch => {
  dispatch({ type: FETCH_PROJECTS });

  axios
    .get('http://localhost:4000/api/projects')
    .then(res => {
      dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: REQUEST_ERROR, payload: err }));
};

export const fetchProjectActions = id => dispatch => {
  dispatch({ type: FETCH_PROJECT_ACTIONS });

  return axios
    .get(`http://localhost:4000/api/projects/${id}/actions`)
    .then(res => {
      dispatch({
        type: FETCH_PROJECT_ACTIONS_SUCCESS,
        payload: { project_id: id, actions: res.data }
      });
    })
    .catch(err => dispatch({ type: REQUEST_ERROR, payload: err }));
};
