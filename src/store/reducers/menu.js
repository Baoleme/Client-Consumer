import { handleActions } from 'redux-actions';
import { MENU_UPDATE, MENU_MODIFY_ITEM_COUNT, MENU_EMPTY_BASKET } from '../types/menu';
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
    const newState = { ...state };

    const { id, modifier } = action.payload;
    const oldItem = state.idMap.get(id);
    const newItem = { ...oldItem };

    const oldCount = oldItem.context.count;
    let newCount = oldCount + modifier;
    newCount = Math.min(99, newCount);
    newCount = Math.max(0, newCount);
    newItem.context.count = newCount;
    const newMap = new Map(state.idMap);
    newMap.set(id, newItem);

    if (oldCount !== 0 && newCount === 0) {
      // deleted from basket
      newState.basket = newState.basket.delete(newState.basket.indexOf(id));
    } else if (oldCount === 0 && newCount !== 0) {
      // added to basket
      newState.basket = newState.basket.push(id);
    }
    return newState;
  },

  [MENU_EMPTY_BASKET] (state, action) {
    for (const item of state.idMap.values()) {
      item.context.count = 0;
    }

    return {
      ...state,
      basket: new List()
    };
  }
}, {
  data: {},
  categories: [],
  idMap: new Map(),
  basket: new List()
});
