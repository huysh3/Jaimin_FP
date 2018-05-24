<template>
  <div id="app">
    <el-row class="nav-bar--container">
      <el-col :span="4" class="nav-bar--left-part">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
          <section class="nav--header">
            <!-- <img class="costa--icon" src="http://images-1254092492.cosgz.myqcloud.com/2017-12-06-COSTA_LOGO.png.1.png" alt=""> -->
            <div class="header--title">Node Management</div>
            <div class="header--subtitle"></div>
          </section>
            <router-link
              class="nav--item"
              v-for="(item, $index) in navTree"
              :key="`${$index}`"
              :to="item.path">
              <el-menu-item :index="`${$index}`">
                <!-- <i class="el-icon-setting"></i> -->
                <span slot="title">{{item.label}}</span>
              </el-menu-item>
            </router-link>
        </el-menu>
      </el-col>
      <el-col :span="20" class="main--container">
        <section class="main--part-header">
          <!-- <span @click="logout">LOGOUT</span> -->
        </section>
        <transition name="slide-fade">
          <router-view class="main--body"></router-view>
        </transition>
      </el-col>
    </el-row>
    <el-dialog
      title="Login"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="dialog--body">
        <el-input style="margin-bottom: 1rem;" type="text">
          <template slot="prepend">Username</template>
        </el-input>
        <el-input style="margin-bottom: 1rem;" type="password">
          <template slot="prepend">Password</template>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      dialogVisible: false,
      selectShipModalStatus: false,
      currentShip: '',
      shipList: [],
      tripList: [],
      navTree: [{
        label: 'Company Info',
        path: '/companyInfo',
      }, {
        label: 'Product List',
        path: '/productList',
      }, {
        label: 'Qualification System',
        path: '/qsList',
      }, {
        label: 'Company Qualification List',
        path: '/companyQualificationList',
      }, {
        label: 'Truck List',
        path: '/truckList',
      }, {
        label: 'Tester List',
        path: '/testerList',
      }],
    };
  },
  watch: {
    currentShip(newVal) {
      this.$store.state.globalData.currentShip = newVal;
    },
  },
  mounted() {
    // this.getShipList();
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
