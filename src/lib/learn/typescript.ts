import { calculationClass, strGetter, methodDec, propertyDes } from "./common/decorator"

// TODO: 类装饰器
class Calculation {
  @propertyDes
  msg: string
  constructor(public info: string) {
    this.msg = ''
  }
  @strGetter
  get desInfo() {
    return this.info
  }
  @methodDec
  add(a: number, b: number) {
    return a + b
  }
}

export { Calculation }