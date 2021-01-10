<template>
  <div>
    <h1>这结构</h1>
  </div>
</template>

<script>
import { link } from "@/lib/learn/data-structure"

export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {
    this.init()
  },
  methods: {
    init() {
      link.append('一个太空滑步')
      link.append('我的滑板鞋')
      link.append('网瘾少女')

      link.insert(0, '疏浚大连绵')
      link.insert(2, '我成功了！')
      link.insert(2, '牛魔王四百个小妖精')
      // console.log(link.toString())
      // link.removeAt(3)
      // console.log(link.toString())
      // console.log(link.findIndex('疏浚大连绵'))
      // console.log(link.findIndex('网瘾少女'))
      // console.log(link.findIndex('我的滑板鞋'))
      // link.remove('我的滑板鞋')
      // console.log(link.toString())
    }
  },
};
</script>
<style lang="scss" scoped>
</style>