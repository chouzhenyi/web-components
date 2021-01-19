import { exerciseFactory } from "./abstractExercise"
import { scoreVerify } from "./verifyProperties"
// 注：所有习题都需要继承抽象习题方法，包含通用的属性和方法
// 单选题
class SingleChoice extends exerciseFactory {
  constructor(params = {}) {
    super(params)
  }
}
// 多选题
class MultipleChoice extends exerciseFactory {
  constructor(params = {}) {
    super(params)
    const { HalfScore = 0 } = params
    this.halfIsScore = +!!HalfScore
    this.HalfScore = HalfScore
    this.scoreRules = [
      {
        value: 1,
        label: "少选给部分分"
      },
      {
        value: 0,
        label: "少选不给分"
      },
    ]
  }
  // 多选题 少选是否计分变更
  halfIsScoreChange(value) {
    this.setHalfScore(+!!value)
  }
  // 多选题 少选得分分数变更以及校验 (不能比本题分数大)
  setHalfScore(value) {
    const score = scoreVerify(value)
    this.HalfScore = score > this.Score ? this.Score : score
  }
}
// 投票题
class Polling extends exerciseFactory {
  constructor(params = {}) {
    super(params)
    const { voteMode = 0, PollingCount = 1, isScore, is_score, Anonymous } = params
    this.Anonymous = Anonymous
    this.voteMode = voteMode
    this.PollingCount = PollingCount
    this.isScore = isScore
    this.is_score = is_score
    this.Answer = []
  }
  // 投票题 是否计分变更，带动分数重置
  setIsScore(value) {
    this.is_score = this.isScore = +!!value
    this.setScore(value)
  }
}
// 填空题
class FillBlank extends exerciseFactory {
  constructor(params = {}) {
    super(params)
    const { Blanks, OrderInsensitive } = params
    this.Blanks = Blanks
    this.OrderInsensitive = !!OrderInsensitive
    this.Options = []
    // 整理答案列表展示文案
    this.blankResultTextHandle()
  }
  calculateScore() {
    const score = this.Blanks.reduce((total, item) => {
      return total + item.Score
    }, 0)
    this.setScore(score)
  }
  blankScoreChange({index, score}) {
    this.Blanks[index].score = this.Blanks[index].Score = scoreVerify(score)
    this.calculateScore()
  }
  blankResultTextHandle() {
    const Blanks = this.Blanks || []
    this.blanksResultTexts = Blanks.map((item, index) => {
      const {
        Answers,
        CaseSensitive,
        FuzzyMatch  
      } = item
      const text = Answers.reduce((prev, cur) => {
        const delimiterText = prev ? ' / ' : ''
        return `${prev}${delimiterText}${cur}`
      }, '')
      return {
        CaseSensitive,
        FuzzyMatch,
        num: index + 1,
        text,
      }
    })
  }
}
// 主观题
class ShortAnswer extends exerciseFactory {
  constructor(params = {}) {
    super(params)
    const { AllowResults } = params
    this.AllowResults = AllowResults
    this.Options = []
    this.Answer = []
  }
}
class Judgement extends exerciseFactory {
  constructor(params = {}) {
    super(params)
    this.Options = [
      {key: true, value: ""},
      {key: false, value: ""}
    ]
  }
}

// 策略?
function exerciseBuilder(params = {}) {
  const { Type } = params
  const factoryClasses = {
    SingleChoice,
    MultipleChoice,
    Polling,
    FillBlank,
    ShortAnswer,
    Judgement,
  }
  const targetClass = factoryClasses[Type]
  if(!!targetClass) {
    return new targetClass(params)
  } else {
    throw new Error('没有你需要的习题类')
  }
}
export { exerciseBuilder }