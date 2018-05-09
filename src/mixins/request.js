import wepy from 'wepy';
import request from '../lib/request';

export default class RequestMixin extends wepy.mixin {
  $http = request
}
