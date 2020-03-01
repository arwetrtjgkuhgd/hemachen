<template>
  <div>
    <!-- 用户注册 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" width="603px" center top>
      <el-form :model="form" label-width="55px" :rules="rules" ref="form">
        <!-- 头像 -->
        <el-form-item prop="head" label="头像">
          <el-upload
            v-model="form.head"
            name="image"
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item prop="username" label="昵称">
          <el-input v-model="form.username" clearable gutter="100"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email" clearable gutter="100"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item prop="cellphone" label="手机">
          <el-input v-model="form.cellphone" clearable gutter="100"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" show-password clearable></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item label="图形码">
          <el-row>
            <el-col :span="16">
              <el-input clearable v-model="form.code"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img class="login_code" :src="picCodeUrl" @click="refreshCode" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码">
          <el-row>
            <el-col :span="16">
              <el-input clearable v-model="form.rcode"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button :disabled="sec != 0" @click="cellPhCode">{{sec==0?"获取用户验证码":"还有"+sec+"秒"}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="notarize">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { sendSMS, register } from "@/api/register.js";
export default {
  data() {
    return {
      uploadUrl: process.env.VUE_APP_URL + "/uploads", //头像上传接口
      imageUrl: "", // 头像图片
      sec: 0, // 按钮倒计时
      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms", // 图形码的路径地址
      dialogFormVisible: false, // 是否显示对话框
      // 跟表单元素双向绑定的对象
      form: {
        head: "", //头像
        username: "", //昵称
        email: "", // 邮箱
        cellphone: "", //手机号
        password: "", //密码
        code: "" // 图形码
      },
      // 规则对象
      rules: {
        // 头像
        head: [{ required: true, message: "请上传头像", trigger: "change" }],
        // 昵称
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        // 邮箱
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        // 手机
        cellphone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur"
          }
        ],
        // 密码
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码为6~16为数",
            trigger: "blur"
          }
        ]
        // 图片验证码
        // 手机验证码
      }
    };
  },
  methods: {
    notarize() {
      // 判断所有规则有没有符合规矩
      this.$refs.form.validate(valid => {
        if (valid) {
          register({
            username: this.form.username,
            phone: this.form.cellphone,
            email: this.form.email,
            avatar: this.form.head,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("注册成功！");

              // 重置表单,他只能重置表单元素
              // 而img不是表单元素，所以只要img绑定的url还在，他就一直在显示
              this.$refs.form.resetFields();
              // 清空
              this.imageUrl = "";
              this.form.code = "";
              this.form.rcode = "";
              //注册成功，关闭对话框
              this.dialogFormVisible = false;
            } else {
              // 提示错误信息
              this.$message.error(res.data.message);
            }
          });
        } else {
          console.log("不符合规矩");
          return false;
        }
      });
    },
    // 刷新图形码
    refreshCode() {
      this.picCodeUrl =
        process.env.VUE_APP_URL +
        "/captcha?type=sendsms&t=" +
        Math.random() * 99;
    },
    // 获取手机验证码
    cellPhCode() {
      if (!/^1[3456789]\d{9}$/.test(this.form.cellphone)) {
        return this.$message.error("手机格式不正确");
      }
      if (this.form.code.length != 4) {
        return this.$message.error("验证码长度不正确");
      }
      this.sec = 60;
      let timeID = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timeID);
        }
      }, 1000);
      // 发请求获取手机验证码
      sendSMS({
        code: this.form.code,
        phone: this.form.cellphone
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          console.log("成功获取验证码");
          this.$message.success("成功获取验证码" + res.data.data.captcha);
        } else {
          // console.log(res.data.message);
          this.$message.error(res.data.message);
        }
      });
    },
    // 头像上传成功
    handleAvatarSuccess(res, file) {
      // console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
      // 上传成功还要给avatar赋值,手动来赋值才让他有值的，没有事件重新校验
      this.form.head = res.data.file_path;
      // 这个时候我们就要想办法，单独对这一个属性做一次校验
      this.$refs.form.validateField("head");
    },
    // 头像上传前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
  .el-dialog__title {
    color: #fff;
  }
}

.login_code {
  width: 100%;
  height: 40px;
}

.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload .el-icon-plus {
  line-height: 178px;
}
</style>