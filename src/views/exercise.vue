<template>
  <div>
    <list-item v-for="(item, index) in list" :key="item.TemplateID"
      :index="index+1" :options="item"
      @change="itemPropertyChange"
      >
    </list-item>
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

</style>
