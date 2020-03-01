<template>
  <div>
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input class="show" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="用户邮箱" prop="email">
          <el-input class="normal" v-model="formInline.email"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role_id">
          <el-select class="show" v-model="formInline.role_id" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button @click="userAdd" type="primary" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" prop="date" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:rgba(255,61,61,1);">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="userEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="Status(scope.row)"
            >{{scope.row.status === 1 ? "禁用" : "启用"}}</el-button>
            <el-button type="text" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="SizeChange"
        @current-change="CurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <userDialog ref="userDialog"></userDialog>
  </div>
</template>

<script>
import userDialog from "./components/userDialog.vue";
import { userList, userStatus, userRemove } from "@/api/user.js";
export default {
  components: {
    userDialog
  },
  data() {
    return {
      page: 1, //当前页是第几页
      size: 5, //页容量
      total: 0, //数据总量
      formInline: {}, //行内表单绑定数据
      tableData: [], //表格绑定的数据
      isFirst: null // 判断是否第一次
    };
  },
  methods: {
    // 状态修改
    Status(item) {
      userStatus({ id: item.id }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("状态修改成功");
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    // 删除
    remove(item) {
      userRemove({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //编辑用户
    userEdit(items) {
      this.$refs.userDialog.dialogFormVisible = true;
      this.$refs.userDialog.isFrie = false;
      if (items != this.isFirst) {
        this.$refs.userDialog.form = { ...items };
        this.isFirst = items;
      }
    },

    // 新增用户
    userAdd() {
      this.$refs.userDialog.dialogFormVisible = true;
      this.$refs.userDialog.form = {};
    },

    getList() {
      userList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },

    // 页容量改变事件
    SizeChange(val) {
      this.size = val;
      this.page = 1;
      this.getList();
      // console.log(`每页 ${val} 条`);
    },

    // 页码改变事件
    CurrentChange(val) {
      this.page = val;
      this.getList();
      // console.log(`当前页: ${val}`);
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
.show {
  width: 150px;
  height: 39px;
  border-radius: 4px;
}
.normal {
  width: 220px;
  height: 39px;
}
.el-pagination {
  text-align: center;
  padding-top: 20px;
}
</style>