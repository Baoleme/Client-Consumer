import { createAction } from 'redux-actions';
// import { RESTAURANT_UPDATE } from '../types';
import { MENU_UPDATE } from '../types';
import request from '../../lib/request';

// export const updateRestaurant = createAction(RESTAURANT_UPDATE);

export const loadEnvironment = createAction(MENU_UPDATE, async (rid, tid) => {
  const { data } = await request(`/restaurant/${rid}/dish`);
  return data;
});
