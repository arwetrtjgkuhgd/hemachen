<template>
  <el-select v-model="enterprise" placeholder="请选择企业" @change="selChange">
    <el-option
      v-for="(item,index) in enterpriseList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { enterpriseList } from "@/api/enterprise.js";
export default {
  props:{
      value:{
          default:""
      }
  },
  data() {
    return {
      enterprise: this.value,
      enterpriseList:[]
    };
  },
  methods: {
      selChange(){
          this.$emit('input',this.enterprise)
      }
  },
  created() {
    enterpriseList({
      status: 1
    }).then(res => {
      this.enterpriseList = res.data.data.items;
    });
  }
};
</script>

<style>
</style>