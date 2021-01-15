import Queue from "./queue"

class PriorityElement {
  constructor(element, priority) {
    this.element = element
    this.priority = priority
  }
}

class PriorityQueue extends Queue {
  constructor() {
    super()
  }
  enqueue(element, priority) {
    const priorityNode = new PriorityElement(element, priority)
    const dataItems = this.dataItems
    if(dataItems.isEmpty()) {
      dataItems.insert(0, priorityNode)
    } else {
      let item = dataItems.head
      let index = 0
      while(item && item.element.priority >= priorityNode.priority) {
        item = item.next
        index++
      }
      dataItems.insert(index, priorityNode)
    }
  }
  toString() {
    let strResult = ''
    const dataItems = this.dataItems
    let index = 0
    const length = dataItems.size()
    while(index < length) {
      const item = dataItems.findAt(index).element
      strResult += `序号:${index}, 权重: ${item.priority}, ${item.element}=>`
      index++
    }
    return strResult
  }
}

export default PriorityQueue