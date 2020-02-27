<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input class="show" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input class="normal" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="show" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select class="normal" v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" prop="date" label="序号" width="50"></el-table-column>
        <el-table-column prop="rid" label="企业编号" width="130"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="140"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="130"></el-table-column>
        <el-table-column prop="username" label="创建者" width="130"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="190"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:rgba(255,61,61,1);">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button
              type="text"
              @click="changStatus(scope.row)"
            >{{scope.row.status === 1 ? "禁用" : "启用"}}</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1, //当前页是第几页
      size: 10, //页容量
      total: 0, //数据总量
      formInline: {}, //行内表单绑定数据
      tableData: []
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
.show {
  width: 100px;
  height: 39px;
  border-radius: 4px;
}
.normal {
  width: 149px;
  height: 39px;
}
.el-pagination {
  text-align: center;
  padding-top: 20px;
}
</style>