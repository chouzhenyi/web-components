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
          <div class="back-f table__item-wrapper" v-for="(item, index) in list" :key="item.template_id" @mouseleave="exerciseMouseLeave(item)">
            <div class="select-item__checkbox-wrapper" v-show="isBatchChange">
              <el-checkbox :key="item.template_id" :label="item.template_id" :value="item.template_id"></el-checkbox>
            </div>
            <div class="select-item__drag-wrapper pointer" v-show="!isBatchChange">
              <i class="iconfont icon--paixu2 drag-handle"></i>
            </div>
            <div class="item__inner-wrapper">
              <div class="color-9b edit-del-move-wrapper">
                <i class="iconfont icon-bianji" @click="editMoveDelHandle(0, index)"></i>
                <i class="iconfont icon--shangshengEEED" @click="editMoveDelHandle(1, index)" v-show="index !== 0"></i>
                <i class="iconfont icon--xiajiangEEED" @click="editMoveDelHandle(2, index)" v-show="index !== listLen - 1"></i>
                <i class="iconfont icon-shanchu-" @click="editMoveDelHandle(3, index)"></i>
              </div>
              <list-item :index="index+1" :batchoptions="batchOptions" :options="item" @change="itemPropertyChange" :key="item.template_id"></list-item>
              <div class="color50 text-center insert-exercise-wrapper" v-show="batchOptions.isUnfold">
                <span class="pointer" @click="addExercise(item)">
                  <i class="iconfont icon--tianjiabanji ver-middle"></i>
                  <span class="font12 ver-middle">点击此处添加习题</span>
                </span>
                <div class="color6 font14 popover" v-show="item.showFooterAddExercisePopover">
                  <div class="item" @click="batchAddExerciseHandle(0)">添加习题</div>
                  <div class="item" @click="batchAddExerciseHandle(1)">批量导入</div>
                </div>
              </div>
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
      isUnfold: true, // 是否展开习题
      prevAddIndex: 0,
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
    },
    listLen() {
      return this.list.length
    },
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.list = this.inputListDataAdjust(this.exercises)
    },
    // 根据传入的type 调用当前习题对象的方法
    itemPropertyChange({type, value, index}) {
      const problem = this.list.find(item => item.key == index)
      problem[type] && problem[type](value)
      console.log(problem, {type, value, index});
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
    // 删除
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
    // 编辑、移动、删除单个习题
    editMoveDelHandle(type, index) {
      const item = this.list[index]
      console.log(item)
      switch(type) {
        case 0:
          // TODO: 编辑
          console.log('编辑')
          break;
        case 1: // 上移
          this.$set(this.list, index, this.list[index - 1])
          this.$set(this.list, index - 1, item)
          break;
        case 2: // 下移
          this.$set(this.list, index, this.list[index + 1])
          this.$set(this.list, index + 1, item)
          break;
        case 3:
          this.list.splice(index, 1)
          break;
      }
    },
    // 添加习题
    addExercise(item) {
      item && item.showFooterAddExercisePopoverHandle && item.showFooterAddExercisePopoverHandle(1)
    },
    // 鼠标离开当前习题，注销当前习题之前需要展示的内容或行为
    exerciseMouseLeave(item) {
      if(item) {
        item.showFooterAddExercisePopoverHandle && item.showFooterAddExercisePopoverHandle(0)
      }
    },
    // 特定位置添加习题 type -- 0: 单个添加，1: 批量添加
    batchAddExerciseHandle(type, index) {
      // TODO: 这里具体实现
      switch(type) {
        case 0:
          // 添加单个习题
          break
        case 1:
          // 批量添加
          break
        default:

      }
      this.prevAddIndex = index
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
  border-bottom: 1px solid #ddd;
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
  padding: 20px 0 10px 0;
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
    position: relative;
    flex: 1;
    .edit-del-move-wrapper {
      position: absolute;
      top: 0;
      right: 20px;
      z-index: 1;
      i {
        cursor: pointer;
        padding: 10px;
      }
    }
  }
  .insert-exercise-wrapper {
    position: relative;
    border: 1px dashed $blue50;
    height: 24px;
    line-height: 24px;
    margin-right: 20px;
    visibility: hidden;
    .popover {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, calc(-100% - 20px));
      background: #fff;
      border-radius: 4px;
      min-width: 150px;
      padding: 5px 0;
      z-index: 2000;
      line-height: 34px;
      word-break: break-all;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      text-align: center;
      cursor: pointer;
      .item {
        &:hover {
          background: rgba($color: $blue50, $alpha: .1);
          color: $blue50;
        }
      }
    }
  }
  &:hover {
    .insert-exercise-wrapper {
      visibility: visible;
    }
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
