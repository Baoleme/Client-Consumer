import { handleActions } from 'redux-actions';
import { List } from 'immutable';
import { ORDER_CREATE } from '../types';

export default handleActions({
  [ORDER_CREATE] (state, action) {
    console.log(action.payload);
    return {
      ...state,
      orders: state.orders.push(action.payload)
    };
  }
}, {
  orders: new List()
});
