<template>
  <div>
    <h1>雨！雷！！</h1>
    <div class="list-wrapper">
      <div class="item" v-for="(item, index) in list" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>
import algorithm from "@/lib/learn/algorithm.ts"
import { randomNum } from "@/components/zzy/data/random-data"

export default {
  props: {},
  data() {
    return {
      list: []
    };
  },
  computed: {},
  created() {
    this.algorithmFatory = new algorithm([1])
    this.init()
  },
  methods: {
    init() {
      const list = this.creatNumList()
      // 原始数据
      console.log(list)
      this.list = this.algorithmFatory.selection(list)
    },
    creatNumList() {
      const list = []
      for(let i = 0; i < 10; i++) {
        list.push(randomNum(20))
      }
      return list
    }
  },
};
</script>
<style lang="scss" scoped>
</style>