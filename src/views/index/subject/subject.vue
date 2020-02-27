<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="show" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
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
          <el-button @click="additional" type="primary" icon="el-icon-plus">新增学科</el-button>
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
        <el-table-column prop="create_time" label="创建日期" width="190"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:rgba(255,61,61,1);">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button @click="changEdit(scope.row)" type="text">编辑</el-button>
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
      <!-- 分页标签：el-pagination
          size-change：
          current-change:当前页码改变就触发

          current-page：当前页是第几页
          page-sizes：这是设置可以选择的页容量（每页显示多少条）
          page-size：这是设置当前页容量是几
          layout：设置分页的布局效果  一般不动他的属性
          total：数据的总条数（数据的总数量）
      -->
    </el-card>
    <additional ref="reg"></additional>
  </div>
</template>

<script>
import { subjectList, subjectStatus, subjectEdit } from "@/api/subject.js";
import additional from "./components/additional.vue";
export default {
  components: {
    additional
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
    // 新增学科
    additional() {
      this.$refs.reg.dialogFormVisible = true;
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
    // 学科编辑
    changEdit() {
      subjectEdit().then(res => {
        console.log("学科编辑", res);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 获取学科列表的函数
    getList() {
      subjectList().then(res => {
        // console.log(res);
        this.tableData = res.data.data.items;
        this.total = this.tableData.length;
      });
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