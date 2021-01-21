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
    isShowGrayArea,
  }){
    // 音频地址替换
    const { Body: cBody, Remark: cRemark, Options: cOptions } = this.audioUrlReplace({ Body, Remark, Options })

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
    this.Body = cBody
    this.Options = cOptions || []
    this.Answer = Answer || [],
    this.HasRemark = !HasRemark
    this.Remark = cRemark
    this.remarkFold = true
    this.showScore = !!showScore
    this.Score = Score
    this.score = score
    this.isEdit = !!isEdit
    this.data = data
    this.isShowGrayArea = isShowGrayArea
    this.showFooterAddExercisePopover = false
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
  // 音频地址替换
  audioUrlReplace({ Body, Options, Remark }) {
    const tempOptions = Options instanceof Array ? Options.map(item => {
      return {
        ...item,
        value: this.strLinkReplace(item.value),
      }
    }) : Options
    return {
      Body: this.strLinkReplace(Body),
      Remark: this.strLinkReplace(Remark),
      Options: tempOptions
    }
  }
  strLinkReplace(str) {
    const reg = /http:\/\/([a-z|A-Z|0-9]+)\.ykt\.io\/([a-z|A-Z|0-9]+)/g;
    const targetStr = 'https://qn-$1.yuketang.cn/$2'
    return `${str}`.replace(reg, targetStr);
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
  showFooterAddExercisePopoverHandle(val) {
    this.showFooterAddExercisePopover = !!val
  }
}

export { exerciseFactory }