import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload.data,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');

      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    default:
      return state;
  }
}
