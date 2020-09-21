import { combineReducers } from 'redux';
import theme from './themeReducer';
import sideBar from './sideBarReducer';
import alert from './alertReducer';

export default combineReducers({
  isDark: theme,
  isMainSideBarOpen: sideBar,
  alert,
});
