<template>
  <div>
    <h1>雨！雷！！</h1>
    <div class="list-wrapper">
      <h2>排序</h2>
      <h3>原始数组</h3>
      <div class="list-sort-wrapper">
        <div class="item" v-for="(item, index) in list" :key="index">{{item}}</div>
      </div>
      <h3>选择</h3>
      <div class="list-sort-wrapper">
        <div class="item" v-for="(item, index) in selectionList" :key="index">{{item}}</div>
      </div>
      <h3>插入</h3>
      <div class="list-sort-wrapper">
        <div class="item" v-for="(item, index) in insertionList" :key="index">{{item}}</div>
      </div>
      <h3>冒泡</h3>
      <div class="list-sort-wrapper">
        <div class="item" v-for="(item, index) in bubbleList" :key="index">{{item}}</div>
      </div>
      <h3>归并</h3>
      <div class="list-sort-wrapper">
        <div class="item" v-for="(item, index) in mergeList" :key="index">{{item}}</div>
      </div>
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
      list: [],
      selectionList: [],
      insertionList: [],
      bubbleList: [],
      mergeList: [],
    };
  },
  computed: {},
  created() {
    this.algorithmFactory = new algorithm([1])
    this.init()
  },
  methods: {
    init() {
      // 排序
      this.sort()

    },
    sort() {
      const list = this.creatNumList()
      this.list = list
      const factory = this.algorithmFactory
      const { selection, insertion, bubbleSort } = factory
      this.selectionList = selection(this.arrayCopy(list))
      this.insertionList = insertion(this.arrayCopy(list))
      this.bubbleList = bubbleSort(this.arrayCopy(list))
      this.mergeList = factory.mergeSort(this.arrayCopy(list))
    },
    creatNumList() {
      const list = []
      for(let i = 0; i < 10; i++) {
        list.push(randomNum(200))
      }
      return list
    },
    arrayCopy(list) {
      return [...list]
    },
  },
};
</script>
<style lang="scss" scoped>
.list-sort-wrapper {
  width: 100%;
  display: inline-grid;
  grid-template-columns: repeat(auto-fill, 50px);
  grid-column-gap: 10px;
  padding: 10px 0;
  text-align: center;
  color: #fff;
  line-height: 24px;
  font-size: 16px;
  .item {
    background: #5096f5;
  }
}
</style>