<template>
  <div>
    <h1>这结构</h1>
  </div>
</template>

<script>
import { LinkedList } from "@/lib/learn/data-structure"

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
      const linkedListStructure = new LinkedList()
      console.log(linkedListStructure)
    }
  },
};
</script>
<style lang="scss" scoped>
</style>