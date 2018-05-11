import { handleActions } from 'redux-actions';
import { List } from 'immutable';
import { ORDER_CREATE } from '../types';

export default handleActions({
  [ORDER_CREATE] (state, action) {
    console.log(action.payload);
    return {
      ...state,
      data: state.data.push(action.payload)
    };
  }
}, {
  data: new List()
});
