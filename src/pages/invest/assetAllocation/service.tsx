import request from '@/utils/request';

export async function fetchDetail() {
  return request('/server/api/assetAllocation/detail');
}

export async function fetchSummary() {
  return request('/server/api/assetAllocation/summary');
}

