<template>
  <div>
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科" prop="subject">
          <subjectSelect class="show" v-model="formInline.subject"></subjectSelect>
        </el-form-item>

        <el-form-item label="阶段" prop="step">
          <el-select class="show" v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" value="2"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业" prop="enterprise">
          <enterpriseSelect class="show" v-model="formInline.enterprise"></enterpriseSelect>
        </el-form-item>

        <el-form-item label="题型" prop="type">
          <el-select class="show" v-model="formInline.question_type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="难度" prop="difficulty">
          <el-select class="show" v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="作者" prop="username">
          <el-input class="show" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select class="show" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期" prop="create_date">
          <el-date-picker
            class="show"
            v-model="formInline.create_date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input class="normal" v-model="formInline.title"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.questionAdd.dialogFormVisible = true"
          >新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" prop="date" label="序号" width="50"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="name" label="学科，阶段">
          <template slot-scope="scope">
            <!-- 用过滤器来做 -->
            {{ scope.row | formatSubjectStep }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">单选</span>
            <span v-else-if="scope.row.type == 2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:rgba(255,61,61,1);">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
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
    <question-add ref="questionAdd" />
  </div>
</template>

<script>
import { questionList } from "@/api/question";
import questionAdd from "./components/questionAdd.vue";
export default {
  components: {
    questionAdd
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
    questionList({
      page: this.page,
      limit: this.size
    }).then(res => {
      console.log(res);
      this.tableData = res.data.data.items;
      this.total = res.data.data.pagination.total;
    });
  },
  filters: {
    formatSubjectStep(val) {
      //我要拿到学科名字 val.subject_name
      //我要拿到阶段对应的名字，那么就应该写if判断了
      let stepName = "";
      if (val.step == 1) {
        stepName = "初级";
      } else if (val.step == 2) {
        stepName = "中级";
      } else {
        stepName = "高级";
      }

      return val.subject_name + " · " + stepName;
    }
  }
};
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
.show {
  width: 195px;
  height: 39px;
  margin-right: 20px;
  border-radius: 4px;
}
.normal {
  width: 388px;
  height: 39px;
}
.el-pagination {
  text-align: center;
  padding-top: 20px;
}
.el-form-item__content .show {
  width: 195px;
  margin-right: 20px;
  border-radius: 4px;
}
</style>