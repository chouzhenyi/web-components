import { exerciseBuilder } from '../libs/exercise'
export default {
  methods: {
    // 输入习题数据整理
    inputListDataAdjust(list = []) {
      const indexList = this.problemsIndexHandle(list)
      const formatList =  this.exercisesBuildHandle(indexList)
      return formatList
    },
    // 格式化输入的习题数据
    exercisesBuildHandle(list = []) {
      return list.map(item => {
        return exerciseBuilder({
          ...item,
        })
      })
    },
    // 给习题列表添加题号
    problemsIndexHandle(list = []) {
      return list.map((item, index) => {
        const key = index + 1
        return {
          ...item,
          key,
        }
      })
    },
    // TODO: 输出的习题数据整理
    outputListDataAdjust() {

    },
  }

}