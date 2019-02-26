<template>
  <div id="madeByMe">
    <h3 class="title">{{title}}</h3>

    <div class="el-main is-vertical">
      <div class>
        <filterHTML ref="filterChild"/>
      </div>
      <div class="el-main">
        <el-table
          :data="TaskList"
          element-loading-text=" "
          :max-height="tableHeight"
          border
          style="width: 100%"
          v-if="filterSortBy() == ''"
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
          v-if="filterSortBy() != ''"
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


<style scoped>
tbody .el-input {
  background: none;
}
</style>

<script>
import madeByMe from "../../plugins/myTask/madeByMe";
export default madeByMe;
</script>
