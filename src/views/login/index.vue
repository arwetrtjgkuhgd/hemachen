<template>
  <div class="login-wrap">
    <!-- 左边登录盒子 -->
    <div class="login_box">
      <!-- 上面不分 -->
      <div class="login_title">
        <img class="login_logo" src="./images/矢量智能对象 拷贝 9.png" alt />
        <span class="left_title">黑马面面</span>
        <span class="line"></span>
        <span class="right_title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        label-width="43px"
      >
        <el-form-item prop="user">
          <el-input
            v-model="ruleForm.user"
            placeholder="请输入手机号"
            clearable
            prefix-icon="el-icon-user"
            gutter="100"
          ></el-input>
        </el-form-item>

        <el-form-item prop="pass">
          <el-input
            v-model="ruleForm.pass"
            placeholder="请输入密码"
            show-password
            clearable
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input
                clearable
                v-model="ruleForm.code"
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-col>
            <el-col :span="7">
              <img class="login_code" src="./images/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="check" class="checked_box">
          <el-checkbox v-model="ruleForm.check">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm">登录</el-button>
          <el-button class="btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="./images/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pass: "",
        code: "",
        check: false
      },
      rules: {
        user: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号码为11为数", trigger: "blur" }
        ],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        check: [
          { pattern: /true/, message: "请勾选我已阅读", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      // 判断所有规则有没有符合规矩
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("符合规矩");
        } else {
          console.log("不符合规矩");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  .login_box {
    width: 478px;
    height: 550px;
    padding-right: 41px;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);

    .login_title {
      display: flex;
      align-items: center;
      margin: 50px 0px 43px 48px;

      .login_logo {
        width: 22px;
        height: 17px;
      }

      .left_title {
        margin-left: 16px;
        margin-right: 16px;
      }

      .line {
        width: 1px;
        height: 24px;
        background: rgba(199, 199, 199, 1);
      }
      .right_title {
        margin-left: 12px;
      }
    }

    .login_code {
      width: 100%;
      height: 40px;
    }

    .checked_box {
      display: flex;
      align-items: center;
    }

    .btn {
      width: 100%;
    }

    .btn:nth-child(2) {
      margin-left: 0px;
      margin-top: 26px;
    }
  }
}
</style>