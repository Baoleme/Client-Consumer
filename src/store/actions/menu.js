import { MENU_UPDATE, MENU_EMPTY_BASKET, MENU_MODIFY_ITEM_COUNT } from '../types';
import { createAction } from 'redux-actions';

export const updateMenu = createAction(MENU_UPDATE);

export const emptyBasket = createAction(MENU_EMPTY_BASKET);

export const modifyItemCount = createAction(MENU_MODIFY_ITEM_COUNT, (id, modifier) => ({ id, modifier }));
