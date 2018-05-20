<template>
  <div class="truck-list--container">
    <el-button @click="addHandler" type="primary" size="small">Create +</el-button>
    <el-table :data="tableData">
      <el-table-column prop="id" label="Id"/>
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="number" label="Number"/>
      <el-table-column prop="type" label="Type"/>
      <el-table-column prop="start_time" label="Start Time"/>
      <el-table-column prop="status" label="Status">
        <template scope="scope">
          <el-tag v-if="scope.row.status == '一级'" type="success">{{scope.row.status}}</el-tag>
          <el-tag v-if="scope.row.status == '良好'" type="warn">{{scope.row.status}}</el-tag>
          <el-tag v-if="scope.row.status != '一级' && scope.row.status != '良好'">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template scope="scope">
          <!-- <el-button @click="editTesterHandler(scope)" type="text">Edit</el-button> -->
          <el-button @click="deleteTesterHandler(scope)" type="text" style="color: red">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Edit Tester"
      :visible.sync="truckDialogVisible"
      width="30%">
      <div class="dialog--body">
        <el-input class="dialog-input" v-model="truckDialog.name" placeholder="Name"></el-input>
        <el-input class="dialog-input" v-model="truckDialog.number" placeholder="Number"></el-input>
        <el-input class="dialog-input" v-model="truckDialog.type" placeholder="Type"></el-input>
        <el-input class="dialog-input" v-model="truckDialog.status" placeholder="Status"></el-input>
        <el-input class="dialog-input" v-model="truckDialog.start_time" placeholder="Start Time"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="truckDialogVisible = false">Cancel</el-button>
        <el-button @click="dialogConfirm()" type="primary">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

const dataStructure = {
  name: '',
  number: '',
  type: '',
  status: '',
  currentId: '',
  start_time: '',
};

export default {
  data() {
    return {
      tableData: [],
      truckDialogVisible: false,
      truckDialog: dataStructure,
    };
  },
  mounted() {
    this.getTruckList();
  },
  methods: {
    getTruckList() {
      axios.get(`http://www.hanligas.com/ajax/get/truck_list`)
          .then((res) => {
            console.log(res);
            this.tableData = res.data;
          });
    },
    addHandler() {
      this.truckDialogVisible = true;
    },
    editTesterHandler(scope) {
      this.truckDialogVisible = true;
      this.truckDialog = JSON.parse(JSON.stringify(scope.row));
      this.truckDialog.currentId = scope.row.id;
    },
    deleteTesterHandler(scope) {
      this.$confirm('确认删除该车辆？')
        .then(() => {
        this.axios.get(`delete/delete_truck?id=${scope.row.id}`)
            .then(() => {
              this.getTruckList();
            });
        })
        .catch(() => false);
    },
    dialogConfirm() {
      console.log(this.truckDialog);
      this.axios.get(`post/add_truck?name=${this.truckDialog.name}&type=${this.truckDialog.type}&status=${this.truckDialog.status}&number=${this.truckDialog.number}&start_time=${this.truckDialog.start_time}`)
        .then(() => {
          debugger;
          this.truckDialogVisible = false;
          this.getTruckList();
        });
      // this.truckDialogVisible = false;
      // this.tableData.map((item, index) => {
      //   console.log(item.id, this.truckDialog.currentId);
      //   if (String(item.id) === String(this.truckDialog.currentId)) {
      //     console.log(item);
      //     this.$set(this.tableData, index, this.truckDialog);
      //   }
      //   return true;
      // });
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-input {
  margin-bottom: .7rem;
}
</style>
