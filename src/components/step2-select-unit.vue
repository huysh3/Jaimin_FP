<template>
  <div class="select-business-unit--container blocker-selector--container">
    <h1>Select Unit</h1>
    <section class="unit--list">
      <el-row class="unit--list">
        <el-col v-for="(item, index) in unitList" :key="`${index}idx`" :span="6" class="unit--item">
          <div @click="selectUnit(item)" class="item--name">{{item.name}}</div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unitList: [],
    };
  },
  mounted() {
    this.getUnitListByShipId(this.$route.params.ship_id);
    this.$store.state.breadcrumbState.schedule = {};
    this.$store.state.breadcrumbState.unit = {};
  },
  methods: {
    getUnitListByShipId(shipId) {
      this.axios.get(`/Unit/getUnitListByShipId?ship_id=${shipId}`)
          .then((res) => {
            this.unitList = res.data;
          });
    },
    selectUnit(unit) {
      this.$store.state.breadcrumbState.unit = unit;
      this.$router.push({
        name: 'step3',
        params: {
          origin: this.$route.params.origin,
          ship_id: this.$route.params.ship_id,
          unit_id: unit.unit_id,
        },
      });
    },
  },
};
</script>
