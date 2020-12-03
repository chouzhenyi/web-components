<template>
  <div>
    <!-- key 的作用 START -->
    <!-- 
      key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。
      如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。
      而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

      它也可以用于强制替换元素/组件而不是重复使用它。当你遇到如下场景时它可能会很有用：
      完整地触发组件的生命周期钩子
      触发过渡
      
     -->
    <transition-group tag="div" name="fade">
    <div v-for="(item, index) in list" :key="item.id">
      <item :name="item.name"></item>
      <em @click="del(index)">删除</em>
    </div>
    </transition-group>
    <input type="button" value="改变" @click="change">
    <!-- key 的作用 END -->
  </div>
</template>

<script>
import item from "@/components/zzy/item"

export default {
  props: {},
  data() {
    return {
      list: [],
    };
  },
  computed: {},
  created() {
    this.init()
  },
  methods: {
    init() {
      for(let i = 0; i < 2; i++) {
        this.list.push({
          name: `测试名称${i + 1}`,
          id: i
        })
      }
    },
    del(index) {
      this.list.splice(index, 1)
    },
    change() {
      // const len = this.list.length
      // const index = Math.floor(Math.random() * len)
      // this.list[index].name = '改变'
      this.list.reverse()
      // this.list.splice(3, 1)
    }
  },
  components: {
    item,
  }
};
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
