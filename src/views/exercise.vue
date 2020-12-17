<template>
  <div>
    <exercises v-if="fetchListDone" :exercises="list"></exercises>
  </div>
</template>

<script>
import paperData from "@/lib/data/paper.data"
import exercises from "@/components/exercises/index"

export default {
  data() {
    return {
      list: [],
      fetchListDone: false,
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.list = this.fetchProblems()
      this.fetchListDone = true
    },
    fetchProblems() {
      const { data } = paperData
      return data.problems
    },
  },
  components: {
    exercises,

  },
};
</script>
<style lang="scss" scoped>
@import '@/style/base';

</style>
