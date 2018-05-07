import { handleActions } from 'redux-actions';
import { MENU_UPDATE, MENU_MODIFY_ITEM_COUNT } from '../types/menu';
import { List } from 'immutable';

export default handleActions({
  [MENU_UPDATE] (state, action) {
    const data = action.payload;
    const idMap = new Map();
    let count = 0;
    for (const arr of Object.values(data)) {
      for (const item of arr) {
        item.context.id = ++count;
        idMap.set(count, item);
      }
    }

    return {
      ...state,
      data: action.payload,
      categories: [...Object.keys(action.payload)],
      idMap: idMap
    };
  },

  [MENU_MODIFY_ITEM_COUNT] (state, action) {
    const { id, modifier } = action.payload;
    const newItem = { ...state.idMap.get(id) };
    newItem.context.count += modifier;
    newItem.context.count = Math.min(99, newItem.context.count);
    newItem.context.count = Math.max(0, newItem.context.count);
    const newMap = new Map(state.idMap);
    newMap.set(id, newItem);
    return {
      ...state,
      idMap: newMap
    };
  }
}, {
  data: {},
  categories: [],
  idMap: new Map()
});
