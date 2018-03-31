import { handleActions } from 'redux-actions';
import { USER_UPDATE } from '../types/user';

export default handleActions({
  [USER_UPDATE] (state, action) {
    return {
      ...state,
      ...action.payload
    };
  }
}, {
  nickName: '登录中...',
  avatarUrl: '', // TODO: add default avatar
  openid: ''
});
