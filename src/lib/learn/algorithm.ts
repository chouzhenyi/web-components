function arrayDecorator() {
  return function(target: Array<number>, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(propertyKey)
  }
}
class algorithm {
  constructor() {
  }
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
}


export default algorithm