class LinkedNode {
  element: Object
  next: Object | null
  constructor(element: Object) {
    this.element = element
    this.next = null
  }
}
class LinkedList {
  head: Object | null
  length: Number
  constructor() {
    this.head = null
    this.length = 0
  }
}

export { LinkedList }