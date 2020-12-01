import {
  SingleChoice,
  MultipleChoice,
  Polling,
  FillBlank,
  ShortAnswer,
  Judgement,
} from "./exercise"
import { setProtoMethods } from "./exerciseMethods"

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
  setProtoMethods(targetClass, 
    'setComplexBody',
    'setScore')

  if(!!targetClass) {
    const result = new targetClass(params)
    // 主动给习题添加混入题号和题型的body
    result.setComplexBody()
    return result
  } else {
    throw new Error('没有你需要的习题类')
  }
}
export { exerciseBuilder }