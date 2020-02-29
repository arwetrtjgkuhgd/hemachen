<template>
  <el-dialog
    :title="isAdd ? '新增企业' : '编辑企业'"
    :visible.sync="dialogFormVisible"
    width="600px"
    center
  >
    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <!-- 企业编号 -->
      <el-form-item prop="eid" label="企业编号">
        <el-input v-model="form.eid" clearable gutter="100"></el-input>
      </el-form-item>
      <!-- 企业名称 -->
      <el-form-item prop="name" label="企业名称">
        <el-input v-model="form.name" clearable gutter="100"></el-input>
      </el-form-item>
      <!-- 企业简称 -->
      <el-form-item prop="short_name" label="企业简称">
        <el-input v-model="form.short_name" clearable gutter="100"></el-input>
      </el-form-item>
      <!-- 企业简介 -->
      <el-form-item prop="intro" label="企业简介">
        <el-input v-model="form.intro" clearable gutter="100"></el-input>
      </el-form-item>
      <!-- 企业备注 -->
      <el-form-item prop="remark" label="企业备注">
        <el-input v-model="form.remark" clearable gutter="100"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="enterpriseAdd">{{isAdd ? "确 定" : "保 存"}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { enterpriseAdd, enterpriseEdit } from "@/api/enterprise.js";
export default {
  data() {
    return {
      dialogFormVisible: false, // 是否显示对话框
      isAdd: true,
      form: {},
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    enterpriseAdd() {
      // 判断所有规则有没有符合规矩
      this.$refs.form.validate(v => {
        if (v) {
          if (this.isAdd) {
            enterpriseAdd(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success("新增成功！");
                this.dialogFormVisible = false;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            enterpriseEdit(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success("编辑成功！");
                this.dialogFormVisible = false;
                this.$parent.getList();
                this.form = {};
              } else {
                // 提示错误信息
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