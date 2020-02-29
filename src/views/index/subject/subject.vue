<template>
  <div>
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="show" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
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
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="eliminate">清除</el-button>
          <el-button @click="changAdd" type="primary" icon="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" prop="date" label="序号" width="50"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="130"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="140"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="130"></el-table-column>
        <el-table-column prop="username" label="创建者" width="130"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="190">
          <template slot-scope="scope">{{ scope.row.create_time | formatime }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else style="color:rgba(255,61,61,1);">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button @click="changEdit(scope.row)" type="text">编辑</el-button>
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
        :page-sizes="[5, 10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 分页标签：el-pagination
          size-change：页容量改变就触发
          current-change:当前页码改变就触发

          current-page：当前页是第几页
          page-sizes：这是设置可以选择的页容量（每页显示多少条）
          page-size：这是设置当前页容量是几
          layout：设置分页的布局效果  一般不动他的属性
          total：数据的总条数（数据的总数量）
      -->
    </el-card>
    <!-- <subjectAdd ref="regdialog"></subjectAdd>
    <subjectEdit ref="editdialog"></subjectEdit>-->
    <subjectDialog ref="regdialog"></subjectDialog>
  </div>
</template>

<script>
import { subjectList, subjectStatus, subjectRemove } from "@/api/subject.js";
// import subjectAdd from "./components/subjectAdd.vue";
// import subjectEdit from "./components/subjectEdit.vue";
import subjectDialog from "./components/subjectDialog.vue";
export default {
  components: {
    // subjectAdd,
    // subjectEdit
    subjectDialog
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
    // 新增
    changAdd() {
      this.$refs.regdialog.dialogFormVisible = true;
      this.$refs.regdialog.isFrie = true;
      this.$refs.regdialog.form = {};
    },

    //编辑事件
    changEdit(items) {
      this.$refs.regdialog.dialogFormVisible = true;
      this.$refs.regdialog.isFrie = false;
      if (items != this.isFirst) {
        this.$refs.regdialog.form = { ...items };
        this.isFirst = items;
      }
    },

    // 删除
    Remove(item) {
      this.$confirm("确认删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          subjectRemove({ id: item.id }).then(res => {
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

    // 搜索事件
    search() {
      this.page = 1;
      this.getList();
    },

    // 修改学科状态
    changStatus(items) {
      subjectStatus({ id: items.id }).then(() => {
        // console.log(res);
        // 刷新界面就可以了
        // 只要刷新表格就行了
        // 刷新表格其实就是对表格重新赋值
        this.getList();
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
    },

    // 获取学科列表的函数
    getList() {
      subjectList({
        // 传值
        page: this.page,
        limit: this.size,

        // 结构符
        ...this.formInline
        // name: this.formInline.name,
        // rid: this.formInline.rid,
        // username: this.formInline.username,
        // status: this.formInline.status
      }).then(res => {
        // console.log(res);
        // 拿到接口上的值，赋给本地的值
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },

    // 清除
    eliminate() {
      this.$refs.formInline.resetFields();
      // 清除后，从新渲染数据
      this.page = 1;
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