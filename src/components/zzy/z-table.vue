<template>
  <div class="wrapper">
    <div class="header-wrapper">
      <div class="check-wrapper">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange">全选</el-checkbox>
      </div>
      <div class="item" v-for="(item, index) in headers" :key="index" :style="item | listFilter">
        {{item.label}}
      </div>
    </div>
    <el-checkbox-group v-model="selects" @change="listCheckedChange">
      <draggable v-model="list">
        <transition-group>
          <div class="list-wrapper" v-for="(item, index) in list" :key="index">
            <div class="check-wrapper">
              <el-checkbox :key="item.id" :label="item.id"></el-checkbox>
            </div>
            <div class="item" v-for="(header, hIndex) in headers" :key="hIndex" :style="header | listFilter">
              {{item[header.prop]}}
            </div>
            <div class="item drag-handle">拖动</div>
          </div>
        </transition-group>
      </draggable>
    </el-checkbox-group>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: {
    options: {
      type: Object,
      default: {},
      required: true,
    }
  },
  data() {
    return {
      isIndeterminate: false,
      checkAll: false,
      selects: [],
      list: [],
    };
  },
  computed: {
    headers() {
      const { headers = [] } = this.options
      return headers
    },
    dragOptions() {
      return {
        dragClass: "drag-class",
        handle: ".drag-handle"
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { list = [] } = this.options
      this.list = JSON.parse(JSON.stringify(list))
    },
    checkAllChange(val) {
      this.selects = val ? this.list.map(item => {
        return item.id
      }) : [];
      this.isIndeterminate = false;
    },
    listCheckedChange(val) {
      const count = val.length
      const len = this.list.length
      this.checkAll = count === this.list.length
      this.isIndeterminate = count > 0 && count < len
    },
    onDraggableHandle(e) {
      conole.log(e)
    },
  },
  filters: {
    listFilter(item) {
      const { width } = item
      const styleObj = {}
      if(width) {
        styleObj.width = `${width}px`
      } else {
        styleObj.flex = 1
      }
      return styleObj
    }
  },
  directives: {
  },
  components: {
    draggable,
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  .check-wrapper {
    width: 100px;
  }
  .header-wrapper {
    line-height: 30px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .header-wrapper, .list-wrapper {
    display: flex;
  }
  .list-wrapper {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fff;
  }
  .item {
    font-size: 14px;
    border-left: 1px solid #ddd;
  }
  .drag-class {
    box-shadow: 0px 4px 10px rgba($color: #000, $alpha: .4);
  }

  .drag-handle {
    cursor: move;
  }
}
</style>