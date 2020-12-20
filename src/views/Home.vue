<template>
  <div class="home">
    <div class="font20 text-center font-weight500 title">一颗糖</div>
  </div>
</template>

<script>
import { Calculation } from "@/lib/learn/typescript" 
export default {
  name: 'Home',
  data() {
    return {

    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // 用计算器为例，练习装饰器
      const calculation = new Calculation('这是一个计算器')
      console.log(calculation)
      console.log(calculation.msg);
      calculation.msg = '计算器还没有收到消息'
      console.log(calculation.msg);
      calculation.add(1, 2)
    }
  },
  components: {
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/base';
.title {
  line-height: 2;
}
</style>
