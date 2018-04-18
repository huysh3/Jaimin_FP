// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store';
import App from './App';
import router from './router';

import './static/app.less';

// development or production
let verPath = '/api/';
if (process.env.NODE_ENV === 'development') {
  verPath = '/api/';
}

Vue.prototype.ENV = process.env.NODE_ENV;

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });

Vue.prototype.axios = axios.create({
  baseURL: `http://122.152.226.42${verPath}`,
  withCredentials: false,
});

Vue.prototype.axios.interceptors.response.use((res) => {
  if (res.data.code === 1) {
    Vue.prototype.$message.success(res.config.url.split(`${verPath}`)[1].split('?')[0]);
    return res.data;
  } else if (res.data.code === 0) {
    Vue.prototype.$message.error(res.data.msg);
    return Promise.reject(res.data);
  }
  console.log(res.data);
  return res.data;
}, (error) => {
  Vue.prototype.$message.error(JSON.stringify(error));
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  template: '<App/>',
  components: { App },
});
