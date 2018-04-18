<template>
  <div class="user-management--container">
    <div class="container--header">
      <el-input size="small" class="input-bar" placeholder="Input To Search.."></el-input>
      <el-button size="small" class="costa-btn_blue" @click="addUserHandler">Add +</el-button>
    </div>
    <el-table :data="adminList">
      <el-table-column sortable prop="admin_id" label="ID"></el-table-column>
      <el-table-column sortable prop="account" label="Account"></el-table-column>
      <el-table-column sortable prop="name" label="Name"></el-table-column>
      <el-table-column sortable prop="job_title" label="Job Title"></el-table-column>
      <el-table-column sortable prop="status" label="Status">
        <template scope="scope">
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="Operation">
        <template scope="scope">
          <el-button @click="editUserHandler(scope)" type="text">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Add User" width="40%" :visible.sync="addUserDialogVisible">
      <div class="dialog--body">
        <div class="input--container">
          <div class="title">Account</div>
          <el-input size="small" v-model="addUserDialogData.account"></el-input>
        </div>
        <div class="input--container">
          <div class="title">Password</div>
          <el-input size="small" v-model="addUserDialogData.password"></el-input>
        </div>
        <div class="input--container">
          <div class="title">Name</div>
          <el-input size="small" v-model="addUserDialogData.name"></el-input>
        </div>
        <div class="input--container">
          <div class="title">Job Title</div>
          <el-input size="small" v-model="addUserDialogData.job_title"></el-input>
        </div>
        <div class="input--container">
          <div class="title">Select Role</div>
          <el-select
            class="role--selector"
            size="small"
            v-model="addUserDialogData.role"
            placeholder="Select Role">
            <el-option
              v-for="item in roleList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="input--container">
          <div class="title">Boat Privilege</div>
          <el-checkbox-group
            v-model="addUserDialogData.ship_privilege">
            <el-checkbox v-for="ship in shipList" :label="ship" :key="ship">{{ship}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="dialog--footer">
        <div class="left-part"></div>
        <div class="right-part">
          <el-button @click="saveUserHandler('add')" size="small" class="costa-btn_blue">Save</el-button>
          <el-button @click="addUserDialogVisible = false" size="small">Cancel</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="Edit User" width="40%" :visible.sync="editUserDialogVisible">
      <div class="dialog--body">
        <div class="input--container">
          <div class="title">Account</div>
          <el-input size="small" disabled v-model="editUserDialogData.account"></el-input>
        </div>
        <div class="input--container">
          <div class="title">Name</div>
          <el-input size="small" v-model="editUserDialogData.name"></el-input>
        </div>
        <div class="input--container">
          <div class="title">Job Title</div>
          <el-input size="small" v-model="editUserDialogData.job_title"></el-input>
        </div>
        <div class="input--container">
          <div class="title">Role</div>
          <el-select
            class="role--selector"
            size="small"
            v-model="editUserDialogData.role"
            placeholder="Select Role">
            <el-option
              v-for="item in roleList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="input--container">
          <div class="title">Boat Privilege</div>
          <el-checkbox-group
            v-model="editUserDialogData.ship_privilege">
            <el-checkbox v-for="ship in shipList" :label="ship" :key="ship">{{ship}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="dialog--footer">
        <div class="left-part">
          <el-button size="small" type="text">Change Password</el-button>
        </div>
        <div class="right-part">
          <el-button @click="saveUserHandler('edit')" size="small" class="costa-btn_blue">Save</el-button>
          <el-button @click="editUserDialogVisible = false" size="small">Cancel</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const roleList = ['roleA', 'roleB', 'roleC'];

const addUserDialogData = {
  admin_id: '',
  account: '',
  password: '',
  name: '',
  job_title: '',
  status: '',
  role: '',
  ship_privilege: [],
};

export default {
  data() {
    return {
      shipList: ['Atlantica', 'Fortuna', 'Serena', 'Victoria'],
      ship: [],
      value2: false,
      addUserDialogVisible: false,
      editUserDialogVisible: false,
      adminList: [],
      addUserDialogData,
      roleList,
      editUserDialogData: addUserDialogData,
      editIndex: '',
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
    addUserHandler() {
      this.addUserDialogData = addUserDialogData;
      this.addUserDialogVisible = true;
    },
    saveUserHandler(type) {
      if (type === 'add') {
        this.adminList.push(this.addUserDialogData);
        this.addUserDialogVisible = false;
      }
      if (type === 'edit') {
        this.adminList.map((item, $index) => {
          if (item.admin_id === this.editUserDialogData.admin_id) {
            this.$set(this.adminList, $index, this.editUserDialogData);
          }
          return item;
        });
        this.editUserDialogVisible = false;
      }
    },
    editUserHandler(scope) {
      console.log(scope.row);
      this.editUserDialogData = JSON.parse(JSON.stringify(scope.row));
      this.editUserDialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
  .container--header {
    display: flex;
    padding-bottom: 1.4rem;
    .costa-btn_blue {
      padding: .4rem 1.4rem;
    }
  }
  .input-bar {
    padding-right: 1.4rem;
  }
  .costa-btn_blue {
    padding: .4rem 1.4rem;
  }
  .input--container {
    margin-bottom: .7rem;
  }
  .input--container {
    padding-right: 2rem;
  }
  .dialog--footer {
    display: flex;
    justify-content: space-between;
    .left-part {
    }
    .right-part {
    }
  }
  // .role--selector {
  //   width: 100%;
  // }
</style>
