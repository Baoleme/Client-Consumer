import { handleActionsWithoutError } from '../lib';
import {
  MENU_UPDATE,
  MENU_MODIFY_ITEM_COUNT,
  MENU_EMPTY_BASKET,
  MENU_OPEN_DETAIL,
  MENU_CLOSE_DETAIL,
  MENU_OPEN_SPEC_SELECT,
  MENU_CLOSE_SPEC_SELECT
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
   * @param {Array} spec key: option index, value: selected option index
   */
  plus (item, spec) {
    const uniqKey = this._genKey(item, spec);
    const oldV = this.map.get(uniqKey) || { count: 0, unitPrice: this._calculateUnitPrice(item, spec), spec };
    const newV = { ...oldV, count: this._clamp(oldV.count + 1) };
    return new ImmutableBasket(
      this.map.set(uniqKey, newV)
    );
  }

  minus (item, spec) {
    const uniqKey = this._genKey(item, spec);
    const oldV = this.map.get(uniqKey) || { count: 0, unitPrice: this._calculateUnitPrice(item, spec), spec };
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
    return Object.entries(this.map.toObject()).map(([uniqKey, { unitPrice, count, spec }]) => {
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

  // since same dish with different selected specs should be treated as different dish, specs combined with dish name are used as key
  _genKey (item, specArray) {
    const { spec } = item;
    const specStr = specArray ? specArray.filter(o => !isNaN(o)).map((o, q) => spec[q].options[o].name).join('/') : '';
    return `${item.context.id}#${specStr}`;
  }

  _clone () {
    return new ImmutableBasket(this.map);
  }

  _clamp (v) {
    return Math.min(99, Math.max(0, v));
  }

  _calculateUnitPrice (item, specResult) {
    return item.price + (specResult || []).map((o, q) => o ? item.spec[q].options[o].delta : 0).reduce((acc, x) => acc + x, 0);
  }
}

export default handleActionsWithoutError({
  [MENU_UPDATE] (state, action) {
    const data = action.payload;
    const idMap = new Map();
    for (const arr of Object.values(data)) {
      for (const item of arr) {
        idMap.set(item.context.id, item);
      }
    }

    return {
      ...state,
      data: action.payload,
      categories: Object.keys(action.payload),
      idMap: idMap
    };
  },

  [MENU_MODIFY_ITEM_COUNT] (state, action) {
    const newState = { ...state };

    const { id, modifier, specResult } = action.payload;
    const item = state.idMap.get(id);

    const oldCount = item.context.count;
    item.context.count = state.basket._clamp(oldCount + modifier);

    if (modifier === 1) { // add
      newState.basket = newState.basket.plus(item, specResult || null);
    } else {
      newState.basket = newState.basket.minus(item, specResult || null);
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
  },

  [MENU_OPEN_SPEC_SELECT] (state, action) {
    const { id } = action.payload;
    return {
      ...state,
      selectSpecItem: id
    };
  },

  [MENU_CLOSE_SPEC_SELECT] (state, action) {
    return {
      ...state,
      selectSpecItem: null
    };
  }
}, {
  data: {},
  categories: [],
  idMap: new Map(),
  basket: new ImmutableBasket(),
  detailingItem: null, // item id
  selectSpecItem: null
});
