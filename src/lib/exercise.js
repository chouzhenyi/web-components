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
  Answers,
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
  this.Answers = Answers || [],
  this.HasRemark = !HasRemark
  this.Remark = Remark
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
      subClass.prototype = exerciseFactory.prototype
      return new subClass(params)
    } else {
      throw new Error('没有你需要的类')
    }
  } else {
    return new exerciseFactoryMethod(type, params)
  }
}

// 单选题
exerciseFactoryMethod.prototype = {
  SingleChoice(params = {}) {
    exerciseFactory.call(this, params)
    return this
  },
  MultipleChoice(params = {}) {
    exerciseFactory.call(this, params)
    const { HalfScore = 0 } = params
    this.HalfScore = HalfScore
    return this
  },
  Polling(params = {}) {
    exerciseFactory.call(this, params)
    const { voteMode = 0, PollingCount = 1, isScore, is_score } = params
    this.voteMode = voteMode
    this.PollingCount = PollingCount
    this.isScore = isScore
    this.is_score = is_score
    return this
  },
  // TODO: 填空、主观、判断
}

export { exerciseFactoryMethod }