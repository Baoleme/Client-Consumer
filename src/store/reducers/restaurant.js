import { handleActionsWithoutError } from '../lib';
import { RESTAURANT_UPDATE } from '../types/restaurant';

export default handleActionsWithoutError({
  [RESTAURANT_UPDATE] (state, action) {
    return {
      ...state,
      ...action.payload
    };
  }
}, {
  rid: null, // 餐厅id
  tid: null, // 桌号
  name: '',
  logo: '',
  phone: ''
});
