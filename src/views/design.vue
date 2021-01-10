<template>
  <div class="wrapper">
    <div v-html="compositeContent"></div>
  </div>
</template>

<script>
import { CompositeRender } from "@/lib/learn/composite.js"

export default {
  props: {},
  data() {
    return {
      compositeContent: '',

    };
  },
  computed: {},
  created() {
    this.init()
  },
  methods: {
    init() {
      this.compositInit()
    },
    // 组合模式
    compositInit() {
      const levelTop = new CompositeRender(0, {
        wrapperClassName: 'composite-wrapper'
      })

      const levelTitle = new CompositeRender(1, {
        text: '组合模式的标题',
        className: 'title'
      })

      const levelContent = new CompositeRender(0, {
        wrapperClassName: "item-wrapper"
      })

      const levelItem1 = new CompositeRender(1, {
        text: "组合模式叶子结点条目一",
        className: "item",
      })
      const levelItem2 = new CompositeRender(1, {
        text: "组合模式叶子结点条目二",
        className: "item",
      })
      const levelItem3 = new CompositeRender(1, {
        text: "组合模式叶子结点条目三",
        className: "item",
      })
      levelContent.add(levelItem1)
      levelContent.add(levelItem2)
      levelContent.add(levelItem3)

      levelTop.add(levelTitle)
      levelTop.add(levelContent)

      this.compositeContent = levelTop.render()
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .composite-wrapper {
  margin: 10px;
  padding: 0 10px;
  border: 2px solid rgba($color: #ff1010, $alpha: .4);
  border-radius: 8px;
  background-color: #f7f8f9;
  .title {
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    font-weight: 500;
  }
  .item-wrapper {
    margin-bottom:10px;
    .item {
      padding: 4px 10px;
      border-bottom: dashed 1px rgba($color: #5096f5, $alpha: .3);
      line-height: 1.2;
      font-size: 14px;
      &:last-child {
        border-bottom: 0;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>