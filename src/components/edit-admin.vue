<template>
  <div class="edit-admin--container">
    <div class="container--title">Edit User Role</div>
    <div class="form-cell--container">
      <div class="form--title">
        User Name
        <el-button @click="changePasswordHandler" style="margin-left: 2rem;" type="text">Change Password</el-button>
      </div>
      <el-input v-model="adminInfo.account" size="small"></el-input>
    </div>
    <!-- <div class="form-cell--container">
      <div class="form--title">User Password</div>
      <el-input v-model="adminInfo.password" size="small"></el-input>
    </div> -->
    <div class="form--cotnainer">
      <div class="form-cell--container">
        <div class="form--title">Job Title</div>
        <el-input v-model="adminInfo.job_title" size="small"></el-input>
      </div>
    </div>
    <div class="form--container">
      <div class="form-cell--container">
        <div class="form--title">Name</div>
        <el-input v-model="adminInfo.name" size="small"></el-input>
      </div>
    </div>
    <!-- <div class="form--container">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="form-cell--container">
            <div class="form--title">User Name</div>
            <el-input v-model="adminInfo.account" size="small"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="form-cell--container">
            <div class="form--title">User Password</div>
            <el-input v-model="adminInfo.password" size="small"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="form--cotnainer">
          <div class="form-cell--container">
            <div class="form--title">Job Title</div>
            <el-input v-model="adminInfo.job_title" size="small"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="form--cotnainer">
          <div class="form-cell--container">
            <div class="form--title">Name</div>
            <el-input v-model="adminInfo.name" size="small"></el-input>
          </div>
        </div>
      </el-col>
    </el-row> -->

    <el-input v-model="treeFilter" style="width: 12rem; margin-bottom: 1rem;" size="small" placeholder="Input Keywords to filter"></el-input>
    <el-tree
      :data="adminInfo.permission"
      show-checkbox
      node-key="id"
      ref="tree"
      @check-change="handleNodeClick"
      :filter-node-method="filterNode"
      :props="defaultProps">
    </el-tree>
    <div class="options--container">
      <!-- <el-button @click="addActivityHandler" size="small">Add Activity +</el-button> -->
      <el-button @click="saveContentHandler" class="costa-btn_blue" size="small">Save</el-button>
      <!-- <el-button @click="changeTemplateHandler" class="costa-btn_blue" size="small">Change Template</el-button> -->
      <!-- <el-button @click="saveTemplateHandler" class="costa-btn_blue" size="small">Save as a New Template</el-button> -->
      <el-button @click="cancelHandler" size="small">Cancel</el-button>
    </div>
  </div>
</template>

<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];

  export default {
    data() {
      return {
        adminInfo: {},
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true,
        data2: [{
          id: 1,
          label: 'Business Unit',
          status: '0',
          children_list: [{
            id: 2,
            label: '1-1 Food',
            status: '0',
            children_list: [{
              id: 3,
              label: '读',
              status: '1',
            }, {
              id: 4,
              label: '写',
              status: '0',
            }],
          }, {
            id: 5,
            label: '1-2 SPA',
            status: '0',
            children_list: [{
              id: 6,
              label: '读',
              status: '0',
            }, {
              id: 7,
              label: '写',
              status: '0',
            }],
          }],
        }, {
          id: 8,
          label: '一级 2',
          status: '0',
          children_list: [{
            id: 9,
            label: '二级 2-1',
            status: '1',
          }, {
            id: 10,
            label: '二级 2-2',
            status: '1',
          }],
        }, {
          id: 11,
          label: '一级 3',
          status: '0',
          children_list: [{
            id: 12,
            label: '二级 3-1',
            status: '1',
          }, {
            id: 13,
            label: '二级 3-2',
            status: '0',
          }],
        }],
        defaultProps: {
          children: 'children_list',
          label: 'label',
        },
        treeFilter: '',
      };
    },
    watch: {
      treeFilter(val) {
        this.$refs.tree.filter(val);
      },
    },
    mounted() {
      // this.getAdminViewData(this.$route.params.admin_id);
      console.log(this.adminInfo.permission);
      this.getPermissionViewData(this.$route.params.admin_id);
    },
    methods: {
      filterNode(value, data) {
        if (!value) {
          return true;
        }
        return data.label.indexOf(value) !== -1;
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        const checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      // getAdminViewData(adminId) {
      //   this.axios.get(`Admin/generateAdminViewData?admin_id=${adminId}`)
      //       .then((res) => {
      //         this.adminInfo = res.data;
      //         console.log(res.data);
      //       });
      // },
      getPermissionViewData(adminId) {
        this.axios.get(`/Admin/generateAdminViewData?admin_id=${adminId}`)
            .then((res) => {
              this.adminInfo = res.data;
              this.recursionTree(res.data);
              // const idxData = res.data;
              // idxData.map((item) => {
              //   console.log(item);
              //   return true;
              // });
              const idxArr = [];
              const idxList = this.adminInfo.permission;
              for (let i = 0; i < idxList.length; i += 1) {
                if (idxList[i].children_list) {
                  if (idxList[i].status === '1') {
                    idxArr.push(idxList[i].id);
                  }
                  for (let j = 0; j < idxList[i].children_list.length; j += 1) {
                    if (idxList[i].children_list[j].status === '1') {
                      idxArr.push(idxList[i].children_list[j].id);
                    }
                    if (idxList[i].children_list[j].children_list) {
                      for (let k = 0; k < idxList[i].children_list[j].children_list.length; k += 1) {
                        if (idxList[i].children_list[j].children_list[k].status === '1') {
                          idxArr.push(idxList[i].children_list[j].children_list[k].id);
                        }
                      }
                    }
                  }
                }
              }
              console.log(idxArr);
              this.$refs.tree.setCheckedKeys(idxArr);
            });
      },
      handleNodeClick() {
        // console.log(`${data.id} ----------> ${data.status}`);
        const idxTree = this.adminInfo.permission;
        for (let i = 0; i < idxTree.length; i += 1) {
          idxTree[i].status = 0;
          if (idxTree[i].children_list) {
            for (let j = 0; j < idxTree[i].children_list.length; j += 1) {
              console.log(`${idxTree[i].children_list[j].label}-----------${idxTree[i].children_list[j].status}`);
              idxTree[i].children_list[j].status = 0;
              if (idxTree[i].children_list[j].children_list) {
                for (let k = 0; k < idxTree[i].children_list[j].children_list.length; k += 1) {
                  idxTree[i].children_list[j].children_list[k].status = 0;
                }
              }
            }
          }
        }
        for (let i = 0; i < this.$refs.tree.getCheckedNodes().length; i += 1) {
          // console.log(`
          //   ${this.$refs.tree.getCheckedNodes()[i].label}
          //   ====
          //   ${this.$refs.tree.getCheckedNodes()[i].status}
          // `);
          this.$refs.tree.getCheckedNodes()[i].status = '1';
        }
      },
      saveContentHandler() {
        this.handleNodeClick();
        console.log(this.adminInfo.permission);
        this.axios.post('/Admin/updateAdmin', this.adminInfo)
            .then((res) => {
              console.log(res.data);
              this.$router.back();
            });
      },
      recursionTree() {
      },
      cancelHandler() {
        this.handleNodeClick();
        // console.log(this.$refs.tree.getCheckedNodes());
        console.log(this.adminInfo.permission);
        this.$router.back();
      },
      changePasswordHandler() {
        this.$prompt('Please Input New Password', 'Remind', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then(({ value }) => {
          const postData = {
            admin_id: this.adminInfo.admin_id,
            account: this.adminInfo.account,
            password: value,
          };
          this.axios.post('/Admin/changePassword', postData)
              .then((res) => {
                console.log(res);
              });
        }).catch(() => {
          console.log('取消');
        });
      },
    },
  };
</script>
