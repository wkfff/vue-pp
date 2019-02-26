<template>
  <div id="myTask" class="el-main">
    <state/>
    <router-view class="el-main is-vertical" ></router-view>
  </div>
</template>

<script>
import state from "./state.vue";
export default {
  components: {
    state
  },
  
};
</script>