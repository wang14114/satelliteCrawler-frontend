import request from '@/utils/request';

export async function fetchStockBasicList() {
  return request('/server/api/stock/stock_basic');
}

export async function fetchSummary() {
  return request('/server/api/assetAllocation/summary');
}

