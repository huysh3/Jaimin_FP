import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/containers',
      component: () => import('../pages/containers'),
    },
    {
      path: '/images',
      component: () => import('../pages/images'),
    },
    {
      path: '/nodes',
      component: () => import('../pages/nodes'),
    },
    {
      path: '/registeries',
      component: () => import('../pages/registeries'),
    },
    {
      path: '/accounts',
      component: () => import('../pages/accounts'),
    },
    {
      path: '/events',
      component: () => import('../pages/events'),
    },
    {
      path: '/companyInfo',
      component: () => import('../pages/companyInfo'),
    },
    {
      path: '/testerList',
      component: () => import('../pages/testerList'),
    },
    {
      path: '*',
      redirect: '/containers',
    },
  ],
});
