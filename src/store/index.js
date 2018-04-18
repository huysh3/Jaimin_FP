import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutations-type';
// import * as actions from './actions';

Vue.use(Vuex);

const breadcrumbState = new Vuex.Store({
  state: {
    ship: {},
    unit: {},
    schedule: {},
  },
  mutations: {
    [types.SET_SHIP](state, ship) {
      state.ship = ship;
    },
    setUnit(unit) {
      this.state.unit = unit;
    },
    setSchedule(schedule) {
      this.state.schedule = schedule;
    },
  },
});

const globalData = new Vuex.Store({
  state: {
    currentShip: '',
  },
});

const contentManagement = new Vuex.Store({
  state: {
    currentShip: '',
    currentUnit: '',
    tripList: '',
  },
});

const activityManagement = new Vuex.Store({
  state: {
    activityInfoInputDialogVisible: false,
    activityLibraryDialogVisible: false,
    activityTplTableDialogVisible: false,
    bannerDialogVisible: false,
    linkActivityListDialogVisible: false,
    announcementDialogVisible: false,
  },
  mutations: {
    [types.SET_SHIP](state, ship) {
      state.ship = ship;
    },
    setUnit(unit) {
      this.state.unit = unit;
    },
    setSchedule(schedule) {
      this.state.schedule = schedule;
    },
  },
  actions: {

  },
});

const store = new Vuex.Store({
  modules: {
    breadcrumbState,
    activityManagement,
    globalData,
    contentManagement,
  },
});

export default store;
