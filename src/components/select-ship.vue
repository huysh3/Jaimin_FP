<template>
  <div class="select-ship--container">
    <p class="title">Select a Cruise Ship</p>
    <section class="ship--list">
      <div class="ship--content">Atlantica</div>
      <div class="ship--content">Fortuna</div>
      <div class="ship--content">Serena</div>
      <div class="ship--content">Victoria</div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    mounted() {
      setTimeout(() => {
        this.getTest();
      }, 1000);
    },
    methods: {
      getTest() {
        this.axios.get('/Trip/test', {
          name: 'Guotie',
        }).then((res) => {
          console.log(res);
        });
      },
    },
  };
</script>

<style lang="less">
</style>
