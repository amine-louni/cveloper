import { combineReducers } from 'redux';
import theme from './themeReducer';
import sideBar from './sideBarReducer';

export default combineReducers({
  isDark: theme,
  isMainSideBarOpen: sideBar,
});
