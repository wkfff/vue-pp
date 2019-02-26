<template>
  <div id="state" class="border_R">
    <h3 class="title">任务信息</h3>
    <ul class="list-unstyled">
      <li class="menu_item">
        <router-link :to="{ path: '/home/madeByMe', query: {url:'findMyTask',title:'由我制作',static:0}}" exact>由我制作</router-link>
      </li>
      <li class="menu_item">
        <router-link :to="{ path: '/home/madeByMe', query: {url:'findMyCheckTask',title:'由我审核',static:0}}" exact>由我审核</router-link>
      </li>
      <li class="border_B menu_item">
        <router-link to="/home/schedule" active-class="menu_item_active">我的日程</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {},
  created: function() {},
  mounted() {
    this.routeClass();
  },
  methods: {
    routeClass: function() {
      let home = document.querySelector("header .home");
      if (
        this.$route.path.includes("/home") &&
        !home.classList.contains("menu_item_active")
      ) {
        home.classList.add("menu_item_active");
      }
    }
  },
  watch: {
    $route(to, from) {
      this.routeClass();
    }
  }
};
</script>
<style scoped>
#state {
  height: 100%;
  width: 236px;
  transition: all 1s;
}

#state li a {
  display: block;
  line-height: 28px;
  padding-right: 20px;
  padding-left: 15px;
}
</style>
