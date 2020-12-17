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
  const { Type, ProblemType } = params
  const factoryClasses = {
    SingleChoice,
    MultipleChoice,
    Polling,
    FillBlank,
    ShortAnswer,
    Judgement,
  }
  const targetClass = factoryClasses[Type]
  // 每个习题item 都要有的方法
  const commenMethods = [ 
    'setComplexBody',
    'setScore'
  ]
  setProtoMethods(targetClass, ...commenMethods)

  // 类型习题特有的方法
  let problemSelfMethods = []
  switch(ProblemType) {
    case 2:
      // 多选题
      problemSelfMethods = ['setHalfScore', 'halfIsScoreChange']
      break;
    case 3:
      // 投票题
      problemSelfMethods = ['setIsScore']
      break;
    default:
      break;
  }
  problemSelfMethods && problemSelfMethods.length && setProtoMethods(targetClass, ...problemSelfMethods)

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