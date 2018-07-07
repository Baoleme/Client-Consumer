import { ORDER_CREATE, ORDER_SELECT_DETAILING, ORDER_REFRESH } from '../types';
import { createAction } from 'redux-actions';

export const createOrder = createAction(ORDER_CREATE, (...orders) => orders);
export const refreshOrder = createAction(ORDER_REFRESH, (...orders) => orders);
export const selectOrderDetail = createAction(ORDER_SELECT_DETAILING);
