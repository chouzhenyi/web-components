// 方法装饰器
function arrayDecorator() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function(...args: any[]) {
      // 对参数处理，必须是number 数组
      args = args.map(items => {
        return items.map((item:any) => {
          const value = +item
          return value ? value : 0
        })
      })
      // 调用方法的返回值
      const result = method.apply(this, args)
      // 返回调用函数的结果
      return result instanceof Array ? result.length ? result : ['没有结果'] : ['结果不是数组']
    }
  }
}
class algorithm {
  constructor() {
  }
  @arrayDecorator()
  selection(list: Array<number>) {
    const len = list.length
    for(let i = 0; i < len; i++) {
      let minIndex = i
      for(let j = i; j < len; j++) {
        if(list[j] < list[minIndex]) {
          minIndex = j
        }
      }
      [list[minIndex], list[i]] = [list[i], list[minIndex]]
    }
    return list
  }
  insertion(list: Array<number>) {
    const len = list.length
    let prevIndex = 0
    for(let i = 1; i < len; i++) {
      prevIndex = i - 1
      const item = list[i]
      while(prevIndex >=0 && list[prevIndex] > item) {
        list[prevIndex + 1] = list[prevIndex]
        prevIndex--
      }
      list[prevIndex + 1] = item
    }
    return list
  }
  bubbleSort(list: Array<number>) {
    const len = list.length
    for(let i = 0; i < len; i++) {
      for(let j = 0; j < len - 1 - i; j++) {
        if(list[j] > list[j + 1]) {
          [list[j], list[j + 1]] = [list[j + 1], list[j]]
        }
      }
    }
    return list
  }
  mergeSort(list: Array<number>):any {
    const len = list.length
    if(len <= 1) {
      return list
    }
    const middleIndex = Math.floor(len/2)
    return this.merge(this.mergeSort(list.slice(0 , middleIndex)), this.mergeSort(list.splice(middleIndex)))
  }
  merge(left: Array<number>, right: Array<number>) {
    const list = []
    while(left.length > 0 && right.length > 0) {
      if(left[0] < right[0]) {
        list.push(left.shift())
      } else {
        list.push(right.shift())
      }
    }
    while(left.length > 0) {
      list.push(left.shift())
    }
    while(right.length > 0) {
      list.push(right.shift())
    }
    return list
  }
}


export default algorithm