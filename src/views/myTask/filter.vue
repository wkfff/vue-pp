<template>
  <div class="operation border_B">
    <el-dropdown trigger="click" placement="bottom-start">
      <span class="el-dropdown-link">
        排序
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="filter">
        <el-form class="filter" ref="form" :model="filter" label-width="80px" size="mini">
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
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown trigger="click" placement="bottom-start">
      <span class="el-dropdown-link">
        排序
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="filter_radio">
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button class="menu_item" label="asc" @change="fn_filter()">升序排列</el-radio-button>
          <el-radio-button class="menu_item border_B" label="desc" @change="fn_filter()">降序排列</el-radio-button>
        </el-radio-group>
        <el-radio class="menu_item" v-model="radio" label="startDate" @change="fn_filter()">时间</el-radio>
        <el-radio class="menu_item" v-model="radio" label="pipelineName" @change="fn_filter()">工序</el-radio>
        <el-radio class="menu_item" v-model="radio" label="linkName" @change="fn_filter()">对象</el-radio>
        <el-radio class="menu_item" v-model="radio" label="status" @change="fn_filter()">状态</el-radio>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown trigger="click" placement="bottom-start">
      <span class="el-dropdown-link">
        分组
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="filter_radio">
        <el-radio-group v-model="radio2" size="mini">
          <el-radio-button class="menu_item" label="asc" @change="fn_filter()">升序排列</el-radio-button>
          <el-radio-button class="menu_item border_B" label="desc" @change="fn_filter()">降序排列</el-radio-button>
          <el-radio-button class="menu_item border_B" label="取消分组" @change="fn_filter()">取消分组</el-radio-button>
        </el-radio-group>
        <el-radio class="menu_item" v-model="radio3" label="projectName" @change="fn_filter()">项目</el-radio>
        <el-radio class="menu_item" v-model="radio3" label="status" @change="fn_filter()">状态</el-radio>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<style>
.operation {
  height: 32px;
  line-height: 30px;
  padding-left: 15px;
  background: #323232;
}
.operation .el-dropdown .el-dropdown-link {
  padding: 0 20px;
}
.filter.el-popper {
  width: auto;
}
.filter .el-input {
  line-height: 20px;
}
.filter .el-input__inner {
  width: 120px;
  height: 20px !important;
}
.filter .el-form-item--mini.el-form-item {
  margin: 0;
  padding: 2px;
  border-bottom: 1px solid #110011;
}

.filter .el-form-item__content .el-dropdown-selfdefine {
  width: 120px;
  height: 20px;
  display: inline-block;
  background: #101010;
  padding: 0 11px;
}
.filter .el-form-item__content .el-dropdown-selfdefine i {
  float: right;
  margin-top: 3px;
}

.filter_radio .el-radio-button__inner {
  background: none !important;
  border: none !important;
  box-shadow: none !important;
}
.filter_radio label {
  width: 100%;
  display: inline-block;
  line-height: 25px;
  border-bottom: 1px solid #1e1e1e;
}
.filter_radio .el-radio {
  padding: 0 15px;
}
</style>



<script>
import filter from "../../plugins/myTask/filter";
export default filter;
</script>
