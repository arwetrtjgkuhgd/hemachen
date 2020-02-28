<template>
  <div>
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="show" v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="show" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select class="normal" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
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
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:rgba(255,61,61,1);">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
    <enterpriseAdd ref="regdialog"></enterpriseAdd>
    <enterpriseEdit ref="editdialog"></enterpriseEdit>
  </div>
</template>

<script>
import { enterpriseList } from "@/api/enterprise.js";
import enterpriseAdd from "./components/enterpriseAdd.vue";
import enterpriseEdit from "./components/enterpriseEdit.vue";
export default {
  components: {
    enterpriseAdd,
    enterpriseEdit
  },
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
    // 获取学科列表的函数
    getList() {
      enterpriseList({
        // 传值
        page: this.page,
        limit: this.size,

        // 结构符
        ...this.formInline
      }).then(res => {
        // console.log(res);
        // 拿到接口上的值，赋给本地的值
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },

    // 页容量改变事件
    handleSizeChange(val) {
      this.size = val;
      this.page = 1;
      this.getList();
      // console.log(`每页 ${val} 条`);
    },

    // 页码改变事件
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
      // console.log(`当前页: ${val}`);
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