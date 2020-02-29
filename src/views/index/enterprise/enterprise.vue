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
          <el-button type="primary" @click="searchClick">搜索</el-button>
          <el-button @click="eliminate">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="changAdd">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" prop="date" label="序号" width="80"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">{{ scope.row.create_time | formatime }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else style="color:rgba(255,61,61,1);">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="changEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changStatus(scope.row)"
            >{{scope.row.status == 1 ? "禁用" : "启用"}}</el-button>
            <el-button type="text" @click="Remove(scope.row)">删除</el-button>
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
    <!-- <enterpriseAdd ref="regdialog"></enterpriseAdd>
    <enterpriseEdit ref="editdialog"></enterpriseEdit>-->
    <enterpriseDialog ref="regDialog"></enterpriseDialog>
  </div>
</template>

<script>
import {
  enterpriseList,
  enterpriseStatus,
  enterpriseRemove
} from "@/api/enterprise.js";
// import enterpriseAdd from "./components/enterpriseAdd.vue";
// import enterpriseEdit from "./components/enterpriseEdit.vue";
import enterpriseDialog from "./components/enterpriseDialog.vue";
export default {
  components: {
    // enterpriseAdd,
    // enterpriseEdit
    enterpriseDialog
  },
  data() {
    return {
      page: 1, //当前页是第几页
      size: 10, //页容量
      total: 0, //数据总量
      formInline: {}, //行内表单绑定数据
      tableData: [],
      isFirst: null
    };
  },
  methods: {
    // 新增
    changAdd() {
      this.$refs.regDialog.dialogFormVisible = true;
      this.$refs.regDialog.isAdd = true;
      this.$refs.regDialog.form = {};
    },

    //编辑事件
    changEdit(items) {
      this.$refs.regDialog.dialogFormVisible = true;
      this.$refs.regDialog.isAdd = false;
      if (items != this.isFirst) {
        this.$refs.regDialog.form = { ...items };
        this.isFirst = items;
      }
    },

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

    // 搜索事件
    searchClick() {
      this.page = 1;
      this.getList();
    },

    // 删除
    Remove(item) {
      this.$confirm("确认删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          enterpriseRemove({ id: item.id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("删除成功！");
              if (this.tableData.length == 1) {
                this.page--;
              }
              if (this.page == 0) {
                this.page = 1;
              }
              this.getList();
            } else {
              // 提示错误信息
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 清除
    eliminate() {
      this.$refs.formInline.resetFields();
      // 清除后，从新渲染数据
      this.page = 1;
      this.getList();
    },

    // 修改状态
    changStatus(items) {
      enterpriseStatus({ id: items.id }).then(() => {
        this.getList();
      });
    },

    // 页容量改变事件
    handleSizeChange(val) {
      this.size = val;
      this.page = 1;
      this.getList();
    },

    // 页码改变事件
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
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