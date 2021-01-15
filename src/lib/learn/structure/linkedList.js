class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}
class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
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
    while(i++ < this.length) {
      if(current.element === element) {
        return i
      }
      current = current.next
    }
    return i
  }
  findAt(position) {
    if (position >= 0 && position < this.length) {
      let i = 0
      let current = this.head
      while(position > i) {
        current = current.next 
        i++
      }
      return current
    }
    return null
  }
  append(element) {
    return this.insert(0, element)
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
    while(i < this.length) {
      const element = current.element
      results += `${i}: ${typeof element === 'object' ? JSON.stringify(element) : element} => \n`
      current = current.next
      i++
    }
    results += `|| size:${this.length}`
    return results
  }
}

export default LinkedList