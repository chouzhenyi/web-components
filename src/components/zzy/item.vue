<template>
  <div>
    <div>{{name}}</div>
    <div>{{text}}</div>
    <div>{{num}}</div>
    <div>{{universityName}}</div>
  </div>
</template>

<script>
import { randomStr, randomNum, getUniversityName } from "./data/random-data"

export default {
  props: {
    name: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      text: randomStr(5),
      num: randomNum(5),
      universityName: getUniversityName(),
    };
  },
  computed: {},
  methods: {},
  beforeCreate() {
    console.log('子组件 beforeCreate')
  },
  created() {
    console.log('子组件 created', this.name)
  },
  beforeMount() {
    console.log('子组件 beforeMount', this.name)
  },
  mounted() {
    console.log('子组件 mounted', this.name)
  },
  beforeDestroy() {
    console.log('子组件 beforeDestroy', this.name)
  },
  destroyed() {
    console.log('子组件 destroyed', this.name)
  },
};
</script>
<style lang="scss" scoped>
</style>