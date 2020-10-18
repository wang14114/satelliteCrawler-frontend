import request from '@/utils/request';

export async function fetchLaunchData() {
  return request('/server/api/satellite/launchData/');
}

export async function clearAllLaunchData() {
  return request('/server/api/satellite/clearLaunchData/', {
    method: 'POST',
  });
}

export async function crawlerLaunchData(params: any) {
  return request('/server/api/satellite/crawler/', {
    method: 'POST',
    data: params,
  });
}
