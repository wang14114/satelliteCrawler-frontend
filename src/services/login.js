import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('/api/account/login', {
    method: 'GET',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
