<template>
  <div class="web-paper-exercise__list-wrapper">
    <div class="font14 color3 table-header">
      <section class="item">
        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange">全选</el-checkbox> -->
      </section>
      <section class="cursor item">
        <i class="el-icon-delete"></i>
        删除
      </section>
    </div>
    <div class="table__item-wrapper" v-for="(item, index) in list" :key="item.template_id">
      <div class="select-item__checkbox-wrapper">
        <el-checkbox :key="item.template_id" label=""></el-checkbox>
      </div>
      <div class="select-item__drag-wrapper"></div>
      <div class="item__inner-wrapper">
        <list-item :index="index+1" :options="item" @change="itemPropertyChange"></list-item>
      </div>
    </div>
  </div>
</template>

<script>
import { exerciseBuilder } from '@/lib/exercise/exerciseBuilder'
import paperData from "@/lib/data/paper.data"
import listItem from "@/components/exercise/item"

export default {
  props: {},
  data() {
    return {
      list: []
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const list = this.problemsHandle()
      this.list = list
      console.log(list)
    },
    // 给习题列表添加题号等信息
    problemsHandle() {
      const list = this.fetchProblems()
      return list.map((item, index) => {
        const key = index + 1
        return exerciseBuilder({
          ...item,
          key,
        })
      })
    },
    itemPropertyChange({type, value, index}) {
      const problem = this.list.find(item => item.key == index)
      problem[type] && problem[type](value)
      setTimeout(()=>{
        
        console.log(problem, {type, value, index});
      })
    },
    fetchProblems() {
      const { data } = paperData
      return data.problems
    }
  },
  components: {
    listItem,

  },
};
</script>
<style lang="scss" scoped>
@import '@/style/base';

.table-header {
  display: flex;
  padding: 16px 20px 20px 20px;
  .item {
    margin-right: 30px;
  }
}
.table__item-wrapper {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #c8c8c8;
  .select-item__checkbox-wrapper, .select-item__drag-wrapper {
    height: 20px;
    line-height: 20px;
    padding-left: 20px;
  }
}
.table-header {
  ::v-deep .el-checkbox {
    color: #333;
    font-weight: normal;
  }
  ::v-deep .el-checkbox__input.is-checked+.el-checkbox__label {
    color: $blue50;
  }
  ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
  ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: $blue50;
    border-color: $blue50;
  }
}
</style>
