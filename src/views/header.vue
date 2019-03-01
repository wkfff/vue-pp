<template>
  <el-header height="42px" class="navigation">
    <img src="img/log2.90e973ea.png" alt class="pull-left" href="#/home/myTask">
    <ul href.prevent class="pull-left" :default-active="$route.router">
      <li class="pull-left menu_item">
        <router-link
          :to="{ path: '/home/myTask/madeByMe', query: {url:'findMyTask',title:'由我制作',static:0}}"
          class="home"
          exact
          :class="routeClass('/home/myTask')"
        >我的任务</router-link>
      </li>
      <li class="pull-left">
        <el-dropdown @command="handleCommand" class="myProjectList" placement="bottom-start">
          <a class="el-dropdown-link menu_item project" :class="routeClass('/home/project')">
            项目
            <i class="el-icon-arrow-down el-icon--right"></i>
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="创建新项目" class="menu_item">创建新项目</el-dropdown-item>
            <el-dropdown-item
              command="项目管理"
              class="border_B menu_item"
              exact
              :class="{'menu_item_active':'/home/projectManage'===$route.path}"
            >项目管理</el-dropdown-item>
            <el-dropdown-item
              class="myProject menu_item"
              :command="project.id"
              v-for="(project,key) in myProjectList"
              :key="key"
            >
              <router-link :to="{ path: '/home/project', query: {id:project.id}}" exact>
                <img
                  alt
                  :src="'http://192.168.100.236:9009/project/logo?id='+project.id+'&scale=@50x50'"
                >
                {{project.name}}
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li class="pull-left">
        <el-dropdown placement="bottom-start">
          <a class="el-dropdown-link menu_item">
            设置
            <i class="el-icon-arrow-down el-icon--right"></i>
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="menu_item">存储设置</el-dropdown-item>
            <el-dropdown-item class="menu_item">IM消息设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
    <creatProjectHTML ref="creatProjectHTML"/>
  </el-header>
</template>

<script>
import header from "../plugins/header";
export default header;
</script>
<style scoped>
@import "../assets/styles/header.css";
</style>