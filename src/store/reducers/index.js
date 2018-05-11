import { combineReducers } from 'redux';
import menu from './menu';
import user from './user';
import restaurant from './restaurant';
import order from './order';

export default combineReducers({
  menu,
  user,
  restaurant,
  order
});
