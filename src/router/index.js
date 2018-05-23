import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    // {
    //   path: '/containers',
    //   component: () => import('../pages/containers'),
    // },
    // {
    //   path: '/containerDetail/:container_id',
    //   component: () => import('../pages/containerDetail'),
    // },
    // {
    //   path: '/images',
    //   component: () => import('../pages/images'),
    // },
    // {
    //   path: '/nodes',
    //   component: () => import('../pages/nodes'),
    // },
    // {
    //   path: '/registeries',
    //   component: () => import('../pages/registeries'),
    // },
    // {
    //   path: '/accounts',
    //   component: () => import('../pages/accounts'),
    // },
    // {
    //   path: '/logs',
    //   component: () => import('../pages/logs'),
    // },
    {
      path: '/companyInfo',
      component: () => import('../pages/companyInfo'),
    },
    {
      path: '/testerList',
      component: () => import('../pages/testerList'),
    },
    {
      path: '/truckList',
      component: () => import('../pages/truckList'),
    },
    {
      path: '/dashboard',
      component: () => import('../pages/dashboard'),
    },
    {
      path: '/companyQualificationList',
      component: () => import('../pages/CompanyQualificationList'),
    },
    {
      path: '/qsList',
      component: () => import('../pages/QS'),
    },
    {
      path: '/productList',
      component: () => import('../pages/ProductList'),
    },
    {
      path: '*',
      redirect: '/truckList',
    },
  ],
});
