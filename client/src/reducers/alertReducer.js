import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      console.log('set alert');
      return [...state, action.payload];

    case REMOVE_ALERT:
      console.log('remove alert');
      return state.filter((alert) => alert.id !== action.payload);

    default:
      return state;
  }
}
