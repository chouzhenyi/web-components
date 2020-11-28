<template>
  <div>
    <list-item v-for="(item, index) in list" :key="item.TemplateID"
      :index="index+1" :options="item"
      >
    </list-item>
  </div>
</template>

<script>
import { exerciseFactoryMethod } from '@/lib/exercise'
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
    problemsHandle() {
      const list = this.fetchProblems()
      return list.filter(item => {
        const types = [1, 2, 3]
        return types.indexOf(item.ProblemType)>-1
      }).map((item, index) => {
        const key = index + 1
        const { Body, Type } = item
        return exerciseFactoryMethod(Type, {
          ...item,
          key,
        })
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
