<template>
  <div class="exercise__item__score-wrapper">
    <el-input-number
      :controls="false"
      :precision="1"
      :step="0.5"
      :max="100"
      ref="input"
      :value="value"
      @change="change"
      :disabled="!canEdit"
    >
    </el-input-number>
    <span>
      <span class="font14">分</span>
      <i class="iconfont icon-bianji color6" v-if="canEdit"></i>
    </span>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: Number,
    canEdit: {
      type: Boolean,
      default: true,
    }

  },
  methods: {
    change(value) {
      this.$emit('change', value)
    },
  },
};
</script>
<style lang="scss" scoped>
.exercise__item__score-wrapper {
  position: relative;
  width: 188px;
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: 4px;
  i {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
  & ::v-deep {
    .el-input-number.is-without-controls .el-input__inner {
      padding: 0;
    }
    .el-input-number {
      width: 40px;
      height: 32px;
      line-height: 32px;
    }
    .el-input__inner {
      height: 32px;
      line-height: 32px;
      border: none;
      color: #333;
      font-size: 14px;
    }
    .el-input.is-disabled .el-input__inner {
      background: #fff;
    }
  }
}
</style>