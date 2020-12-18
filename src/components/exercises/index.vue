<template>
  <div class="font14 web-paper-exercise__list-wrapper">
    <div class="color3 table-header table-batch-header" v-show="isBatchChange">
      <section class="cursor item">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange">全选({{selects.length}})</el-checkbox>
      </section>
      <section class="cursor color-9b item del-wrapper"
       :class="{'del-active': selects.length}"
       @click="delItems"
       >
        <i class="iconfont icon-shanchu- del-icon"></i>
        <span class="ver-middle">删除</span>
      </section>
    </div>
    <div class="color6 table-header table-drag-header" v-show="!isBatchChange">
      <section class="item">
        <span class="pointer" @click="isBatchChange = !isBatchChange">批量操作</span>
      </section>
      <section class="item text-right">
        <span class="pointer" v-show="!isUnfold" @click="isUnfold = true">
          展开习题
          <i class="iconfont icon--shuangjiantouxiangxia"></i>
        </span>
        <span class="pointer" v-show="isUnfold" @click="isUnfold = false">
          收起习题
          <i class="iconfont icon--shuangjiantouxiangshang"></i>
        </span>
      </section>
    </div>
    <el-checkbox-group v-model="selects" @change="listCheckedChange">
      <draggable v-model="list" v-bind="dragOptions">
        <transition-group type="transition">
          <div class="back-f table__item-wrapper" v-for="(item, index) in list" :key="item.template_id">
            <div class="select-item__checkbox-wrapper" v-show="isBatchChange">
              <el-checkbox :key="item.template_id" :label="item.template_id" :value="item.template_id"></el-checkbox>
            </div>
            <div class="select-item__drag-wrapper pointer" v-show="!isBatchChange">
              <i class="iconfont icon--paixu2 drag-handle"></i>
            </div>
            <div class="item__inner-wrapper">
              <list-item :index="index+1" :batchoptions="batchOptions" :options="item" @change="itemPropertyChange"></list-item>
            </div>
          </div>
        </transition-group>
      </draggable>
    </el-checkbox-group>
  </div>
</template>

<script>
import listItem from "./item"
import decoratorMixin from "./mixins/decorator.mixin"
import draggable from 'vuedraggable'

export default {
  name: "exercises",
  props: {
    exercises: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      list: [],
      isIndeterminate: false,
      checkAll: false,
      selects: [],
      isBatchChange: false, // 是否批量操作习题 即：可勾选批量删除等
      isUnfold: false, // 是否展开习题
    };
  },
  computed: {
    batchOptions() {
      return {
        isUnfold: this.isUnfold
      }
    },
    dragOptions() {
      return {
        animation: 500,
        dragClass: "drag-class",
        handle: ".drag-handle",
        tag: 'div',
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.list = this.inputListDataAdjust(this.exercises)
      console.log(this.list)
    },
    itemPropertyChange({type, value, index}) {
      const problem = this.list.find(item => item.key == index)
      problem[type] && problem[type](value)
      setTimeout(()=>{
        
        console.log(problem, {type, value, index});
      })
    },
    // 全选
    checkAllChange(val) {
      this.selects = !!val ? this.list.map(item => {
        return item.template_id
      }) : [];
      this.isIndeterminate = false;
    },
    // 列表checkbox变动
    listCheckedChange(list) {
      const count = list.length
      const len = this.list.length
      this.checkAll = count === this.list.length
      this.isIndeterminate = count > 0 && count < len
    },
    // 批量删除
    delItems() {
      const selectLen = this.selects.length
      const listLen = this.list.length
      if(!selectLen) {
        return
      }
      const list = this.list.filter(item => {
        return this.selects.indexOf(item.template_id) < 0
      })
      this.list = this.problemsIndexHandle(list)
    },
  },
  components: {
    listItem,
    draggable,
  },
  mixins: [
    decoratorMixin,

  ]
};
</script>
<style lang="scss" scoped>
@import '@/style/base';
.table-header {
  display: flex;
  padding: 16px 20px 20px 20px;
}
.table-batch-header {
  .item {
    margin-right: 30px;
    &.del-wrapper {
      color: #c8c8c8;
      cursor: no-drop;
      .del-icon {
        vertical-align: baseline;
        margin-right: 10px;
      }
      &.del-active {
        color: $blue50;
        cursor: pointer;
      }
    }
  }
}
.table-drag-header {
  .item {
    width: 50%;
  }
}
.table__item-wrapper {
  flex: 1;
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #c8c8c8;
  .select-item__checkbox-wrapper, .select-item__drag-wrapper {
    height: 20px;
    line-height: 20px;
    padding:  0 16px 0 20px;
  }
  .select-item__checkbox-wrapper {
    ::v-deep .el-checkbox .el-checkbox__label {
      display: none;
    }
  }
  .item__inner-wrapper {
    flex: 1;
  }
}
.table-header {
  ::v-deep .el-checkbox {
    color: #333;
    font-weight: normal;
  }
  ::v-deep .el-checkbox__input.is-checked+.el-checkbox__label {
    color: $blue50;
  }
  ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
  ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: $blue50;
    border-color: $blue50;
  }
  ::v-deep .el-checkbox__label {
    line-height: 1;
  }
}

.drag-class {
  box-shadow: 0px 4px 10px rgba($color: #000, $alpha: .4);
}
</style>
