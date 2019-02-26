<template>
  <div id="madeByMe">
    <h3 class="title">{{title}}</h3>

    <div class="el-main is-vertical">
      <div class>
        <filterHTML/>
      </div>
      <div class="el-main">
        <el-table
          :data="TaskList"
          element-loading-text=" "
          :max-height="tableHeight"
          border
          style="width: 100%"
          v-if="filter.sortBy == ''"
        >
          <el-table-column prop="thumbnail" label="缩略图" width="100" empty-text=" 1">
            <template scope="scope">
              <img :src="'http://192.168.100.236:9009'+scope.row.thumbnail" alt>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="任务卡名称" min-width="150" show-overflow-tooltip>
            <template scope="scope">
              <el-input
                size="mini"
                v-model="scope.row.name"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
                :readonly="true"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="projectname" label="所属项目" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="pipelinename" label="工序" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="linkname" label="对象" show-overflow-tooltip></el-table-column>
          <el-table-column prop="startdate" label="开始时间" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="days" label="工时" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="statusname" label="状态" width="120" show-overflow-tooltip></el-table-column>

          <template slot="append">
            <infinite-loading
              ref="infiniteLoading"
              :distance="distance"
              @infinite="onInfinite"
              forceUseInfiniteWrapper=".el-table__body-wrapper"
            >
              <span slot="no-more">—————————————————————————— 加载完成 ————————————————————————————</span>
              <span slot="no-results">到底了......</span>
            </infinite-loading>
          </template>
        </el-table>

        <el-table
          :data="TaskList"
          :max-height="tableHeight"
          :row-class-name="tableRowClassName"
          element-loading-text=" "
          style="width: 100%"
          v-if="filter.sortBy != ''"
        >
          <el-table-column type="expand" width="20">
            <template slot-scope="props">
              <el-table
                :data="props.row.gList"
                element-loading-text=" "
                style="width: 100%"
                :show-header="false"
              >
                <el-table-column prop="thumbnail" label="缩略图" width="100" empty-text=" 1">
                  <template scope="scope">
                    <img :src="'http://192.168.100.236:9009'+scope.row.thumbnail" alt>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="任务卡名称" min-width="150" show-overflow-tooltip>
                  <template scope="scope">
                    <el-input
                      size="mini"
                      v-model="scope.row.name"
                      placeholder="请输入内容"
                      @change="handleEdit(scope.$index, scope.row)"
                      :readonly="true"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="projectname" label="所属项目" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pipelinename" label="工序" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="linkname" label="对象" show-overflow-tooltip></el-table-column>
                <el-table-column prop="startdate" label="开始时间" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="days" label="工时" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="statusname" label="状态" width="120" show-overflow-tooltip></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="缩略图" width="100"></el-table-column>
          <el-table-column label="任务卡名称" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column label="所属项目" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="工序" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="对象" show-overflow-tooltip></el-table-column>
          <el-table-column label="开始时间" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="工时" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="状态" width="120" show-overflow-tooltip></el-table-column>
          <template slot="append">
            <infinite-loading
              ref="infiniteLoading"
              :distance="distance"
              @infinite="onInfinite"
              forceUseInfiniteWrapper=".el-table__body-wrapper"
            >
              <span slot="no-more">—————————————————————————— 加载完成 ————————————————————————————</span>
              <span slot="no-results">到底了......</span>
            </infinite-loading>
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>



<script>
import filterHTML from "./filter.vue";
import InfiniteLoading from "vue-infinite-loading";
export default {
  components: {
    filterHTML,
    InfiniteLoading
  },
  data() {
    return {
      title: this.$route.query.title,
      url: this.$route.query.url,
      TaskList: [],
      distance: 100, //临界值，距离底部多少距离时触发函数  infiniteHandler
      popperOptions: {
        boundariesElement: "madeByMe"
      },
      tableHeight: window.innerHeight,
      filter: {
        projectID: "",
        workID: "",
        lev1ID: "",
        lev2ID: "",
        pipelineID: "",
        status: "",
        startDate: "",
        endDate: "",
        key: "",
        sortBy: "projectName#asc",
        orderBy: "startDate#desc",
        isAssetOrShot: "",
        groupSortBy: "",
        groupBy: "",
        page: "1",
        pageSize: "50"
      }
    };
  },
  mounted() {
    console.log(this);
    console.log(this.projectList);
  },
  created() {},
  methods: {
    onInfinite($state) {
      let that = this;
      let filter = {};
      _.forEach(that.filter, function(value, key) {
        if (value == 0) {
          filter[key] = "";
        } else {
          filter[key] = value;
        }
      });
      let param = {
        filter: JSON.stringify(filter)
      };
      that.AXIOS.post(that.GLOBAL.ServerUrl + "/Task/" + that.url, param)
        .then(response => {
          if ("SUCCESS" === response.result) {
            let data = response.data;
            if (that.filter.page == 1) {
              console.log(data);
              that.TaskList = data;
            } else {
              if (that.filter["sortBy"] == "") {
                that.TaskList = that.TaskList.concat(response.data);
              } else {
                _.forEach(data, function(value1, key1) {
                  _.forEach(that.TaskList, function(value, key) {
                    if (value.id == value1.id) {
                      let gList = that.TaskList[key].gList;
                      that.TaskList[key].gList = _.concat(gList, value1.gList);
                    } else {
                      that.TaskList = that.TaskList.concat(response.data[key1]);
                    }
                  });
                });
              }
            }

            let recordsTotal =
              response.recordsTotal >=
              this.filter["page"] * this.filter["pageSize"]
                ? true
                : false;
            if (recordsTotal) {
              this.filter.page++;
              $state.loaded();
            } else {
              $state.complete();
            }
          }
        })
        .catch(error => {
          // $state.complete();
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    },
    tableRowClassName({ row, rowIndex }) {
      return "expanded-row";
    }
  },
  watch: {
    $route(to, from) {
      console.log(1);
      this.title = this.$route.query.title;
      this.url = this.$route.query.url;
      this.init();
    }
  }
};
</script>
