<!-- 项目管理 -->
<template>
  <div id="projectManage" class="el-main is-vertical">
    <h3 class="title">项目管理</h3>
    <div class="el-main is-vertical">
      <el-table
        :data="projectLists"
        element-loading-text=" "
        :max-height="tableHeight"
        border
        empty-text=" "
        style="width: 100%"
        @row-dblclick="rowDblclick"
      >
        <el-table-column prop="thumbnail" label="缩略图" width="100">
          <template scope="scope">
            <img :src="'http://192.168.100.236:9009'+scope.row.logo+'&scale=@50x50'" alt>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="项目名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="code" label="英文名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="startDate" label="开始日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="endDate" label="截止日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="directors" label="项目负责人" show-overflow-tooltip>
          <template scope="scope">
            <span v-for="user in scope.row.directors" :key="user.frealname">{{user.frealname}},</span>
          </template>
        </el-table-column>
        <el-table-column prop="producers" label="制片负责人" show-overflow-tooltip>
          <template scope="scope">
            <span v-for="user in scope.row.producers" :key="user.frealname">{{user.frealname}},</span>
          </template>
        </el-table-column>
        <template slot="append">
          <infinite-loading
            ref="infiniteLoading"
            :identifier="infiniteId"
            @infinite="onInfinite"
            forceUseInfiniteWrapper=".el-table__body-wrapper"
          >
            <span slot="no-more">—————————————————————————— 加载完成 ————————————————————————————</span>
            <span slot="no-results">到底了......</span>
          </infinite-loading>
        </template>
      </el-table>
    </div>

    <editProjectHTML ref="editProjectHTML"/>
  </div>
</template>
<script>
import InfiniteLoading from "vue-infinite-loading";
import editProjectHTML from "./creatProject";

export default {
  name: "projectManage",
  components: {
    InfiniteLoading,
    editProjectHTML
  },
  data() {
    return {
      projectLists: [],
      filter: {
        key: "",
        page: 1,
        pageSize: 20,
        sortBy: "createTime",
        order: "desc"
      },
      infiniteId: +new Date(),
      tableHeight: window.innerHeight - 76
    };
  },
  mounted() {},
  methods: {
    onInfinite($state) {
      let that = this;
      that.AXIOS.post("/project/list", {
        filter: JSON.stringify(that.filter)
      }).then(response => {
        if ("SUCCESS" === response.result) {
          that.projectLists = response.data.list;
          let recordsTotal =
            response.data.recordsTotal >=
            that.filter["page"] * that.filter["pageSize"]
              ? true
              : false;
          if (recordsTotal) {
            that.filter.filter.page++;
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      });
    },
    rowDblclick(row, event) {
      let that = this;
      that.$refs.editProjectHTML.createProjectData = Object.assign(
        { edit: true, title: "修改项目" },
        row
      );
      that.$refs.editProjectHTML.dialogVisible = true;
      console.log(row);
      console.log(event);
    }
  },
  filters: {
    formatDate: function(time) {
      console.log(this.FILTERS.formatDate);
      // return this.FILTERS.formatDate(time);
    }
  }
};
</script>