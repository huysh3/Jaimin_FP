import Vue from 'vue';
import Router from 'vue-router';

// import selectShip from '../components/select-ship';
// import businessUnitList from '../components/business-unit-list';
// import activityList from '../components/activities-list';
// import bannerEdit from '../components/banner-edit';
// import announcementList from '../components/announcement-list';
// import tripList from '../components/trip-list';
// import tripEdit from '../components/trip-edit';
// import bannerList from '../components/banner-list';
// import viewSchedule from '../components/view-schedule';
// import portList from '../components/port-list';
// import unitList from '../components/unit-list';
// const selectShip = () => import('../components/select-ship');

const businessUnitList = () => import('../components/business-unit-list');
const activityList = () => import('../components/activities-list');
const bannerEdit = () => import('../components/banner-edit');
const announcementList = () => import('../components/announcement-list');
const tripList = () => import('../components/trip-list');
// const tripEdit = () => import('../components/trip-edit');
const bannerList = () => import('../components/banner-list');
const viewSchedule = () => import('../components/view-schedule');
const portList = () => import('../components/port-list');
const unitList = () => import('../components/unit-list');
const viewActivities = () => import('../components/view-activities');
const viewAdmin = () => import('../components/view-admin');
const editAdmin = () => import('../components/edit-admin');

const step1 = () => import('../components/step1-select-ship');
const step2 = () => import('../components/step2-select-unit');
const step3 = () => import('../components/step3-select-schedule');

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/:origin/ship',
      name: 'step1',
      component: step1,
    },
    {
      path: '/:origin/ship/:ship_id/unit',
      name: 'step2',
      component: step2,
    },
    {
      path: '/:origin/ship/:ship_id/unit/:unit_id/schedule',
      name: 'step3',
      component: step3,
    },
    {
      path: '/announcement-list/ship/:ship_id/unit/:unit_id/schedule/:schedule_id/:trip_id',
      name: 'announcement-list',
      component: announcementList,
    },
    {
      path: '/activity-list/ship/:ship_id/unit/:unit_id/schedule/:schedule_id/:trip_id',
      name: 'activity-list',
      component: activityList,
    },
    {
      path: '/banner-list/ship/:ship_id/unit/:unit_id/schedule/:schedule_id/:trip_id',
      name: 'banner-list',
      component: bannerList,
    },
    // {
    //   path: '/select-ship',
    //   name: 'selectShip',
    //   component: selectShip,
    // },
    {
      path: '/banner-edit',
      name: 'bannerEdit',
      component: bannerEdit,
    },
    {
      path: '/business-unit-list',
      name: 'businessUnitList',
      component: businessUnitList,
    },
    // {
    //   path: '/activity-list',
    //   name: 'activityList',
    //   component: activityList,
    // },
    // {
    //   path: '/announcement-list',
    //   name: 'announcementList',
    //   component: announcementList,
    // },
    {
      path: '/trip-list',
      name: 'tripList',
      component: tripList,
    },
    // {
    //   path: '/trip-edit/:trip_id',
    //   name: 'tripEdit',
    //   component: tripEdit,
    // },
    // {
    //   path: '/trip-add',
    //   name: 'tripAdd',
    //   component: tripEdit,
    // },
    {
      path: '/banner-list',
      name: 'bannerList',
      component: bannerList,
    },
    {
      path: '/view-schedule',
      name: 'viewSchedule',
      component: viewSchedule,
    },
    {
      path: '/port-list',
      name: 'portList',
      component: portList,
    },
    {
      path: '/unit-list',
      name: 'unitList',
      component: unitList,
    },
    {
      path: '/view-activities',
      name: 'viewActivities',
      component: viewActivities,
    },
    {
      path: '/view-admin',
      name: 'viewAdmin',
      component: viewAdmin,
    },
    {
      path: '/edit-admin/:admin_id',
      name: 'editAdmin',
      component: editAdmin,
    },
    {
      path: '/img-upload',
      name: 'imgUpload',
      component: () => import('../components/img-upload'),
    },
    {
      path: '/activity-management',
      name: 'activityManagement',
      component: () => import('../pages/activity-management'),
    },
    {
      path: '/announcement-management',
      name: 'announcementManagement',
      component: () => import('../pages/announcement-management'),
    },
    {
      path: '/banner-management',
      name: 'bannerManagement',
      component: () => import('../pages/banner-management'),
    },
    {
      path: '/view-trips',
      name: 'viewTrips',
      component: () => import('../pages/view-trips'),
    },
    {
      path: '/trip-add',
      name: 'tripAdd',
      component: () => import('../pages/trip-edit'),
    },
    {
      path: '/view-ports',
      name: 'viewPorts',
      component: () => import('../pages/view-ports'),
    },
    {
      path: '/view-business-units',
      name: 'viewBusinessUnits',
      component: () => import('../pages/view-business-units'),
    },
    {
      path: '/activity-library',
      name: 'activityLibrary',
      component: () => import('../pages/activity-library'),
    },
    {
      path: '/user-management',
      name: 'userManagement',
      component: () => import('../pages/user-management'),
    },
    {
      path: '/role-management',
      name: 'roleManagement',
      component: () => import('../pages/role-management'),
    },
    {
      path: '/announcement-library',
      name: 'announcementLibrary',
      component: () => import('../pages/announcement-library'),
    },
    {
      path: '/banner-library',
      name: 'bannerLibrary',
      component: () => import('../pages/banner-library'),
    },
    {
      path: '/wechat-update',
      name: 'wechatUpdate',
      component: () => import('../pages/wechat-update'),
    },
    {
      path: '*',
      redirect: '/activity-management',
    },
  ],
});
