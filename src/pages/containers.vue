<template>
  <div class="truck-list--container">
    <el-button
      @click="createHandler"
      size="small"
      type="primary"
    >Create +</el-button>
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
            <el-button style="color: red" type="text" @click="deleteHandler(scope)">
              Delete
            </el-button>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Create Container"
      :visible.sync="infoInputDialogVisible"
      width="30%"
    >
      <el-row :gutter="20" class="dialog--body">
        <el-col :span="24">
          <el-input v-model="containerData.status" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Status</template>
          </el-input>
        </el-col>
        <el-col :span="24">
          <el-input v-model="containerData.name" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Name</template>
          </el-input>
        </el-col>
        <el-col :span="24">
          <el-input v-model="containerData.host_id" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Host Id</template>
          </el-input>
        </el-col>
        <el-col :span="24">
          <el-input v-model="containerData.image_name" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Image Name</template>
          </el-input>
        </el-col>

        <!-- <el-col :span="8">
          <el-input v-model="containerData.Name" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Name</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.HostName" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">HostName</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.Domainname" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Domain Name</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.User" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">User</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.AttachStdin" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Attach Stdin</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.AttachStdout" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Attach Stdout</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.AttachStderr" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Attach Stderr</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.Tty" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Tty</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.OpenStdin" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Open Stdin</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.StdinOnce" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Stdin Once</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.Env" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Env</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.Cmd" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Cmd(date)</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.Entrypoint" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">EntryPoint</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.Image" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Image</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.WorkingDir" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">WorkingDir</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.NetworkDisabled" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Network Disabled</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.MacAddress" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Mac Address</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.StopSignal" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Stop Signal</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="containerData.StopTimeout" style="margin-bottom: 1rem;" type="text">
            <template slot="prepend">Stop Timeout</template>
          </el-input>
        </el-col> -->
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="infoInputDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmHandler">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const containerData = {
  Name: '',
  HostName: '',
  Domainname: '',
  User: '',
  AttachStdin: false,
  AttachStdout: true,
  AttachStderr: true,
  Tty: false,
  OpenStdin: false,
  StdinOnce: false,
  Env: '',
  Cmd: '',
  Entrypoint: '',
  Image: 'ubuntu',
  WorkingDir: '',
  NetworkDisabled: false,
  MacAddress: '',
  StopSignal: 'SIGTERM',
  StopTimeout: 10,
  // 221
  status: '',
  name: '',
  id: '',
  host_id: '',
  image_name: '',
};

export default {
  data() {
    return {
      tableData: [],
      containerData,
      infoInputDialogVisible: false,
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
    confirmHandler() {
      this.tableData.push(this.containerData);
      this.tableData = JSON.parse(JSON.stringify(this.tableData));
      this.infoInputDialogVisible = false;
    },
    getContainerList() {
      this.axios.get(`/containers?1=1`)
        .then((res) => {
          console.log(res);
          this.tableData = res;
        });
    },
    createHandler() {
      this.infoInputDialogVisible = true;
    },
    deleteHandler(scope) {
      console.log(scope.row.id);
      this.$confirm('确认删除该容器？')
        .then(() => {
          const idxTable = [];
          this.tableData.map((item) => {
            if (item.id !== scope.row.id) {
              idxTable.push(item);
            }
            return true;
          });
          this.tableData = idxTable;
        })
        .catch(() => false);
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
