import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { LaunchData } from './data';
import { fetchLaunchData, clearAllLaunchData, crawlerLaunchData } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: LaunchData;
  effects: {
    fetchLaunchData: Effect;
    clearAllLaunchData: Effect;
    crawlerLaunchData: Effect;
  };
  reducers: {
    save: Reducer;
    clear: Reducer;
  };
}

const initState = {
  launchDataList: [],
  status: '',
  type: '',
};

const Model: ModelType = {
  namespace: 'launchHistory',

  state: initState,

  effects: {
    *fetchLaunchData(_, { call, put }) {
      const response = yield call(fetchLaunchData);
      yield put({
        type: 'save',
        payload: {
          launchDataList: response.launchDataList,
          status: '',
          type: 'fetchLaunchData',
        },
      });
    },
    *clearAllLaunchData(_, { call, put }) {
      const response = yield call(clearAllLaunchData);
      yield put({
        type: 'save',
        payload: {
          status: response.status,
          type: 'clearAllLaunchData',
        },
      });
    },
    *crawlerLaunchData({ payload: param }, { call, put }) {
      const response = yield call(crawlerLaunchData, param);
      yield put({
        type: 'save',
        payload: {
          status: response.status,
          type: 'crawlerLaunchData',
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
