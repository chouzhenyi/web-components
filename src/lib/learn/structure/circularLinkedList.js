import { DoublyLinkedList, Node } from "./doublyLinkedList"

class CircularLinkedList extends DoublyLinkedList {
  constructor() {
    super()
  }
  insert(position, element) {
    if(position >= 0 && position <= this.length) {
      const node = new Node(element)
      if(this.length) {
        // TODO: 插入
        let current = this.findAt(position)
        let previous = current.previous
        let next = current.next

      } else {
        this.head = node
        this.tail = node
      }
      this.length++
      return true
    }
    return false
  }
}

export { CircularLinkedList }