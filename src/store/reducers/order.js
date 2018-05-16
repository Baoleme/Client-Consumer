import { handleActionsWithoutError } from '../lib';
import { List } from 'immutable';
import { ORDER_CREATE } from '../types';

export default handleActionsWithoutError({
  [ORDER_CREATE] (state, action) {
    return {
      ...state,
      data: state.data.unshift(...action.payload)
    };
  }
}, {
  data: new List()
});
