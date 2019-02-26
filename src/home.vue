<template>
  <el-container class="is-vertical">
    <Header/>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template> 
<script>
import Header from "./views/header.vue";
export default {
  components: {
    Header
  }
};
</script>
