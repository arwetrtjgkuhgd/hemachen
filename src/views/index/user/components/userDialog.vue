<template>
  <el-dialog
    :title="isFrie ? '新增用户' : '编辑用户'"
    :visible.sync="dialogFormVisible"
    width="500px"
    center
  >
    <el-form :model="form" label-width="70px" :rules="rules" ref="form">
      <!-- 用户名 -->
      <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username" clearable gutter="100"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email" clearable gutter="100"></el-input>
      </el-form-item>
      <!-- 电话 -->
      <el-form-item prop="phone" label="电话">
        <el-input v-model="form.phone" clearable gutter="100"></el-input>
      </el-form-item>
      <!-- 角色 -->
      <el-form-item label="角色" prop="role">
        <el-select @change="form.role_id = form.role" v-model="form.role" placeholder="请选择角色">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <!-- 用户备注 -->
      <el-form-item prop="remark" label="用户备注">
        <el-input v-model="form.remark" clearable gutter="100"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="Add">{{isFrie ? "确 定" : "保存"}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { userAdd, userEdit } from "@/api/user.js";
export default {
  data() {
    return {
      dialogFormVisible: false, // 是否显示对话框
      isFrie: true,
      form: {},
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur"
          }
        ],
        role_id: [{ required: true, message: "角色不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    Add() {
      // 判断所有规则有没有符合规矩
      this.$refs.form.validate(v => {
        if (v) {
          if (this.isFrie) {
            userAdd(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success("新增成功！");
                //新增成功，关闭对话框
                this.dialogFormVisible = false;
                this.$parent.getList();
                this.form = {};
              } else {
                // 提示错误信息
                this.$message.error(res.data.message);
              }
            });
          } else {
            userEdit(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success("编辑成功！");
                this.dialogFormVisible = false;
                this.$parent.getList();
                this.form = {};
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>