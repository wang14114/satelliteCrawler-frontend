import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from 'C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/src/pages/.umi/LocaleWrapper.jsx';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: require('../../layouts/BlankLayout').default,
    routes: [
      {
        path: '/user',
        component: require('../../layouts/UserLayout').default,
        routes: [
          {
            path: '/user/user',
            redirect: '/user/login',
            component: require('../user/login').default,
            exact: true,
          },
          {
            name: 'login',
            path: '/user/login',
            component: require('../user/login').default,
            exact: true,
          },
          {
            name: 'register-result',
            path: '/user/register-result',
            component: require('../user/register-result').default,
            exact: true,
          },
          {
            name: 'register',
            path: '/user/register',
            component: require('../user/register').default,
            exact: true,
          },
          {
            component: require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/',
        component: require('../../layouts/BasicLayout').default,
        Routes: [require('../Authorized').default],
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/rocketlaunch/history',
            authority: ['admin', 'user'],
            exact: true,
          },
          {
            name: 'home',
            path: '/home',
            routes: [
              {
                name: 'dashboard',
                path: '/home/dashboard',
                component: require('../develop').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: 'rocketLaunch',
            path: '/rocketlaunch',
            routes: [
              {
                name: 'launchHistory',
                path: '/rocketlaunch/history',
                component: require('../rocketLaunch/launchHistory').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: require('../develop').default,
            exact: true,
          },
          {
            component: require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('C:/Users/wang1/Desktop/docs/satellite/satelliteCrawler-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
