<template>
  <div class="unit-list--container">
    <div class="select-ship--container">
      <section class="ship--list">
        <div
          class="ship--content"
          v-for="item in shipList"
          :key="item.ship_id"
          @click="getUnitListByShipId(item.ship_id)">
            {{item.name}}
        </div>
      </section>
    </div>    
    <div class="top--content">
      <div class="port-list--title">Business Unit List</div>
      <el-button @click="addUnitHandler" size="small" class="costa-btn_blue">Add Unit+</el-button>
    </div>
    <el-table :data="unitList" empty-text="No data">
      <el-table-column sortable prop="unit_id" label="Unit id"></el-table-column>
      <el-table-column sortable prop="name" label="Unit name"></el-table-column>
      <el-table-column
        label="Operation"
        width="100">
        <template scope="scope">
          <el-button @click="deleteUnitHandler(scope)" style="color: red;" type="text" size="small">Delete</el-button>
          <el-button @click="editUnitHandler(scope)" type="text" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Add Unit" :visible.sync="unitDialogVisible" width="30%">
      <div class="form-cell--container">
        <div class="form--title">Unit Name</div>
        <el-input v-model="unitDialog.name" size="small"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveChangeHandler" size="small" class="costa-btn_blue">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        unitDialogVisible: false,
        unitDialog: {},
        unitList: [],
        unitTemplateData: {
          unit_id: '',
          name: '',
        },
        portDialog: '',
        shipList: [],
        shipId: '',
      };
    },
    mounted() {
      // this.getUnitListByShipId();
      this.getShipList();
    },
    methods: {
      getShipList() {
        this.axios.get('/Ship/getShipList')
            .then((res) => {
              this.shipList = res.data;
              console.log(res);
            });
      },
      getUnitListByShipId(shipId) {
        this.shipId = shipId;
        this.axios.get(`/Unit/getUnitListByShipId?ship_id=${shipId}`)
            .then((res) => {
              console.log(res.data);
              this.unitList = res.data;
            });
      },
      editUnitHandler(scope) {
        this.unitDialogVisible = true;
        this.unitDialogStatus = 'edit';
        console.log(scope.row.unit_id);
        console.log(scope.row.name);
        this.unitDialog = scope.row;
      },
      addUnitHandler() {
        this.unitDialogVisible = true;
        this.unitDialogStatus = 'add';
        this.unitDialog = this.unitTemplateData;
      },
      saveChangeHandler() {
        console.log(this.unitDialog);
        this.unitDialog.ship_id = this.shipId;
        this.axios.post('/Unit/updateUnit', this.unitDialog)
            .then((res) => {
              console.log(res.data);
              this.unitDialogVisible = false;
              this.getUnitListByShipId(this.shipId);
            });
      },
      deleteUnitHandler(scope) {
        console.log(scope.$index);
        console.log(scope.row.unit_id);
        this.$confirm('Please confirm you would like to delete this?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'error',
        }).then(() => {
          this.axios.get(`/Unit/deleteDataById?unit_id=${scope.row.unit_id}`)
              .then(() => {
                this.unitList.map((item, $index) => {
                  if (item.unit_id === scope.row.unit_id) {
                    this.unitList.splice($index, 1);
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
