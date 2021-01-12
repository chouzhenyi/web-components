<template>
  <div>
    <h1>这结构</h1>
  </div>
</template>

<script>
import { link, stackData } from "@/lib/learn/data-structure"

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
      // this.linkInit()
      this.stackInit()
    },
    // 链表练习
    linkInit() {
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
    },
    // 栈练习
    stackInit() {
      stackData.push(2)
      stackData.push(3)
      console.log('toString:', stackData.toString())
      console.log('isEmpty:', stackData.isEmpty())
      console.log('size', stackData.size())
      console.log('栈顶', stackData.peek())
      stackData.pop()
      console.log("从栈顶删除一项");
      console.log('toString:', stackData.toString())
      console.log('isEmpty:', stackData.isEmpty())
      console.log('size', stackData.size())
      console.log('栈顶', stackData.peek())
      stackData.clear()
      console.log('清空栈');
      console.log('toString:', stackData.toString())
      console.log('isEmpty:', stackData.isEmpty())
      console.log('size', stackData.size())
      console.log('栈顶', stackData.peek())
    }
  },
};
</script>
<style lang="scss" scoped>
</style>