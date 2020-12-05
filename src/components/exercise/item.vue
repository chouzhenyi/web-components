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
        <!-- 投票题没有答案解析 这里复用部分答案解析的样式 -->
        <div class="remark-wrapper" v-if="item.ProblemType === 3">
          <div class="inline-block font-weight500">投票模式：</div>
          <span v-if="item.PollingCount > 1" class="font12 color-9b vote-mode">
            多选：{{item.PollingCount}}项
          </span>
          <span class="font12 color-9b vote-mode" v-else>单选</span>
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
      <div class="exercise-item__other-property-wrapper other-property-wrapper">
        <!-- 投票题是否计分 -->
        <div class="other-property-item-wrapper" v-if="item.ProblemType === 3">
          <div class="inline-block font14 color3 exercise__item-label">是否计分</div>
          <div class="inline-block font14 color6 exercise__item-polling__is-score">
            <el-radio-group v-model="item.isScore" @change="pollingIsScoreChange">
              <el-radio :label="0">不计分</el-radio>
              <el-radio :label="1">计分</el-radio>
            </el-radio-group>
          </div>
        </div>
        <!-- 分数 -->
        <div class="other-property-item-wrapper" v-show="item.ProblemType !== 3 || item.ProblemType === 3 && !!item.isScore">
          <div class="inline-block font14 color3 exercise__item-label">本题分值</div>
          <score v-model="item.Score" @change="scoreChange"></score>
        </div>
        <!-- 多选题判分规则-->
        <div class="other-property-item-wrapper" v-if="item.ProblemType === 2">
          <div class="inline-block font14 color3 exercise__item-label">判分规则</div>
          <div class="inline-block">
            <el-select v-model="item.halfIsScore" popper-class="other-property-item__half-score" @change="halfIsScoreChange">
              <el-option
                v-for="item in item.scoreRules"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="inline-block multi-half-wrapper" v-show="item.halfIsScore">
            <span class="font14 color6">少选得分：</span>
            <score v-model="item.HalfScore" @change="halfScoreChange"></score>
          </div>
        </div>
        <!-- 投票题是否匿名 -->
        <div class="other-property-item-wrapper" v-if="item.ProblemType === 3">
          <div class="inline-block font14 color3 exercise__item-label">是否匿名</div>
          <div class="inline-block">
            <el-checkbox v-model="item.Anonymous">
              匿名投票
            </el-checkbox>
            <span class="color6 font14 anonymous-tips">
              <i class="iconfont icon--yishoujuan"></i>
              提示：开启后仅有投票分布，无名单详情
            </span>
          </div>
        </div>
        <!-- TODO: 填空题分数列表-->
      </div>
    </div>
    
  </div>
</template>

<script>
// 分数
import score from "./common/score"

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
      this.eventTrigger({
        type: "setScore",
        value: score,
      })
    },
    // 少选是否得分变更
    halfIsScoreChange(value) {
      this.eventTrigger({
        type: "halfIsScoreChange",
        value,
      })
    },
    // 多选题少选得分设置分数变更
    halfScoreChange(score) {
      this.eventTrigger({
        type: "setHalfScore",
        value: score,
      })
    },
    // 投票题"是否计分"改变
    pollingIsScoreChange(val) {
      this.eventTrigger({
        type: "setIsScore",
        value: val,
      })
    },
    eventTrigger(params) {
      this.$emit('change', {
        ...params,
        index: this.index,
      })
    }
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
  },
  components: {
    score
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
      padding: 20px 0;
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
      .vote-mode {
        padding: 0 8px;
        line-height: 20px;
        background: #e6e6e6;
      }
    }
    .other-property-wrapper {
      padding-top: 10px;
      .other-property-item-wrapper {
        padding-bottom: 20px;
        .exercise__item-label {
          width: 114px;
          height: 34px;
          line-height: 34px;
          font-weight: 500;
        }
        .multi-half-wrapper {
          padding-left: 10px;
        }
        .anonymous-tips{
          padding-left: 10px;
        }
      }
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
.exercise-item__other-property-wrapper {
  .el-radio__input.is-checked .el-radio__inner,
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    border-color: $blue50;
    background-color: $blue50;
  }
  .el-radio__input.is-checked+.el-radio__label,
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: $blue50;
  }
  .el-select .el-input.is-focus .el-input__inner {
    border-color: $blue50;
  }
}
.other-property-item__half-score .el-select-dropdown__item.selected {
  color: $blue50;
}
</style>