import { scoreVerify } from "./verifyProperties"
// TODO: 这里要实现body 部分留出空隙给题型题号
const MethodsStores = {
  setComplexBody() {
    const { key = 0, TypeText='', Body = '' } = this
    const complexBody = `
      <span class="font16 color3 font-weight500 item__complex-body-wrapper__pre">
      ${key}.（${TypeText}）
      </span>
      ${Body}
    `
    this.complexBody = complexBody
  },
  setScore(newScore) {
    const { ProblemType } = this
    let targetScore = scoreVerify(newScore)
    if(ProblemType === 3) {
      this.score = this.Score = targetScore || 0
      this.is_score = this.isScore = +!!targetScore
    } else {
      this.score = this.Score = targetScore || 1
    }
  }
}
/**
 * 
 * @param {*} target 方法添加的目标类
 * @param  {...any} args 需要添加的方法
 */
function setProtoMethods(target, ...args) {
  args.forEach(name => {
    if(typeof MethodsStores[name] === "function") {
      target.prototype[name] = MethodsStores[name]
    }
  })
}
export { setProtoMethods }