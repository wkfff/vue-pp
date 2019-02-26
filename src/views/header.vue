<template>
  <el-header height="42px" class="navigation">
    <img src="img/log2.90e973ea.png" alt class="pull-left" href="#/home/myTask">
    <ul href.prevent class="pull-left" :default-active="$route.router">
      <li class="pull-left menu_item">
        <router-link
          :to="{ path: '/home/madeByMe', query: {url:'findMyTask',title:'由我制作',static:0}}"
          class="home"
          exact
        >我的任务</router-link>
      </li>
      <li class="pull-left">
        <el-dropdown @command="handleCommand" class="myProjectList" placement="bottom-start">
          <a class="el-dropdown-link menu_item">
            项目
            <i class="el-icon-arrow-down el-icon--right"></i>
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="创建新项目" class="menu_item">创建新项目</el-dropdown-item>
            <el-dropdown-item command="项目管理" class="border_B menu_item">项目管理</el-dropdown-item>
            <el-dropdown-item
              class="myProject menu_item"
              :command="project"
              v-for="(project,key) in myProjectList"
              :key="key"
            >
              <img
                alt
                :src="'http://192.168.100.236:9009/project/logo?id='+project.id+'&scale=@50x50'"
              >
              {{project.name}}
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
  </el-header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1",
      myProjectList: null,
      projectList: null
    };
  },
  mounted() {
    this.findMyProject();
  },
  methods: {
    ...mapActions("projectList", ["invokePushItems"]),
    handleCommand(command) {
      console.log(command);
    },
    findMyProject() {
      this.AXIOS.get(this.GLOBAL.ServerUrl + "/project/findMyProject")
        .then(response => {
          this.myProjectList = response.data;
          this.projectList = response.data; //过滤
          this.invokePushItems(this.projectList);
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    }
  }
};
</script>
<style scoped>
@import "../assets/styles/header.css";
</style>