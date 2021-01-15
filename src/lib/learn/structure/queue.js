import { DoublyLinkedList } from "./doublyLinkedList"

class Queue {
  constructor() {
    this.dataItems = new DoublyLinkedList()
  }
  enqueue(element) {
    this.dataItems.insert(this.size(), element)
  }
  dequeue() {
    return this.dataItems.removeAt(0)
  }
  front() {
    const val = this.dataItems.findAt(0)
    return val ? val.element : null
  }
  clear() {
    this.dataItems.clear()
  }
  size() {
    return this.dataItems.size()
  }
  isEmpty() {
    return !this.size()
  }
  toString() {
    let strResult = ''
    const dataItems = this.dataItems
    let index = 0
    const length = dataItems.size()
    while(index < length) {
      const item = dataItems.findAt(index)
      strResult += `${index}:${item.element},`
      index++
    }
    return strResult
  }
}
export default Queue