import { LinkedList } from "./linkedList"
class Node {
  constructor(element) {
    this.element = element
    this.prev = null
    this.next = null
  }
}
class DoublyLinkedList extends LinkedList{
  constructor() {
    super()
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  insert(position, element) {
    if(position >= 0 && position <= this.length) {
      const node = new Node(element)
      let previous = null
      let current = this.head
      let index = 0
      if(position === 0) {
        if(!this.head) {
          this.head = node
          this.tail = node
        } else {
          node.next = current
          current.prev = node
          this.head = node
        }
      } else if(position === this.length) {
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      } else {
        while(index++ < position) {
          previous = current
          current = current.next
        }
        current.prev = node
        node.prev = previous
        node.next = current
        previous.next = node
      }
      this.length++
      return true
    } else {
      return false
    }
  }
  findAt(position) {
    if(position >= 0 && position < this.length) {
      let current = this.head
      let index = 0
      while(index++ < position) {
        current = current.next
      }
      return current
    }
    return null
  }
  removeAt(position) {
    if(position >= 0 && position < this.length) {
      let current = this.head
      if(position === 0) {
        current = current.next
        this.head = current
        this.head.prev = null
      } else if(position === this.length - 1) {
        current = this.tail
        current = current.prev
        this.tail = current
        this.tail.next = null
      } else {
        current = this.findAt(position)
        const previous = current.prev
        const next = current.next
        previous.next = next
        next.prev = previous 
      }
      this.length--
    }
    return false
  }
}

export { DoublyLinkedList }