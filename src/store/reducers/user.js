import { handleActionsWithoutError } from '../lib';
import { USER_UPDATE } from '../types/user';

export default handleActionsWithoutError({
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
