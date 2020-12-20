
// TODO: 类装饰器，没搞懂，需要再学习
function calculationClass(target: any) {
  return class extends target {
    constructor() {
      super()
    }
    add(a: number, b: number) {
      return a + b
    }
  }
}
// 访问器装饰器
function strGetter(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('访问器装饰器应用于访问器的属性描述符，可用于观测、修改、替换访问器的定义。')
  descriptor.enumerable = true
  descriptor.configurable = false
}

// 属性装饰器 TODO: this 指向问题
// 触发属性setter 只能是对对象直接赋值，构造函数初始化不会？
function propertyDes(target: any, propertyName: string) {
  let val = '王富贵'
  Object.defineProperty(target, propertyName, {
    get() {
      console.log(`属性装饰器 getter: ${propertyName}`)
      return val
    },
    set(newVal) {
      console.log(`属性装饰器 setter: ${propertyName}`)
      val = newVal
    },
    enumerable: true,
    configurable: true,
  })
}

// 方法装饰器
function methodDec(target:Object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
  const method = propertyDescriptor.value
  propertyDescriptor.value = function(...args: any[]) {
    const params = args.join(' ')
    console.log(`方法装饰器${params}`)
    const result = method.apply(this, args)
    const strR = JSON.stringify(result)
    console.log(`函数调用: ${propertyName}(${params}) => ${strR}`)
    return result
  }
  return propertyDescriptor
}


export { calculationClass, strGetter, methodDec, propertyDes }