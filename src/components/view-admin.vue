<template>
  <div class="view-admin--container">
    <div class="container--title">
      Admin List
      <el-button @click="addAdminHandler" size="small" class="costa-btn_blue add-admin--btn">Add User +</el-button>
    </div>
    <el-table :data="adminList" style="width: 100%" empty-text="No data">
      <el-table-column sortable label="Name" prop="name"></el-table-column>
      <el-table-column sortable label="Account" prop="account"></el-table-column>
      <el-table-column sortable label="Admin ID" prop="admin_id"></el-table-column>
      <el-table-column sortable label="Job Title" prop="job_title"></el-table-column>
      <el-table-column label="Operation">
        <template scope="scope">
          <!-- <el-button size="small" @click="deleteAdminHandler(scope)" style="color: red" type="text">Delete</el-button> -->
          <el-button size="small" @click="editAdmin(scope)" type="text">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="25%" title="Add User" :visible.sync="addUserDialogVisible">
      <div class="form-cell--container">
        <div class="form--title">Username</div>
        <el-input v-model="inputAccount" placeholder="input username"></el-input>
        <!-- <el-input v-model="adminDialog.account" placeholder="input username"></el-input> -->
      </div>
      <div class="form-cell--container">
        <div class="form--title">Password</div>
        <el-input v-model="inputPassword" placeholder="input password"></el-input>
        <!-- <el-input v-model="adminDialog.password" placeholder="input password"></el-input> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminUser()" size="small" class="costa-btn_blue">Confirm</el-button>
        <el-button size="small" @click="addUserDialogVisible = false" class="">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        adminList: [],
        addUserDialogVisible: false,
        adminDialog: {},
        inputAccount: '',
        inputPassword: '',
      };
    },
    mounted() {
      this.getAdminList();
    },
    methods: {
      getAdminList() {
        this.axios.get('Admin/getAdminList')
            .then((res) => {
              console.log(res.data);
              this.adminList = res.data;
            });
      },
      deleteAdminHandler(scope) {
        console.log(scope.row.admin_id);
        this.axios.get(`/Admin/deleteDataById?admin_id=${scope.row.admin_id}`)
            .then((res) => {
              console.log(res.data);
            });
      },
      editAdmin(scope) {
        console.log(scope.row);
        this.$router.push({
          name: 'editAdmin',
          params: {
            admin_id: scope.row.admin_id,
          },
        });
      },
      addAdminHandler() {
        this.addUserDialogVisible = true;
        this.generateAdminViewData();
      },
      generateAdminViewData() {
        this.axios.get('/Admin/generateAdminViewData')
            .then((res) => {
              console.log(res.data);
              this.adminDialog = res.data;
            });
      },
      addAdminUser() {
        const postData = {
          account: this.inputAccount,
          password: this.inputPassword,
        };
        this.axios.post('/Admin/updateAdmin', postData)
            .then(() => {
              this.getAdminList();
              this.addUserDialogVisible = false;
            });
      },
    },
  };
</script>
