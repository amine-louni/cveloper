import { profile as profileHttp, user as userHttp } from '../http';
import { setAlert } from './alertHandler';

import {
  CREATE_INIT_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  ADD_EDUCATION,
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
} from './types';

// Get current user profile
export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    const res = await profileHttp.get('/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.message, status: 'error' },
    });
  }
};

// create initial profile
// POST  /users/:userId/profiles;
export const createInitialProfile = (body) => async (dispatch) => {
  try {
    //initial profile (empty)
    await profileHttp.post('/', body);

    dispatch({
      type: CREATE_INIT_PROFILE,
    });
    dispatch(setAlert('Profile created 🍸', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.message, status: 'error' },
    });
    dispatch(setAlert('Error on creating initial profile 🍸', 'error'));
  }
};

// Add experience to profile
// PATH /experience
export const addExp = (body) => async (dispatch) => {
  try {
    await profileHttp.patch('/experience', body);

    dispatch({ type: ADD_EXPERIENCE, payload: body });
    dispatch(
      setAlert('Experience has been added to your profile 🍭', 'success')
    );
  } catch (err) {
    console.log(err);
    dispatch(
      setAlert('Error when adding an experience , please try again', 'error')
    );
  }
};
// DELETE experience
//{{URL}}/profiles/experience/5f4d52669f30492b48263879
export const delExp = (id) => async (dispatch) => {
  try {
    await profileHttp.delete(`/experience/${id}`);

    dispatch({ type: DELETE_EXPERIENCE, payload: id });
    dispatch(
      setAlert('Experience has been removed from your profile 🍭', 'warning')
    );
  } catch (err) {
    console.log(err);
    dispatch(
      setAlert('Error when removing an experience , please try again', 'error')
    );
  }
};

// Add education to profile
// PATCH /education
export const addEdu = (body) => async (dispatch) => {
  try {
    await profileHttp.patch('/education', body);

    dispatch({ type: ADD_EDUCATION, payload: body });
    dispatch(
      setAlert('Education has been added to your profile 🍭', 'success')
    );
  } catch (err) {
    console.log(err);
    dispatch(
      setAlert('Error when adding an experience , please try again', 'error')
    );
  }
};
