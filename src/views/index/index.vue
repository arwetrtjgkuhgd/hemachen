<template>
  <el-container class="my_container">
    <el-header class="my_header">
      <div class="left">
        <i
          @click="isCollapse = !isCollapse"
          :class="isCollapse?'el-icon-s-unfold' : 'el-icon-s-fold'"
        ></i>
        <img src="./images/logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="$store.state.avatar" alt />
        <span class="name">{{ $store.state.username}},你好</span>
        <el-button type="primary" size="small" @click="quit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="my_aside" width="auto">
        <el-menu
          router
          :collapse="isCollapse"
          default-active="/index/chart"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import { info } from "@/api/index.js";
import { getToken, removeToken } from "@/utilis/token.js";
export default {
  data() {
    return {
      username: "",
      avatar: "",
      isCollapse: false
    };
  },
  methods: {
    quit() {
      this.$confirm("您确认要退出么, 是否继续?", "退出提示", {
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message.success("退出成功!");
          // 跳转页面
          this.$router.push("/login");
          // 删除token
          removeToken();
          // 清空vuex数据
          this.$store.commit("changeUser","")
          this.$store.commit("changeAvatar","")
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  },
  beforeCreate() {
    //如果得到null，代表没有token，也就是没有登录
    if (getToken() == null) {
      this.$message.error("请先登录");
      this.$router.push("/login");
    }
  },
  // created() {
    // info().then(res => {
    //   if (res.data.code == 200) {
    //     this.username = res.data.data.username;
    //     this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    //   } else if (res.data.code == 206) {
    //     this.$message.error("登录异常");
    //     removeToken();
    //     this.$router.push("/login");
    //   }
    // });
  // }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.my_container {
  height: 100%;

  .my_header {
    display: flex;
    justify-content: space-between;
    height: 60px;

    .left {
      display: flex;
      align-items: center;
      height: 100%;

      i {
        width: 24px;
        height: 20px;
        font-size: 24px;
        margin-right: 15px;
      }
      img {
        width: 33px;
        height: 28px;
      }
      span {
        width: 92px;
        height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
        margin-left: 11px;
      }
    }
    .right {
      display: flex;
      align-items: center;

      img {
        width: 40px;
        height: 38px;
        margin-right: 10px;
      }
      span.name {
        width: 150px;
        height: 15px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        margin-right: 20px;
        color: rgba(99, 99, 99, 1);
      }
    }
  }
  .my_aside {
    // background-color: green;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .my_main {
    width: 100%;
    height: 100%;
    background-color: #ccc;
  }
}
</style>