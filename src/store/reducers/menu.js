import { handleActions } from 'redux-actions';
import { MENU_UPDATE, MENU_MODIFY_ITEM_COUNT } from '../types/menu';

export default handleActions({
  [MENU_UPDATE] (state, action) {
    const data = action.payload;
    const idMap = {};
    let count = 0;
    for (const arr of Object.values(data)) {
      for (const item of arr) {
        item.context.id = ++count;
        idMap[count] = item;
      }
    }

    return {
      ...state,
      data: action.payload,
      categories: [...Object.keys(action.payload)],
      idMap
    };
  },
  [MENU_MODIFY_ITEM_COUNT] (state, action) {
    const { id, modifier } = action.payload;
    const newItem = { ...state.idMap[id] };
    newItem.context.count += modifier;
    newItem.context.count = Math.min(99, newItem.context.count);
    newItem.context.count = Math.max(0, newItem.context.count);
    return {
      ...state,
      idMap: {
        ...state.idMap,
        [id]: newItem
      }
    };
  }
}, {
  data: {},
  categories: [],
  idMap: {}
});
