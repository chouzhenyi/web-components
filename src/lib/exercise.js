import { blanksHandle } from "./exerciseMethods"
function exerciseFactory({
  key = 1,
  LibraryID,
  library_id,
  ProblemType = 1,
  TemplateID,
  template_id,
  difficulty = 1,
  max_retry = 1,
  Type = 'SingleChoice',
  TypeText,
  Body = '',
  Options,
  Answer,
  HasRemark,
  Remark = '',
  showScore = true,
  Score = 1,
  score = 1,
  isEdit = false,
  data = {},

}) {
  score = Score
  this.key = key
  this.LibraryID = LibraryID
  this.library_id = library_id
  this.TemplateID = TemplateID
  this.template_id = template_id
  this.difficulty = difficulty
  this.max_retry = max_retry
  this.ProblemType = ProblemType
  this.Type = Type
  this.TypeText = TypeText
  this.Body = Body
  this.complexBody = this.getComplexBody()
  this.Options = Options || []
  this.Answer = Answer || [],
  this.HasRemark = !HasRemark
  this.Remark = Remark
  this.remarkFold = true
  this.showScore = !!showScore
  this.Score = Score
  this.score = score
  this.isEdit = !!isEdit
  this.data = data
}
exerciseFactory.prototype = {
  // TODO: 这里要实现body 部分留出空隙给题型题号
  getComplexBody() {
    return `
      <span class="font16 color3 font-weight500 item__complex-body-wrapper__pre">
      ${this.key}.（${this.TypeText}）
      </span>
      ${this.Body}
    `
  }
}

function exerciseFactoryMethod(type, params) {
  if(this instanceof exerciseFactoryMethod) {
    const subClass = this[type]
    if(subClass) {
      subClass.prototype = {
        ...exerciseFactory.prototype
      }
      exerciseProtoMethod(type, subClass.prototype)
      return new subClass(params)
    } else {
      throw new Error('没有你需要的类')
    }
  } else {
    return new exerciseFactoryMethod(type, params)
  }
}

exerciseFactoryMethod.prototype = {
  // 单选题
  SingleChoice(params = {}) {
    exerciseFactory.call(this, params)
    return this
  },
  // 多选题
  MultipleChoice(params = {}) {
    exerciseFactory.call(this, params)
    const { HalfScore = 0 } = params
    this.HalfScore = HalfScore
    return this
  },
  // 投票题
  Polling(params = {}) {
    exerciseFactory.call(this, params)
    const { voteMode = 0, PollingCount = 1, isScore, is_score } = params
    this.voteMode = voteMode
    this.PollingCount = PollingCount
    this.isScore = isScore
    this.is_score = is_score
    this.Answer = []
    return this
  },
  // 填空题
  FillBlank(params = {}) {
    exerciseFactory.call(this, params)
    const { Blanks, OrderInsensitive } = params
    this.Blanks = Blanks
    this.OrderInsensitive = !!OrderInsensitive
    this.Options = []

    return this
  },
  // 主观题
  ShortAnswer(params = {}) {
    exerciseFactory.call(this, params)
    const { AllowResults=[] } = params
    this.AllowResults = AllowResults
    this.Options = []
    this.Answer = []
    return this
  },
  // 判断题
  Judgement(params = {}) {
    exerciseFactory.call(this, params)
    this.Options = [
      {key: true, value: ""},
      {key: false, value: ""}
    ]
    return this
  }
}
 
// 给各个对象添加自己的方法
function exerciseProtoMethod(type, target) {
  let methods = {}
  switch(type) {
    case 'FillBlank':
      methods = { blanksHandle }
      break
    default:
      methods = {}
      break
  }
  for (let i in methods) {
    target[i] = methods[i]
  }
}

export { exerciseFactoryMethod }