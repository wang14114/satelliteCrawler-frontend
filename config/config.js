import defaultSettings from './defaultSettings'; 

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; 

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
}

export default {
  plugins,
  block: {
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks', if you want to add default block of anti design
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: 'user',
              redirect: '/user/login',
              component: './user/login',
            },
            {
              name: 'login',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/invest/home',
              authority: ['admin', 'user'],
            },
            {
              name: 'invest',
              icon: 'dashboard',
              path: '/invest',
              routes: [
                {
                  name: 'home',
                  path: '/invest/home',
                  component: './invest/home',
                },
                {
                  name: 'assetAllocation',
                  path: '/invest/assetAllocation',
                  component: './invest/assetAllocation',
                },
                {
                  name: 'riskManagement',
                  path: '/invest/riskManagement',
                  component: 'develop',
                },
                {
                  name: 'managerSelection',
                  path: '/invest/managerSelection',
                  component: 'develop',
                },
                {
                  name: 'privateBanking',
                  path: '/invest/privateBanking',
                  component: 'develop',
                },
                {
                  name: 'traditionalInvestment',
                  path: '/invest/traditionalInvestment',
                  component: 'develop',
                },
                {
                  name: 'alternativeInvestment',
                  path: '/invest/alternativeInvestment',
                  component: 'develop',
                },
                {
                  name: 'realEstate',
                  path: '/invest/realEstate',
                  component: 'develop',
                },
                {
                  name: 'investmentBanking',
                  path: '/invest/investmentBanking',
                  component: 'develop',
                },
                {
                  name: 'financialAccounting',
                  path: '/invest/financialAccounting',
                  component: 'develop',
                },
                {
                  name: 'custodyReporting',
                  path: '/invest/custodyReporting',
                  component: 'develop',
                },
                {
                  name: 'fx',
                  path: '/invest/fx',
                  component: 'develop',
                },
                {
                  name: 'philanthropy',
                  path: '/invest/philanthropy',
                  component: 'develop',
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
                  component: 'develop',
                },
                {
                  name: 'conciergeandsecurity',
                  path: '/familyservice/conciergeandsecurity',
                  component: 'develop',
                },
                {
                  name: 'familyCounselling',
                  path: '/familyservice/familyCounselling',
                  component: 'develop',
                },
                {
                  name: 'familyGovernance',
                  path: '/familyservice/familyGovernance',
                  component: 'develop',
                },
                {
                  name: 'highvalueassetManagement',
                  path: '/familyservice/highvalueassetManagement',
                  component: 'develop',
                },
                {
                  name: 'newfamilybusiness',
                  path: '/familyservice/newfamilybusiness',
                  component: 'develop',
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
                  component: 'develop',
                },
                {
                  name: 'financialPlanning',
                  path: '/generalservice/financialPlanning',
                  component: 'develop',
                },
                {
                  name: 'taxPlanning',
                  path: '/generalservice/taxPlanning',
                  component: 'develop',
                },
                {
                  name: 'estatePlanning',
                  path: '/generalservice/estatePlanning',
                  component: 'develop',
                },
                {
                  name: 'legalServices',
                  path: '/generalservice/legalServices',
                  component: 'develop',
                },
                {
                  name: 'insurancePlanning',
                  path: '/generalservice/insurancePlanning',
                  component: 'develop',
                },
                {
                  name: 'trustManagement',
                  path: '/generalservice/trustManagement',
                  component: 'develop',
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
                  component: 'develop',
                },
                {
                  name: 'ITCosts',
                  path: '/administrativeservice/ITCosts',
                  component: 'develop',
                },
                {
                  name: 'officeOverheads',
                  path: '/administrativeservice/officeOverheads',
                  component: 'develop',
                },
                {
                  name: 'accounting',
                  path: '/administrativeservice/accounting',
                  component: 'develop',
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
                  component: 'develop',
                },
                {
                  name: 'accountType',
                  path: '/authorityManagement/accountType',
                  component: 'develop',
                },
              ],
            },

            {
              name: 'interface',
              icon: '',
              path: '/interface',
              routes: [
                {
                  name: 'tushare',
                  path: '/interface/tushare',
                  component: './interface/tushare',
                  //component: 'develop',
                },
                {
                  name: 'wind',
                  path: '/interface/wind',
                  component: 'develop',
                },
              ],
            },
            {
              component: 'develop',
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  
  
  proxy: {
    '/server/api/': {
      target: 'http://127.0.0.1:8080',
      //target: 'http://test.api.myfocuspro.com',
      changeOrigin: true,
     //pathRewrite: {
       // '^/server': '',
      //},
      
    },
  },
  
  
};
