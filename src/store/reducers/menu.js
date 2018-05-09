import { handleActions } from 'redux-actions';
import {
  MENU_UPDATE,
  MENU_MODIFY_ITEM_COUNT,
  MENU_EMPTY_BASKET,
  MENU_OPEN_DETAIL,
  MENU_CLOSE_DETAIL,
  MENU_MODIFY_ITEM_COUNT_WITH_SPEC
} from '../types/menu';
import { Map as IMap } from 'immutable';

/**
 * a ['{{id}}#{{spec1}}/{{spec2}}.../{{specn}}' -> {count, unitPrice}] map
 */
class ImmutableBasket {
  constructor (data = null) {
    this.map = new IMap(data);
  }

  /**
   *
   * @param {number} id item id
   * @param {object} spec key: option name, value: selected option
   */
  plus (id, spec) {
    const uniqKey = this._genKey(id, spec);
    const oldV = this.map.get(uniqKey) || { count: 0, unitPrice: this._calculateUnitPrice(id, spec), spec };
    const newV = { ...oldV, count: this._clamp(oldV.count + 1) };
    return new ImmutableBasket(
      this.map.set(uniqKey, newV)
    );
  }

  minus (id, spec) {
    const uniqKey = this._genKey(id, spec);
    const oldV = this.map.get(uniqKey) || { count: 0, unitPrice: this._calculateUnitPrice(id, spec), spec };
    const newV = { ...oldV, count: this._clamp(oldV.count - 1) };
    if (newV.count <= 0) return new ImmutableBasket(this.map.delete(uniqKey));
    return new ImmutableBasket(
      this.map.set(uniqKey, newV)
    );
  }

  clear () {
    return new ImmutableBasket();
  }

  toArray () {
    return [...Object.entries(this.map.toObject())].map(([uniqKey, { unitPrice, count, spec }]) => {
      const [, id, specStr] = uniqKey.match(/(\d+)#(.*)/);
      return {
        id: Number(id),
        specStr,
        spec,
        count,
        unitPrice
      };
    });
  }

  size () {
    return this.map.size;
  }

  _genKey (id, spec) {
    const specStr = spec ? [...Object.values(spec)].join('/') : '';
    return `${id}#${specStr}`;
  }

  _clone () {
    return new ImmutableBasket(this.map);
  }

  _clamp (v) {
    return Math.min(99, Math.max(0, v));
  }

  _calculateUnitPrice (id, spec) {
    return 12; // TODO:
  }
}

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
    const item = state.idMap.get(id);

    const oldCount = item.context.count;
    item.context.count = state.basket._clamp(oldCount + modifier);

    if (modifier === 1) { // add
      newState.basket = newState.basket.plus(id, null);
    } else {
      newState.basket = newState.basket.minus(id, null);
    }

    return newState;
  },

  [MENU_EMPTY_BASKET] (state, action) {
    for (const item of state.idMap.values()) {
      item.context.count = 0;
    }

    return {
      ...state,
      basket: state.basket.clear()
    };
  },
  [MENU_OPEN_DETAIL] (state, action) {
    return {
      ...state,
      detailingItem: action.payload.id
    };
  },
  [MENU_CLOSE_DETAIL] (state, action) {
    return {
      ...state,
      detailingItem: null
    };
  }
}, {
  data: {},
  categories: [],
  idMap: new Map(),
  basket: new ImmutableBasket(),
  detailingItem: null // item id
});
