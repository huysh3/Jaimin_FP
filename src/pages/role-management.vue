<template>
  <div class="role-management--container">
    <header class="container--header">
      <el-input class="input-bar" placeholder="Input to Search.." size="small"></el-input>
      <el-button class="costa-btn_blue" size="small">Add +</el-button>
    </header>
    <el-table :data="roleList">
      <el-table-column sortable prop="id" label="ID"></el-table-column>
      <el-table-column sortable prop="name" label="Role"></el-table-column>
      <el-table-column sortable prop="user_linked" label="User Linked"></el-table-column>
      <el-table-column sortable label="Status">
        <template scope="scope">
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="Option">
        <template scope="scope">
          <el-button @click="editUserHandler(scope)" size="mini" type="text">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="40%" title="Role" :visible.sync="roleEditDialogVisible">
      <div class="input--container">
        <div class="title">Role Name</div>
        <el-input size="small" placeholder="Role Name"></el-input>
      </div>
      <div class="role-tree--container">
        <el-tree
          :data="data2"
          show-checkbox
          node-key="id">
        </el-tree>
      </div>
      <footer class="dialog--footer">
        <div class="left-part">
        </div>
        <div class="right-part">
          <el-button size="small" class="costa-btn_blue">Save</el-button>
          <el-button size="small">Cancel</el-button>
        </div>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1',
          }, {
            id: 10,
            label: '三级 1-1-2',
          }],
        }],
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1',
        }, {
          id: 6,
          label: '二级 2-2',
        }],
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1',
        }, {
          id: 8,
          label: '二级 3-2',
        }],
      }],
      value2: true,
      roleEditDialogVisible: false,
      roleList: [{
        id: '1',
        name: 'Admin',
        user_linked: '6',
      }, {
        id: '2',
        name: 'DTP',
        user_linked: '1',
      }, {
        id: '3',
        name: 'DTP2',
        user_linked: '11',
      }],
    };
  },
  mounted() {
  },
  methods: {
    getPermissionViewData(adminId) {
      this.axios.get(`/Admin/generateAdminViewData`, {
        admin_id: adminId,
      }).then((res) => {
        console.log(res.data);
        this.adminInfo = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
  .container--header {
    display: flex;
    padding-bottom: 1.4rem;
    .input-bar {
      padding-right: 1.4rem;
    }
    .costa-btn_blue {
      padding: .4rem 1.4rem;
    }
  }
  .role-tree--container {
    padding-top: 2rem;
  }
  .dialog--footer {
    display: flex;
    justify-content: space-between;
    padding-top: 1.4rem;
    .costa-btn_blue {
      padding: .4rem 1.4rem;
    }
    .left-part {

    }
    .right-part {

    }
  }
</style>
