<template>
  <div class="truck-list--container">
    <el-table :data="tableData">
      <el-table-column width="100" prop="status" label="Status">
        <template scope="scope">
          <el-tag :type="scope.row.status == 'running' ? 'success' : 'danger'">
            {{scope.row.status}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="100" prop="id" label="Id"/>
      <el-table-column width="100" prop="host_id" label="Host Id"/>
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="image_name" label="Image Name"/>
      <el-table-column label="Operation">
        <template scope="scope">
          <el-button @click="$router.push({path: `/containerDetail/${scope.row.id}`})" style="margin-right: 20px;" type="text">Detail</el-button>
          <el-dropdown>
            <el-button type="text">
              Setting
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, $index) in dropdownList"
                :key="`${$index}`">
                {{item}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dropdownList: [
        'Restart',
        'Stop',
        'Pause',
        'Destory',
        'Scale',
        'Rename',
        'Stats',
        'Console',
        'Logs',
      ],
    };
  },
  mounted() {
    this.getContainerList();
  },
  methods: {
    getContainerList() {
      this.axios.get(`/containers?1=1&host_id=2`)
        .then((res) => {
          console.log(res);
          this.tableData = res.host;
        });
    },
  },
};
</script>

<style lang="less" scoped>
  .dot {
    width: 14px;
    height: 14px;
    display: inline-block;
    border-radius: 50%;
    position: relative;
    top: 2px;
    &.running {
      background-color: #63ca62;
    }
    &.exited {
      background-color: red;
    }
  }
</style>
