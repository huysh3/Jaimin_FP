<template>
  <div class="select-ship--container blocker-selector--container">
    <h3>Select Ship</h3>
    <section class="ship--list">
      <div
        class="ship--content"
        v-for="item in shipList"
        :key="item.ship_id"
        @click="selectShip(item)">
          <div>{{item.name}}</div>
          <div class="bg-deco">{{item.name[0]}}</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shipList: [],
    };
  },
  mounted() {
    this.getShipList();
    this.$store.state.breadcrumbState.schedule = {};
    this.$store.state.breadcrumbState.unit = {};
    this.$store.state.breadcrumbState.ship = {};
  },
  methods: {
    getShipList() {
      this.axios.get('/Ship/getShipList')
          .then((res) => {
            console.log(res.data);
            this.shipList = res.data;
          });
    },
    selectShip(ship) {
      this.$store.state.breadcrumbState.ship = ship;
      this.$router.push({
        name: 'step2',
        params: {
          origin: this.$route.params.origin,
          ship_id: ship.ship_id,
        },
      });
    },
  },
};
</script>
