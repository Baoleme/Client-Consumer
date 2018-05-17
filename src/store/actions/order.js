import { ORDER_CREATE, ORDER_SELECT_DETAILING } from '../types';
import { createAction } from 'redux-actions';

export const createOrder = createAction(ORDER_CREATE, (...orders) => orders);

export const selectOrderDetail = createAction(ORDER_SELECT_DETAILING);
