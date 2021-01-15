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
// 归并排序，排序
function merge(left: Array<number>, right: Array<number>) {
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

// 快速排序，寻找中间位置
function partition(list: Array<number>, left: number, right: number) {
  const pivot = list[Math.floor((left + right)/2)]
  let i = left
  let j = right
  while(i < j) {
    while(list[i] < pivot) {
      i++
    }
    while(list[j] > pivot) {
      j--
    }
    if(i <= j) {
      [list[i], list[j]] = [list[j], list[i]]
      i++
      j--
    }
  }
  return i
}
function quick(list: Array<number>, left: number, right: number) {
  if (list.length) {
    const index = partition(list, left, right)
    if (left < index - 1) {
      quick(list, left, index - 1)
    }
    if (index < right) {
      quick(list, index, right)
    }
  }
}

// 堆排序相关
function heapfy(list, length, i) {
  const left = i * 2 + 1
  const right = i * 2 + 2
  let largest = i
  if(left < length && list[left] > list[largest]) {
    largest = left
  }
  if(right < length && list[right] > list[largest]) {
    largest = right
  }
  if(largest !== i) {
    [list[largest], list[i]] = [list[i], list[largest]]
    heapfy(list, length, largest)
  }
}
function buildHeap(list) {
  const length = list.length
  for(let i = Math.floor(length/2); i >= 0; i--) {
    heapfy(list, length, i)
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
  shellSort(list: Array<number>) {
    const len = list.length
    // 1、确定间隔
    let gap = 1
    while(gap < len/3) {
      gap = gap * 3 + 1
    }
    // 2、间隔不断缩小
    for(gap; gap > 0; gap = Math.floor(gap/3)) {
      for(let i = gap; i < len; i++) {
        // 3、认为前项是已经排序好的序列，将当前项插入到合适位置 
        let temp = list[i]
        let prevIndex = i - gap
        while(prevIndex >=0 && list[prevIndex] > temp) {
          list[prevIndex + gap] = list[prevIndex]
          prevIndex-= gap
        }
        list[prevIndex + gap] = temp
      }
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
    return merge(this.mergeSort(list.slice(0 , middleIndex)), this.mergeSort(list.splice(middleIndex)))
  }
  quickSort(list: Array<number>, left: number, right: number) {
    quick(list, left, right)
    return list
  }
  heapSort(list: Array<number>) {
    let length = list.length
    buildHeap(list)
    while(length > 1) {
      length--
      [list[0], list[length]] = [list[length], list[0]]
      heapfy(list, length, 0)
    }
    return list
  }
}


export default algorithm