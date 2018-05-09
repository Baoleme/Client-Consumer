import { handleActions } from 'redux-actions';
import { RESTAURANT_UPDATE } from '../types/restaurant';

export default handleActions({
  [RESTAURANT_UPDATE] (state, action) {
    return {
      ...state,
      ...action.payload
    };
  }
}, {
  name: '',
  logo: '',
  phone: ''
});
