import { handleActionsWithoutError } from '../lib';
import { List } from 'immutable';
import { ORDER_CREATE, ORDER_SELECT_DETAILING, ORDER_REFRESH } from '../types';

export default handleActionsWithoutError({
  [ORDER_CREATE] (state, action) {
    for (const order of action.payload) {
      if (order['state_record']) {
        // use latest state_record to get current state
        order.state = order['state_record'][order['state_record'].length - 1].state;
      }
    }
    return {
      ...state,
      data: state.data.unshift(...action.payload)
    };
  },
  [ORDER_REFRESH] (state, action) {
    for (const order of action.payload) {
      if (order['state_record']) {
        // use latest state_record to get current state
        order.state = order['state_record'][order['state_record'].length - 1].state;
      }
    }
    return {
      ...state,
      data: new List(action.payload)
    };
  },
  [ORDER_SELECT_DETAILING] (state, action) {
    return {
      ...state,
      detailing: action.payload
    };
  }
}, {
  data: new List(),
  detailing: null
});
