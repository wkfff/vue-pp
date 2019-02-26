<template>
  <div>
    <el-popover placement="bottom-start" trigger="click" :popper-options="popperOptions">
      <el-form ref="form" :model="filter" label-width="80px" size="mini">
        <el-form-item label="项目">
          <el-select
            v-model="filter.projectID"
            @change="WorkFindMyCharge();fn_filter()"
            placeholder="全部"
          >
            <el-option
              v-for="project in projectList"
              :key="project.name"
              :value="project.id"
              :label="project.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源">
          <el-select
            v-model="filter.workID"
            @change="findPipelineByWork();findByParent(0);"
            placeholder="全部"
          >
            <el-option
              v-for="work in workList"
              :key="work.name"
              :value="work.id"
              :label="work.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select v-model="filter.lev1ID" @change="lev2ListTree()" placeholder="全部">
            <el-option
              v-for="lev1 in lev1List"
              :key="lev1.name"
              :value="lev1.id"
              :label="lev1.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="el-form-item el-form-item--mini">
          <label class="el-form-item__label" style="width: 80px;">二级分类</label>
          <div class="el-form-item__content" style="margin-left: 80px;">
            <el-dropdown trigger="click" placement="bottom-start">
              <span class="el-dropdown-link">
                {{lev2Name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-tree :data="lev2List" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <el-form-item label="工序">
          <el-select v-model="filter.pipelineID" placeholder="全部">
            <el-option
              v-for="pipeline in pipelineList"
              :key="pipeline.pipilename"
              :value="pipeline.pipelineid"
              :label="pipeline.pipilename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filter.status" placeholder="全部">
            <el-option
              v-for="project in projectList"
              :key="project.name"
              :value="project.id"
              :label="project.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="filter.startDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="filter.endDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="filter.key"></el-input>
        </el-form-item>
      </el-form>
      <span class="el-dropdown-link" slot="reference">过滤</span>
    </el-popover>
  </div>
</template>


<style>
.el-input {
  line-height: 20px;
}
.el-input__inner {
  width: 120px;
  height: 20px !important;
}
.el-form-item--mini.el-form-item {
  margin: 0;
  padding: 2px;
  border-bottom: 1px solid #110011;
}



.el-form-item__content .el-dropdown-selfdefine{
  width: 120px;
    height: 20px;
    display: inline-block;
    background: #101010;
    padding: 0 11px;
}
.el-form-item__content .el-dropdown-selfdefine i{
  float: right;
  margin-top: 3px;
}

</style>

<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
export default {
  components: {},
  data() {
    return {
      popperOptions: {
        boundariesElement: "madeByMe"
      },
      workList: [],
      lev1List: [],
      lev2List: [],
      lev2Name: "全部",
      pipelineList: [],
      filter: this.$parent.filter,
      defaultProps: {
        children: "child",
        label: "fname"
      }
    };
  },
  computed: {
    ...mapGetters("projectList", {
      projectList: "renderCollects"
    })
  },
  mounted() {
    console.log(this);
  },
  created() {},
  methods: {
    fn_filter() {
      this.filter.page = 1;
      this.$parent.$refs.infiniteLoading.$emit("$onInfinite:reset");
    },

    // 业务列表
    WorkFindMyCharge() {
      let that = this;
      if (that.filter.projectID == 0) return false;

      that.workList = [];
      that.filter.workID = "全部";
      that.lev1List = [];
      that.filter.lev1ID = "全部";
      that.lev2List = [];
      that.lev2Name = "全部";
      that.pipelineList = [];
      that.pipelineID = "全部";

      that.AXIOS.get(
        that.GLOBAL.ServerUrl +
          "/Work/findAll?projectID=" +
          that.filter.projectID
      )
        .then(response => {
          if ("SUCCESS" === response.result) {
            let data = response.data;
            that.workList = data;
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    },

    // 工序列表
    findPipelineByWork() {
      let that = this;
      this.pipelineList = [];
      that.filter.pipelineID = "全部";
      that.AXIOS.get(
        that.GLOBAL.ServerUrl +
          "/WorkflowNode/findPipelineByWork?workID=" +
          that.filter.workID
      )
        .then(response => {
          if ("SUCCESS" === response.result) {
            let data = response.data;
            that.pipelineList = data;
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    },

    // lev1 列表
    findByParent(pid) {
      let that = this;
      let dataModel = null;
      _.forEach(that.workList, function(v, k) {
        if (v.id == that.filter.workID) {
          dataModel = v.dataModel;
          return false;
        }
      });

      that.lev1List = [];
      that.filter.lev1ID = "全部";
      that.lev2List = [];
      that.lev2Name = "全部";

      let url = "";
      if (dataModel == 2) {
        url = "AssetType";
      } else if (dataModel == 4) {
        url = "ShotType";
      } else if (dataModel == 6) {
        url = "OriginalType";
      } else if (!dataModel) {
        return false;
      }

      that.AXIOS.get(
        that.GLOBAL.ServerUrl +
          "/" +
          url +
          "/findByParent?pID=" +
          pid +
          "&projectID=" +
          that.filter.projectID
      )
        .then(response => {
          if ("SUCCESS" === response.result) {
            let data = response.data;
            that.lev1List = data;
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    },

    // lev1 列表
    lev2ListTree() {
      let that = this;
      let pid = that.filter.lev1ID;
      let dataModel = null;
      _.forEach(that.workList, function(v, k) {
        if (v.id == that.filter.workID) {
          dataModel = v.dataModel;
          return false;
        }
      });
      let url = "";
      if (dataModel == 2 && pid != 0) {
        url = "AssetType";
      } else if (dataModel == 4 && pid != 0) {
        url = "ShotType";
      } else if (dataModel == 6 && pid != 0) {
        url = "OriginalType";
      } else if (pid == 0) {
        that.filter.lev2ID = 0;
        that.lev2Name = "全部";
        zTree($("#wcZtree"), []);
        return false;
      }
      that.AXIOS.get(
        that.GLOBAL.ServerUrl +
          "/" +
          url +
          "/tree?pID=" +
          pid +
          "&projectID=" +
          that.filter.projectID
      )
        .then(response => {
          if ("SUCCESS" === response.result) {
            let data = response.data;
            that.lev2List = data;
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    },

    handleNodeClick(data) {
      this.filter.lev2ID = data.fid;
        this.lev2Name = data.fname;
      console.log(data);
    }
  },
  watch: {
    renderCollects: function(newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
      //其他业务代码
    }
  }
};
</script>
