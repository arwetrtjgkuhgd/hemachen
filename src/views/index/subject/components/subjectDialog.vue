<template>
  <el-dialog
    :title="isFrie ? '新增学科' : '编辑学科'"
    :visible.sync="dialogFormVisible"
    width="600px"
    center
  >
    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <!-- 学科编号 -->
      <el-form-item prop="rid" label="学科编号">
        <el-input v-model="form.rid" clearable gutter="100"></el-input>
      </el-form-item>
      <!-- 学科名称 -->
      <el-form-item prop="name" label="学科名称">
        <el-input v-model="form.name" clearable gutter="100"></el-input>
      </el-form-item>
      <!-- 学科简称 -->
      <el-form-item prop="short_name" label="学科简称">
        <el-input v-model="form.short_name" clearable gutter="100"></el-input>
      </el-form-item>
      <!-- 学科简介 -->
      <el-form-item prop="intro" label="学科简介">
        <el-input v-model="form.intro" clearable gutter="100"></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item prop="remark" label="学科备注">
        <el-input v-model="form.remark" clearable gutter="100"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="Add">{{isFrie ? "确 定" : "保存"}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { subjectAdd,subjectEdit } from "@/api/subject.js";
export default {
  data() {
    return {
      dialogFormVisible: false, // 是否显示对话框
      isFrie: true,
      form: {},
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    Add() {
      // 判断所有规则有没有符合规矩
      this.$refs.form.validate(v => {
        if (v) {
          if (this.isFrie) {
            subjectAdd(this.form).then(res => {
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
            subjectEdit(this.form).then(res => {
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
          // console.log("不符合规矩");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>