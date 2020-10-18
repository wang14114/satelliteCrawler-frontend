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
import RendererWrapper0 from 'C:/Users/wang1/Desktop/docs/family office/focus/src/pages/.umi-production/LocaleWrapper.jsx';

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
            path: '/user',
            redirect: '/user/login',
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
            redirect: '/invest/home',
            authority: ['admin', 'user'],
            exact: true,
          },
          {
            name: 'invest',
            icon: 'dashboard',
            path: '/invest',
            routes: [
              {
                name: 'home',
                path: '/invest/home',
                component: require('../invest/home').default,
                exact: true,
              },
              {
                name: 'assetAllocation',
                path: '/invest/assetAllocation',
                component: require('../invest/assetAllocation').default,
                exact: true,
              },
              {
                name: 'riskManagement',
                path: '/invest/riskManagement',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'managerSelection',
                path: '/invest/managerSelection',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'privateBanking',
                path: '/invest/privateBanking',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'traditionalInvestment',
                path: '/invest/traditionalInvestment',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'alternativeInvestment',
                path: '/invest/alternativeInvestment',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'realEstate',
                path: '/invest/realEstate',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'investmentBanking',
                path: '/invest/investmentBanking',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'financialAccounting',
                path: '/invest/financialAccounting',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'custodyReporting',
                path: '/invest/custodyReporting',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'fx',
                path: '/invest/fx',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'philanthropy',
                path: '/invest/philanthropy',
                component: require('../develop').default,
                exact: true,
              },
            ],
          },
          {
            name: 'family',
            icon: 'table',
            path: '/familyservice',
            routes: [
              {
                name: 'home',
                path: '/familyservice/home',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'conciergeandsecurity',
                path: '/familyservice/conciergeandsecurity',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'familyCounselling',
                path: '/familyservice/familyCounselling',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'familyGovernance',
                path: '/familyservice/familyGovernance',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'highvalueassetManagement',
                path: '/familyservice/highvalueassetManagement',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'newfamilybusiness',
                path: '/familyservice/newfamilybusiness',
                component: require('../develop').default,
                exact: true,
              },
            ],
          },
          {
            name: 'general',
            icon: 'user',
            path: '/generalservice',
            routes: [
              {
                name: 'home',
                path: '/generalservice/home',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'financialPlanning',
                path: '/generalservice/financialPlanning',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'taxPlanning',
                path: '/generalservice/taxPlanning',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'estatePlanning',
                path: '/generalservice/estatePlanning',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'legalServices',
                path: '/generalservice/legalServices',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'insurancePlanning',
                path: '/generalservice/insurancePlanning',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'trustManagement',
                path: '/generalservice/trustManagement',
                component: require('../develop').default,
                exact: true,
              },
            ],
          },
          {
            name: 'administrative',
            icon: 'highlight',
            path: '/administrativeservice',
            routes: [
              {
                name: 'home',
                path: '/administrativeservice/home',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'ITCosts',
                path: '/administrativeservice/ITCosts',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'officeOverheads',
                path: '/administrativeservice/officeOverheads',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'accounting',
                path: '/administrativeservice/accounting',
                component: require('../develop').default,
                exact: true,
              },
            ],
          },
          {
            name: 'authorityManagement',
            icon: 'book',
            path: '/authorityManagement',
            routes: [
              {
                name: 'userProfile',
                path: '/authorityManagement/userProfile',
                component: require('../develop').default,
                exact: true,
              },
              {
                name: 'accountType',
                path: '/authorityManagement/accountType',
                component: require('../develop').default,
                exact: true,
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
        ],
      },
    ],
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

  componentDidMount() {
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
