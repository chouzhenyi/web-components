import LinkedList from "./linkedList"
class Stack{
  constructor() {
    // 利用连标存储数据
    this.dataItems = new LinkedList()
  }
  push(element) {
    this.dataItems.insert(0, element)
  }
  pop() {
    this.dataItems.removeAt(0)
  }
  peek() {
    const { element = null } = this.dataItems.findAt(0) || {}
    return element
  }
  isEmpty() {
    return this.dataItems.isEmpty()
  }
  size() {
    return this.dataItems.size()
  }
  clear() {
    while(!this.dataItems.isEmpty()) {
      this.dataItems.removeAt(0)
    }
    return true
  }
  toString() {
    let strResult = ''
    const len = this.dataItems.size()
    let i = 0
    while(i < len) {
      const { element = 'none' } = this.dataItems.findAt(i) || {}
      console.log(i, element, this.dataItems);
      strResult += `${element},`
      i++
    }
    return strResult
  }
}

export default Stack