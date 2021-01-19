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
          isShowGrayArea: this.isShowGrayAreaHandle(item)
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
    // 根据又没有答案解析和是不是填空题，决定是否展示灰色区域
    isShowGrayAreaHandle({ Remark = '', ProblemType = 0 }) {
      return !!Remark || ProblemType === 4
    },
    // TODO: 输出的习题数据整理
    outputListDataAdjust() {

    },
  }

}