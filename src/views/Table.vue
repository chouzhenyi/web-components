<template>
  <div>
    <div class="title">一个表格，携带checkbox 可拖动</div>
    <div class="table-wrapper">
      <z-table :options="listOptions"></z-table>
    </div>
  </div>
</template>

<script>
import zTable from "@/components/zzy/z-table"

export default {
  name: "Table",
  props: {},
  data() {
    return {
      list: [],
    }
  },
  computed: {
    listOptions() {
      const list = this.list
      const headers = [
        {
          prop: "name",
          label: "名称",
        },
        {
          prop: "count",
          label: "数量",
          width: 80,
        },
        {
          prop: "type",
          label: "类型",
          width: 150,
        },
      ]
      return {
        headers,
        list,
        checkbox: true,
        edit: true,
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const item = {
        name: '伊万卡',
        data: {},
        count: 12,
        type: 0,
      }
      const arr = []
      for(let i = 0; i < 30; i++) {
        arr.push({
          id: Math.floor(Math.random() * 1e5),
          ...item
        })
      }
      console.log(arr);
      this.list = arr
    }
  },
  components: {
    zTable,
  },
}

</script>
<style lang="scss" scoped>
  .title {
    line-height: 24px;
    font-size: 16px;
    text-align: center;
  }
  .table-wrapper {
    width: 500px;
    padding: 20px;
  }
</style>