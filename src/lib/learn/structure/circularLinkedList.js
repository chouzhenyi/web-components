import { DoublyLinkedList, Node } from "./doublyLinkedList"

class CircularLinkedList extends DoublyLinkedList {
  constructor() {
    super()
  }
  insert(position, element) {
    if(position >= 0 && position <= this.length) {
      const node = new Node(element)
      if(this.length) {
        let current = null
        if (position === this.length) {
          node.prev = this.tail
          this.tail.next = node

          node.next = this.head
          this.head.next = node

          this.tail = node
        } else if(position === 0) {
          node.next = this.head
          this.head.prev = node

          node.prev = this.tail
          this.tail.next = node

          this.head = node
        } else {
          current = this.findAt(position)
          let previous = current.prev
          node.next = current
          node.prev = previous
          current.prev = node
        }
      } else {
        this.head = node
        this.tail = node
      }
      this.length++
      return true
    }
    return false
  }
  removeAt(position) {
    if (position >= 0 && position < this.length) {
      let current = this.head
      if(this.length === 1) {
        this.head = null
        this.tail = null
      } else {
        if (position === 0) {
          this.head = this.head.next
          this.head.prev = this.tail
          this.tail.next = this.head
        } else if(position === this.length - 1) {
          current = this.tail
          this.tail = this.tail.prev
          this.head.prev = this.tail
          this.tail.next = this.head
        } else {
          current = this.findAt(position)
          current.prev.next = current.next
          current.next.prev = current.prev
        }
      }
      this.length--
      return current.element
    }
    return null
  }
}

export { CircularLinkedList }