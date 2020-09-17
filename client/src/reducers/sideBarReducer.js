const initialState = false;

export default (state = initialState, action) => {
  console.log('toggle reducer');
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return !state;

    default:
      return state;
  }
};
