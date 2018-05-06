import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import restaurant from './restaurant';

export default combineReducers({
  counter,
  user,
  restaurant
});
