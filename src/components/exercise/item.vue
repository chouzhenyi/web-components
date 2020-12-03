<template>
  <div class="wrapper">
    <div class="item" v-for="(item, index) in list" :key="index">
      <!-- 题干 -->
      <div class="body-wrapper item__complex-body-wrapper" v-html="item.complexBody"></div>
      <!-- 选项 -->
      <div class="options-wrapper">
        <div class="options__item-wrapper" 
          :class="{ 'judg-wrapper': item.Type === 'Judgement' }" 
          v-for="(option, oIndex) in item.Options" :key="oIndex"
          >
          <div class="option-key">
            <div class="item-dot" :class="option | keyStyleFilter(item)">
              {{option | keyFilter(item)}}
              <span v-if="item.Type === 'Judgement'">
                <i class="el-icon-check" v-if="option.key === true"></i>
                <i class="el-icon-close" v-if="option.key === false"></i>
              </span>
            </div>
          </div>
          <div class="option__content" v-html="option.value"></div>
        </div>
      </div>
      <!-- 答案解析 -->
      <div class="remark-wrapper" v-if="item.Remark">
        <div class="folder" @click="item.remarkFold = !item.remarkFold">
          <span>查看解析</span>
          <i v-show="item.remarkFold" class="el-icon-arrow-up"></i>
          <i v-show="!item.remarkFold" class="el-icon-arrow-down"></i>
        </div>
        <div v-html="item.Remark" v-show="!item.remarkFold"></div>
      </div>
      <div class="other-property-wrapper">
        <!-- TODO: 投票题是否计分 -->
        <!-- TODO: 分数 这里应该做二次封装，以符合设计需要 -->
        <el-input-number
          :controls="false"
          v-model="item.Score"
          :precision="1"
          :step="0.5"
          :max="100"
          @change="scoreChange">
        </el-input-number>
        <!-- TODO: 多选题判分规则-->
        <!-- TODO: 投票题是否匿名-->
        <!-- TODO: 填空题分数列表-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: [String, Number],
      required: true,
    },
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],

    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.list = [this.options]
    },
    scoreChange(score) {
      this.$emit('scorechange', {
        score,
        inex: this.index
      })
    },
  },
  filters: {
    // 选项key 文案
    keyFilter(option, item) {
      let { ProblemType } = item
      const { key } = option
      ProblemType = +ProblemType || 1
      switch(ProblemType) {
        case 1:
          return key
          break
        case 2:
          return key
          break
        case 3:
          return key
          break
        default:
          return ''
      }
    },
    // 选项key 样式
    keyStyleFilter(option, item) {
      let { ProblemType, Answer=[] } = item
      let { key } = option
      ProblemType = +ProblemType || 1
      const classList = []
      // 正确选项
      if(Answer.indexOf(`${key}`) > -1) {
        classList.push('item-dot__right')
      }
      // 选项圆角
      if (ProblemType === 2) {
        classList.push('item-dot__muti')
      } else {
        classList.push('item-dot__round')
      }
      return classList.join(' ')
    },
  }
};
</script>
<style lang="scss" scoped>
@import '@/style/base';
$blue: #5096F5;
.wrapper {
  position: relative;
  margin-top: 20px; 
  padding: 0 20px 0 30px;
  border-bottom: 1px solid #c8c8c8;
  .item {
    position: relative;
    padding-bottom: 20px;
    .body-wrapper {

    }
    .options-wrapper {
      padding-top: 20px;
      border-bottom: 1px dashed #ddd;
      .options__item-wrapper {
        display: flex;
        margin-bottom: 20px;
        line-height: 32px;
        font-size: 14px;
        .option-key {
          padding-right: 15px;
          .item-dot {
            width: 32px;
            height: 32px;
            line-height: 32px;
            vertical-align: middle;
            text-align: center;
            border: 1px solid #9b9b9b;
            color: #9b9b9b;
            font-size: 16px;
            font-weight: 500;
          }
          .item-dot__right {
            color: #fff;
            background: $blue;
            border-color: $blue;
          }
          .item-dot__muti {
            border-radius: 4px;
          }
          .item-dot__round {
            border-radius: 50%;
          }
        }
        .option__content {
          flex: 1;
        }
      }
      .judg-wrapper {
        display: inline-block;
      }
    }
    .remark-wrapper {
      margin-top: 20px;
      padding: 10px;
      line-height: 26px;
      background: #f5f5f5;
      border-radius: 4px;
      font-size: 16px;
      color: #333;
      .folder {
        color: #5DA0FC;
        font-size: 12px;
        display: inline-block;
        cursor: pointer;
      }
    }
    .other-property-wrapper {
      padding-top: 10px;
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 20px;
    background: $blue;
  }
}
</style>
<style lang="scss">
@import '@/style/base';
.item__complex-body-wrapper {
  position: relative;
  width: 530px;
  &__pre {
    // position: absolute;
    // top: 0;
    // left: 0;
    // z-index: 1;
  }
}
</style>