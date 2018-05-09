import {
  MENU_UPDATE,
  MENU_EMPTY_BASKET,
  MENU_MODIFY_ITEM_COUNT,
  MENU_OPEN_DETAIL,
  MENU_CLOSE_DETAIL,
  MENU_OPEN_SPEC_SELECT,
  MENU_CLOSE_SPEC_SELECT
} from '../types';
import { createAction } from 'redux-actions';

export const updateMenu = createAction(MENU_UPDATE);

export const emptyBasket = createAction(MENU_EMPTY_BASKET);

export const modifyItemCount = createAction(MENU_MODIFY_ITEM_COUNT, (id, modifier, specResult = null) => ({ id, modifier, specResult }));

export const openDetail = createAction(MENU_OPEN_DETAIL, id => ({ id }));

export const closeDetail = createAction(MENU_CLOSE_DETAIL);

export const openSpecSelect = createAction(MENU_OPEN_SPEC_SELECT, id => ({ id }));

export const closeSpecSelect = createAction(MENU_CLOSE_SPEC_SELECT);
