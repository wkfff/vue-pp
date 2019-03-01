<!-- 创建项目 -->
<template>
  <el-dialog
    :title="createProjectData.title"
    :visible.sync="dialogVisible"
    v-dialogDrag
    width="440px"
  >
    <el-form ref="form" :model="createProjectData" label-width="120px" size="mini">
      <el-form-item label="项目名称">
        <el-input v-model="createProjectData.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名称">
        <el-input v-model="createProjectData.code"></el-input>
      </el-form-item>

      <el-form-item label="项目状态">
        <el-select v-model="createProjectData.state" placeholder="进行中">
          <el-option value="1" label="进行中"></el-option>
          <el-option value="2" label="已完成"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          :clearable="false"
          v-model="createProjectData.startDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          :clearable="false"
          v-model="createProjectData.endDate"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="存储位置">
        <el-select v-model="createProjectData.globalStorage.id">
          <el-option
            v-for="storage in storageList"
            :key="storage.name"
            :value="storage.id"
            :label="storage.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="网盘驱动">
        <el-select v-model="createProjectData.diskDriver">
          <el-option v-for="v in diskDriveList" :key="v" :value="v" :label="v"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="info" @click="confirm()">确 定</el-button>
      <el-button size="mini" type="info" @click="cancelCreation(false)">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions } from "vuex";
let createProjectData = {
  code: "",
  name: "",
  code: "",
  state: 1,
  startDate: new Date(),
  endDate: new Date(),
  diskDriver: "G",
  globalStorage: { id: "" },
  title: "创建项目"
};
export default {
  data() {
    return {
      dialogVisible: false,
      createProjectData: Object.assign({}, createProjectData),
      storageList: [],
      diskDriveList: [
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  computed: {
    ...mapActions("projectList", ["setIsRefresh"])
  },
  mounted() {
    this.GlobalStorage();
  },
  methods: {
    GlobalStorage() {
      let that = this;
      that.AXIOS.get("/global/GlobalStorage/findAll").then(response => {
        that.storageList = response.data;
        that.createProjectData.globalStorage.id = response.data[0].id;
      });
    },
    confirm() {
      if (this.createProjectData.edit) {
        this.editProject();
      } else {
        this.creatProject();
      }
    },
    creatProject() {
      let that = this;
      let param = Object.assign({}, that.createProjectData);
      param.startDate = that.FILTERS.formatDate(param.startDate);
      param.endDate = that.FILTERS.formatDate(param.endDate);
      that.AXIOS.post("/project/add", param).then(response => {
        if (response.result === "SUCCESS") {
          that.cancelCreation(true);
        }
      });
    },
    editProject() {
      let that = this;
      let param = {
        code: that.createProjectData.code,
        name: that.createProjectData.name,
        code: that.createProjectData.code,
        state: that.createProjectData.state,
        startDate: that.createProjectData.startDate,
        endDate: that.createProjectData.endDate,
        diskDriver: that.createProjectData.diskDriver,
        globalStorage: { id: that.createProjectData.globalStorage.id }
      };

      param.startDate = that.FILTERS.formatDate(param.startDate);
      param.endDate = that.FILTERS.formatDate(param.endDate);
      that.AXIOS.post("/project/update", param, {
        params: { id: that.createProjectData.id }
      }).then(response => {
        if (response.result === "SUCCESS") {
          that.cancelCreation(true);
        }
      });
    },
    cancelCreation(is) {
      let that = this;
      console.log(that);
      that.createProjectData = Object.assign({}, createProjectData);
      that.dialogVisible = false;
      if (is) {
        that.$parent.infiniteId += 1;
        that.setIsRefresh(true);
      }
    }
  }
};
</script>