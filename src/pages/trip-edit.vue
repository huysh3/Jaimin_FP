<template>
  <div class="trip-edit--container">
    <section class="trip-edit--title">Add Trips</section>
    <div class="form-cell--container">
      <div class="form--title">Trip Code</div>
      <el-input v-model="tripInfo.code" size="small" placeholder="Ex: SE04180206"></el-input>
    </div>
    <div class="form-cell--container">
      <div class="form--title">Departure Date</div>
      <el-date-picker
        size="small"
        v-model="computedDepartureDate"
        type="date"
        placeholder="Select Date">
      </el-date-picker>
    </div>
    <div class="form-cell--container">
      <div class="form--title">Select Ship</div>
      <el-select size="small" class="port--selector" v-model="tripInfo.ship_id" placeholder="Select Ship">
        <el-option
          v-for="item in shipList"
          :key="item.ship_id"
          :label="item.name"
          :value="item.ship_id">
        </el-option>
      </el-select>
    </div>
    <div class="form-cell--container">
      <div class="form--title">Port</div>
      <el-select size="small" class="port--selector" v-model="tripInfo.port_id" placeholder="Port">
        <el-option
          v-for="item in portList"
          :key="item.port_id"
          :label="item.name"
          :value="item.port_id">
        </el-option>
      </el-select>
    </div>
    <el-row>
      <el-col :span="6">
        <div class="form-cell--container">
          <div class="form--title">Days</div>
          <el-input v-model="day">
            <template slot="prepend">
              <span @click="day <= 1 ? '' : day --">-</span>
            </template>
            <template slot="append" @click="day ++">
              <span @click="day ++">+</span>
            </template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="form-cell--container">
          <div class="form--title">Nights</div>
          <el-input v-model="night">
            <template slot="prepend">
              <span @click="night <= 1 ? '' : night --">-</span>
            </template>
            <template slot="append" @click="night ++">
              <span @click="night ++">+</span>
            </template>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <section class="route-manage--container">
      <div class="form--title">Route</div>
      <el-row class="route-input--content">
        <el-col :span="6" v-for="(n, $index) in day" :key="n">
          <el-select class="port--selector" v-model="tripInfo.schedule[$index].port_id" :placeholder="'Day ' + n">
            <el-option
              v-for="item in portList"
              :key="item.port_id"
              :label="item.name"
              :value="item.port_id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </section>
    <section class="options--container">
      <el-button @click="saveTripEditHandler" type="small" class="costa-btn_primary">Save</el-button>
      <el-button @click="$router.back()" type="small">Cancel</el-button>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        day: 0,
        night: 0,
        portList: [],
        portValue: '',
        tripInfo: '',
        shipList: [],
      };
    },
    watch: {
      day(newVal) {
        this.night = newVal - 1 ? newVal - 1 : 0;
      },
    },
    computed: {
      computedDepartureDate: {
        get() {
          console.log(this.tripInfo.departure_date);
          if (!this.tripInfo.departure_date) {
            return '';
          }
          const idxTime = new Date();
          idxTime.setFullYear(this.tripInfo.departure_date.split('-')[0]);
          idxTime.setMonth(Number(this.tripInfo.departure_date.split('-')[1]) - 1);
          idxTime.setDate(this.tripInfo.departure_date.split('-')[2]);
          console.log(idxTime);
          return idxTime;
        },
        set(val) {
          console.log(val);
          this.tripInfo.departure_date = `${val.getFullYear()}-${val.getMonth() + 1}-${val.getDate()}`;
          console.log(this.tripInfo.departure_date);
        },
      },
    },
    mounted() {
      this.getPortList();
      this.getShipList();
      if (this.$route.name === 'tripAdd') {
        this.getTripInfo('');
      } else {
        this.getTripInfo(this.$route.params.trip_id);
      }
    },
    methods: {
      getPortList() {
        this.axios.get('/Port/getPortList')
            .then((res) => {
              console.log(res.data);
              this.portList = res.data;
            });
      },
      getTripInfo(tripId) {
        const params = tripId ? `?trip_id=${tripId}` : '';
        this.axios.get(`/Trip/generateTripViewData${params}`)
            .then((res) => {
              console.log(res.data);
              this.idxRes = res.data;
              if (this.$route.name === 'tripEdit') {
                this.day = Number(res.data.duration.split('天')[0]);
                this.night = Number(res.data.duration.split('天')[1].split('夜')[0]);
              }
              for (let i = 0; i < 10; i += 1) {
                if (!this.idxRes.schedule[i]) {
                  this.idxRes.schedule[i] = {
                    schedule_id: '',
                    day: i + 1,
                    port_id: '',
                  };
                } else {
                  this.idxRes.schedule[i].name = '';
                }
              }
              this.tripInfo = this.idxRes;
            });
      },
      getShipList() {
        this.axios.get('/Ship/getShipList')
            .then((res) => {
              this.shipList = res.data;
            });
      },
      saveTripEditHandler() {
        console.log(this.tripInfo);
        const idxSchedule = this.tripInfo.schedule;
        this.tripInfo.schedule = [];
        this.tripInfo.duration = `${this.day}天${this.night}夜`;
        for (let i = 0; i < this.day; i += 1) {
          if (idxSchedule[i].port_id) {
            delete idxSchedule[i].name;
            this.tripInfo.schedule.push(idxSchedule[i]);
          }
        }
        this.axios.post('/Trip/updateTrip', this.tripInfo)
            .then((res) => {
              if (res.code === 1) {
                this.$router.back();
              }
            });
      },
    },
  };
</script>
