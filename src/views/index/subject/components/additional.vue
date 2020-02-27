<template>
  <el-dialog title="新增学科" :visible.sync="dialogFormVisible" width="600px" center>
    <el-form :model="form" label-width="70px" :rules="rules" ref="form">
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
      <el-form-item prop="introduction" label="学科简介">
        <el-input v-model="form.introduction" clearable gutter="100"></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item prop="remark" label="学科备注">
        <el-input v-model="form.remark" clearable gutter="100"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false, // 是否显示对话框
      form: {},
      rules: {}
    };
  }
};
</script>

<style>
</style>