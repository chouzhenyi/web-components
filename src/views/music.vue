<template>
  <div class="music-wrapper">
    <audio src="../../public/music/you.mp3" autoplay controls loop ref="audio"></audio>
    <div>
      <div v-for="(item, index) in list" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>

// 事件截流
function throttle(fn, duration) {
  let timer = null
  return (...args) => {
    if(timer === null) {
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
        typeof fn === "function" && fn.apply(null, args)
      }, duration)
    }
  }
}
export default {
  name: 'music',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.init()
  },
  mounted() {
    const a = 0
    const audio = this.$refs.audio
    if(audio) {
      const timeupdateHandle = throttle(this.timeupdate, 200)
      audio.addEventListener('timeupdate', function(ev) {
        timeupdateHandle(ev)
      })
    }
  },
  methods: {
    init() {
      const list = ["秦时明月汉时关", "万里长征人未还", "但使龙城飞将在", "不教胡马度阴山", "狼烟千里乱葬岗", "乱世孤魂无人访", "无言苍天笔墨寒", "笔刀春秋以血偿", "谈爱恨 不能潦草", "战鼓敲啊敲", "用信任立下誓言我来熬", "这缘分 像一道桥", "旌旗飘啊飘", "你想走 就请立马抽刀", "爱一笔勾销", "谈爱恨 不能潦草", "红尘烧啊烧", "以生死 无愧证明谁重要", "这缘分 像一道桥", "故事瞧一瞧", "走天涯 你我卸下战袍", "梦回长城谣", "秦时明月汉时关", "万里长征人未还", "但使龙城飞将在", "不教胡马度阴山", "血肉筑城万箭穿", "盔甲染血映月光", "远方胡笳催断肠", "狼嚎骤起震边关", "谈爱恨 不能潦草", "战鼓敲啊敲", "用信任立下誓言我来熬", "这缘分 像一道桥", "旌旗飘啊飘", "你想走 就请立马抽刀", "爱一笔勾销", "谈爱恨 不能潦草", "红尘烧啊烧", "以生死 无愧证明谁重要", "这缘分 像一道桥", "故事瞧一瞧", "走天涯 你我卸下战袍", "梦回长城谣", "这缘分 像一道桥", "故事瞧一瞧", "走天涯 你我卸下战袍", "梦回长城谣"]
      this.list = list
    },
    timeupdate(ev) {
      // console.log(ev)
    },
  },
  components: {
  }
}
</script>
<style lang="scss" scoped>
.music-wrapper {
  padding: 10px;
  background: #f7f8f9;
  audio {
    width: 100%;
    height: 50px;
    display: block;
  }
}
</style>
