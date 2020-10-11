import { routerRedux } from 'dva/router';
import { accountLogin, getFakeCaptcha } from './service';
import { getPageQuery, setAuthority } from './utils/utils';
import  CryptoJS  from 'crypto-js'

const Model = {
  namespace: 'userLogin',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      
      /*test encyrption -- start*/
      let result = ""
      const key = CryptoJS.enc.Base64.parse('abcdabcdabcdabcd')
      var iv =  CryptoJS.enc.Base64.parse('1012132405963708')
      
      result = CryptoJS.AES.encrypt(payload.password,key,{ 
                   iv: iv,
                   mode: CryptoJS.mode.ECB,  
                   padding: CryptoJS.pad.Pkcs7 
              });
      result = result.ciphertext.toString()
      payload.password = result
      /*test encyrption -- end*/

      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
      
      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        console.log(urlParams);
        console.log(params);
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }else{
          window.location.href=urlParams.origin;
          return;
        }

        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
