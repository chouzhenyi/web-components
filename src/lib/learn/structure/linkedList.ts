class Node {
  element: object
  next: object | null
  constructor(element: object) {
    this.element = element
    this.next = null
  }
}
class LinkedList {
  head: object | null
  length: number
  constructor() {
    this.head = null
    this.length = 0
  }
  append(element) {
    let current = null
    const node = new Node(element)
    if (this.head === null) {
      this.head = node
    } else {
      current = this.head
      while(current.next) {
        current = current.next
      }
      current.next = node
    }
    this.length++
    return true
  }
  insert(position, element) {
    if(position >= 0 && position <= this.length ) {
      const node = new Node(element)
      if (position === 0 ) {
        node.next = this.head
        this.head = node
      } else {
        let i = 0
        let prev = null
        let current = this.head
        while(i < position) {
          prev = current
          current = current.next
          i++
        }
        prev.next = node
        node.next = current
      }

      this.length++
      return true
    }
    return false;
  }
  removeAt(position) {
    if (position >= 0 && position < this.length) {
      let i = 0
      let prev = null
      let current = this.head
      if(position === 0) {
        this.head = current.next
      } else {
        while(i < position) {
          prev = current
          current = current.next
          i++
        }
        prev.next = current.next
      }
      this.length--
      return current.element
    }
    return null
  }
  findIndex(element) {
    let current = this.head
    let i = -1
    while(current) {
      if(current.element === element) {
        return i + 1
      }
      current = current.next
      i++
    }
    return i
  }
  remove(element) {
    const index = this.findIndex(element)
    this.removeAt(index)
  }
  isEmpty() {
    return !this.length
  }
  size() {
    return this.length
  }
  toString() {
    let current = this.head
    let results = ''
    let i = 0
    while(current) {
      const element = current.element
      results += `${i}: ${typeof element === 'object' ? JSON.stringify(element) : element} => \n`
      current = current.next
      i++
    }
    results += `|| size:${this.length}`
    return results
  }
}

export { LinkedList }