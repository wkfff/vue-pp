<template>
  <el-container class="is-vertical">
    <div id="login">
      <h3 class="titleDrag">
        <img src="./assets/images/icon/log2.png" alt>
        <!-- <span class="close"></span> -->
      </h3>
      <div class="banner">
        <div class="login">
          <img
            src="./assets/images/icon/log.png"
            alt
            style="position: absolute;right: 70px;top: 15px;"
          >
          <div class="name">
            <el-input v-model="userName" placeholder="请输入用户名" prefix-icon="el-icon-third-wode"></el-input>
          </div>
          <div class="number">
            <el-input
              type="password"
              v-model="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-date"
            ></el-input>
          </div>
          <el-button round @click="auth()">登录</el-button>
        </div>
      </div>
      <p>Copyright @2015-2018 北京花开影视制作有限公司 版权所有 V1.0</p>
    </div>
  </el-container>
</template>

<script>
import md5 from "md5";

export default {
  name: "login",
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    auth() {
      this.$router.push({
        path: "/home/madeByMe",
        query: { url: "findMyTask", title: "由我制作", static: 0 }
      });
      var formData = {
        username: this.userName,
        password: md5(this.password)
      };
      this.AXIOS.post(this.GLOBAL.ServerUrl + "/authenticate", formData)
        .then(response => {
          if (response.result === "SUCCESS") {
            this.user = response.data;
            localStorage.user = JSON.stringify(this.user);
            localStorage.ticket = this.user.ticket;
            this.$router.push({
              path: "/home/madeByMe",
              query: { url: "findMyTask", title: "由我制作", static: 0 }
            });
          }
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
#login h3 {
  height: 52px;
  padding-top: 16px;
  padding-left: 87px;
  padding-right: 10px;
  background-color: #1e1e1e;
  margin: 0;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.18);
  position: relative;
}

#login h3 .close {
  width: 12px;
  height: 12px;
  display: block;
  padding: 10px;
  background: url(./assets/images/icon/close.png) center no-repeat;
  opacity: 1;
  -webkit-app-region: no-drag;
}

#login h3 .close:hover {
  background: url(./assets/images/icon/closeHover.png) center no-repeat;
  opacity: 1;
}

#login .banner {
  height: 434px;
  background: url(./assets/images/banner.png) center;
  position: relative;
}

#login .login {
  width: 245px;
  height: 290px;
  padding-top: 10px;
  background: rgba(255, 255, 255, 0.26);
  border-radius: 5px;
  position: absolute;
  right: 180px;
  top: 72px;
}

#login .login label {
  width: 100%;
  height: 54px;
  line-height: 54px;
  margin-top: 22px;
  border-top: 2px solid rgba(233, 233, 233, 0.39);
}

#login .login label input {
  width: auto;
  height: 54px;
  background: #880b13;
  margin-left: 25px;
  margin-right: 10px;
  margin-top: 0;
  float: left;
}

#login .login > div {
  width: 192px;
  height: 37px;
  line-height: 37px;
  background: #212121;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  margin: 35px auto 0;
  padding-left: 4px;
}

#login .login div img {
  padding-left: 18px;
}
#login .login input {
  color: #d7d7d7;
}
#login .login button {
  border: 0;
  outline: 0;
  color: #eee;
  background-color: #880b13;
  padding: 9px 36px;
  margin: 20px 69px;
}
#login p {
  text-align: center;
  margin-top: 50px;
}
</style>
