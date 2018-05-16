import { ORDER_CREATE } from '../types';
import { createAction } from 'redux-actions';

export const createOrder = createAction(ORDER_CREATE, (...orders) => orders);
