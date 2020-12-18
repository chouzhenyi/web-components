import { scoreVerify } from "./verifyProperties"
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
    
    this.setComplexBody()
  }
  // TODO: 这里要实现body 部分留出空隙给题型题号
  setComplexBody() {
    const { key = 0, TypeText='', Body = '' } = this
    const complexBody = `
      <span class="font16 color3 font-weight500 item__complex-body-wrapper__pre">
      ${key}.（${TypeText}）
      </span>
      ${Body}
    `
    this.complexBody = complexBody
  }
  // 设置、修改当前分数
  setScore(newScore) {
    const { ProblemType } = this
    let targetScore = scoreVerify(newScore)
    if(ProblemType === 3) {
      this.score = this.Score = targetScore || 0
    } else {
      this.score = this.Score = targetScore || 1
    }
  }

}

export { exerciseFactory }