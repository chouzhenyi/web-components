<template>
  <div class="wrapper">
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="body-wrapper item__complex-body-wrapper" v-html="item.complexBody"></div>
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
  },
};
</script>
<style lang="scss" scoped>
@import '@/style/base';
$blue: #5096F5;
.wrapper {
  position: relative;
  padding-left: 30px;
  .item {
    position: relative;
    .body-wrapper {

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
  &__pre {
    // position: absolute;
    // top: 0;
    // left: 0;
    // z-index: 1;
  }
}
</style>