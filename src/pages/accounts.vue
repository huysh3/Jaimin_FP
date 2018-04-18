<template>
  <div class="truck-list--container">
    Truck List
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.getContainerList();
  },
  methods: {
    getContainerList() {
      this.axios.get(`/containers?host_id=2`)
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style lang="less" scoped>

</style>
