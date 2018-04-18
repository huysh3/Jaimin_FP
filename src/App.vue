<template>
  <div id="app">
    <el-row class="nav-bar--container">
      <el-col :span="4" class="nav-bar--left-part">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
          <section class="nav--header">
            <img class="costa--icon" src="http://images-1254092492.cosgz.myqcloud.com/2017-12-06-COSTA_LOGO.png.1.png" alt="">
            <div class="header--title">Content Management</div>
            <div class="header--subtitle"></div>
          </section>
          <el-submenu v-for="(item, $index) in navTree" :key="`${$index}`" :index="`${$index}`">
            <template slot="title">{{item.title}}</template>
            <router-link
              v-for="(child, $childIndex) in item.children"
              :key="`${$childIndex}`"
              :to="child.path">
              <el-menu-item
                :index="`${$index}-${$childIndex}`">
                {{child.label}}
              </el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" class="main--container">
        <section class="main--part-header">
          <el-select
            value-key="ship_id"
            v-model="currentShip"
            size="small"
            placeholder="Select Ship">
            <el-option
              v-for="item in shipList"
              :key="item.ship_id"
              :label="item.name"
              :value="item" />
          </el-select>
          <span @click="logout">LOGOUT</span>
        </section>
        <transition name="slide-fade">
          <router-view class="main--body"></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      selectShipModalStatus: false,
      currentShip: '',
      shipList: [],
      tripList: [],
      navTree: [{
        title: 'Content Management',
        children: [{
          label: 'Activities',
          path: '/activity-management',
        }, {
          label: 'Banner',
          path: '/banner-management',
        }, {
          label: 'Announcement',
          path: '/announcement-management',
        }, {
          label: 'Wechat Update',
          path: '/wechat-update',
        }],
      }, {
        title: 'Content Library',
        children: [{
          label: 'Activity Library',
          path: '/activity-library',
        }, {
          label: 'Announcement Library',
          path: '/announcement-library',
        }, {
          label: 'Banner Library',
          path: '/banner-library',
        }],
      }, {
        title: 'Trip Information',
        children: [{
          label: 'View Trips',
          path: '/view-trips',
        }, {
          label: 'View Ports',
          path: '/view-ports',
        }, {
          label: 'View Business Units',
          path: '/view-business-units',
        }],
      }, {
        title: 'User Management',
        children: [{
          label: 'User Management',
          path: '/user-management',
        }, {
          label: 'Role Management',
          path: '/role-management',
        }],
      }],
    };
  },
  watch: {
    currentShip(newVal) {
      this.$store.state.globalData.currentShip = newVal;
    },
  },
  mounted() {
    this.getShipList();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      window.location.href = 'https://costa.wechatify.com/CMS-V1/Admin/login';
    },
    bindSelectShipHandler(val) {
      console.log(val);
    },
    getShipList() {
      this.axios.get('/Ship/getShipList')
          .then((res) => {
            this.shipList = res.data;
            [this.currentShip] = this.shipList;
          });
    },
    getTripListByShipId(ship) {
      console.log(ship);
      this.axios.get(`/Schedule/getScheduleListByShipId?ship_id=${ship.ship_id}`)
          .then((res) => {
            this.$store.state.contentManagement.tripList = res.data;
            // this.tripList = res.data;
          });
    },
    saveScheduleStatus(scope) {
      console.log(scope);
    },
  },
};
</script>

<style lang="less">
html {
  font-size: 20px !important;
}

body {
  margin: 0;
}

a {
  text-decoration: none;
  color: #bfcbd9;
}

#app {
  width: 100vw;
  display: flex;
}

.main--part-header {
  background-color: #fff;
  margin: 0;
  font-weight: bold;
  padding: 0 2rem;
  height: 3.6rem;
  line-height: 3.6rem;
  box-shadow: 0 .1rem .2rem rgba(0, 0, 0, 0.2);
  // text-align: right;
  display: flex;
  justify-content: space-between;
  .breadcrumb {
    line-height: 3.6rem;
    font-size: 1rem;
    cursor: pointer;
  }
}

.main--container {
  background-color: #f0f0f0;
  min-height: 100vh;
  .costa-btn_blue {
    // height: 1.6rem;
    // margin-top: 1rem;
    // padding: .2rem 2rem;
  }
  .main--body {
    margin: 2rem;
    background-color: #fff;
    box-shadow: 0rem .1rem .4rem rgba(0, 0, 0, 0.2);
    padding: 1rem;
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
// .slide-fade-leave-active {
//   transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
// }
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}
</style>
