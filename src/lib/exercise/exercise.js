class exerciseFactory {
  constructor({
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
  
  }){
    score = Score
    this.key = key
    this.LibraryID = LibraryID
    this.library_id = library_id
    this.TemplateID = TemplateID
    this.template_id = template_id
    this.difficulty = difficulty
    this.max_retry = max_retry
    this.ProblemType = +ProblemType
    this.Type = Type
    this.TypeText = TypeText
    this.Body = Body
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
}

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
    this.HalfScore = HalfScore
  }
}
// 投票题
class Polling extends exerciseFactory {
  constructor(params = {}) {
    super(params)
    const { voteMode = 0, PollingCount = 1, isScore, is_score } = params
    this.voteMode = voteMode
    this.PollingCount = PollingCount
    this.isScore = isScore
    this.is_score = is_score
    this.Answer = []
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

export {
  SingleChoice,
  MultipleChoice,
  Polling,
  FillBlank,
  ShortAnswer,
  Judgement,
}