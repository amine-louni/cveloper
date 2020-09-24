import { profile as profileHttp } from '../http';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current user profile
//
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
