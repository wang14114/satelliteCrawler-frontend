import request from '@/utils/request';
export async function query() {
  return request('/server/api/users');
}
export async function queryCurrent() {
  return request('/server/api/account/currentUser');
}
export async function queryNotices() {
  return request('/server/api/notices');
}
