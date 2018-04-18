<template>
  <div class="trip-list--container">
    <div class="select-ship--container">
      <section class="ship--list">
        <div
          class="ship--content"
          v-for="item in shipList"
          :key="item.ship_id"
          @click="getTripListByShipId(item.ship_id, tabStatus)">
            {{item.name}}
        </div>
      </section>
    </div>
    <section class="trip-list--header">
      <div>
        <el-radio-group size="small" v-model="tabStatus" @change="changeTrip">
          <el-radio-button name="active" label="active">Active Trips</el-radio-button>
          <el-radio-button name="history" label="history">Past Trips</el-radio-button>
        </el-radio-group>
        <!-- <div @click="changeTrip('active')" class="left-part header--title" :class="tabStatus == 'active' ? 'active' : ''">Active Trips</div>/
        <div @click="changeTrip('history')" class="right-part header--title" :class="tabStatus == 'history' ? 'active' : ''">Past Trips</div> -->
      </div>
      <el-button @click="addTrip()" class="costa-btn_blue">Add Trip +</el-button>
    </section>
    <el-table :data="tripList" style="width: 100%" empty-text="No data">
      <el-table-column sortable label="Date" prop="departure_date"></el-table-column>
      <el-table-column sortable label="Code" prop="code"></el-table-column>
      <el-table-column sortable label="Duration" prop="duration"></el-table-column>
      <el-table-column label="Operation">
        <template scope="scope">
          <el-button size="small" @click="deleteTripHandler(scope)" style="color: red" type="text">Delete</el-button>
          <el-button size="small" @click="editTrip(scope)" type="text">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tripList: [],
        shipList: [],
        tabStatus: 'active',
        shipId: 1,
      };
    },
    mounted() {
      this.getShipList();
      this.getTripListByShipId(this.shipId, this.tabStatus);
    },
    methods: {
      getShipList() {
        this.axios.get('/Ship/getShipList')
          .then((res) => {
            this.shipList = res.data;
          });
      },
      getTripListByShipId(shipId, historyStatus) {
        const history = historyStatus === 'history' ? 1 : 0;
        this.shipId = shipId;
        this.axios.get(`/Trip/getTripListByShipId?history=${history}&ship_id=${shipId}`)
            .then((res) => {
              console.log(res.data);
              this.tripList = res.data;
            });
      },
      changeTrip(params) {
        console.log(params);
        this.tabStatus = params;
        this.getTripListByShipId(this.shipId, this.tabStatus);
      },
      editTrip(scope) {
        console.log(scope.row.trip_id);
        this.$router.push({
          name: 'tripEdit',
          params: {
            trip_id: scope.row.trip_id,
          },
        });
      },
      addTrip() {
        this.$router.push({
          name: 'tripAdd',
        });
      },
      deleteTripHandler(scope) {
        console.log(scope.$index);
        console.log(scope.row.trip_id);
        this.$confirm('Please confirm you would like to delete this?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'error',
        }).then(() => {
          this.axios.get(`/Trip/deleteDataById?trip_id=${scope.row.trip_id}`)
              .then(() => {
                this.tripList.map((item, $index) => {
                  if (item.trip_id === scope.row.trip_id) {
                    this.tripList.splice($index, 1);
                  }
                  return true;
                });
              });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      },
    },
  };
</script>
