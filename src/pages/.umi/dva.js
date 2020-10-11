import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'global', ...(require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/src/models/login.js').default) });
app.model({ namespace: 'setting', ...(require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/src/models/user.js').default) });
app.model({ namespace: 'model', ...(require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/src/pages/user/login/model.js').default) });
app.model({ namespace: 'model', ...(require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/src/pages/user/register/model.js').default) });
app.model({ namespace: 'model', ...(require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/src/pages/invest/home/model.tsx').default) });
app.model({ namespace: 'model', ...(require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/src/pages/invest/assetAllocation/model.tsx').default) });
app.model({ namespace: 'model', ...(require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/src/pages/interface/tushare/model.tsx').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
