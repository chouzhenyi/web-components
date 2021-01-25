class BinaryTreeNode {
  key: number | string | null
  left: object | null
  right: object | null
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}
class BinarySearchTree {
  root: object | null
  constructor() {
    this.root = null
  }
  insert(key: number) {
    const node = new BinaryTreeNode(key)
    if(this.root === null) {
      this.root = node
    } else {
      this.insertNode(this.root, node)
    }
  }
  insertNode(node, newNode) {
    if(newNode.key < node.key) {
      if(node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if(node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }
  search(key: number) {
    this.searchNode(this.root, key)
  }
  searchNode(node, key) {
    if(node === null) {
      return false
    }
    if(key < node.key) {
      return this.searchNode(node.left, key)
    } else if(key > node.key) {
      return this.searchNode(node.right, key)
    } else {
      return true
    }
  }
  // 中序遍历
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }
  inOrderTraverseNode(node, callback) {
    if(node !== null) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }
  // 先序遍历
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }
  preOrderTraverseNode(node, callback) {
    if(node !== null) {
      callback(node.key)
      this.inOrderTraverseNode(node.left, callback)
      this.inOrderTraverseNode(node.right, callback)
    }
  }
  // 后序遍历
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback)
  }
  postOrderTraverseNode(node, callback) {
    if(node !== null) {
      this.inOrderTraverseNode(node.left, callback)
      this.inOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }
  min() {
    return this.minNode(this.root)
  }
  minNode(node) {
    if(node) {
      while(node && node.left !== null) {
        node = node.left
      }
      return node.key
    }
    return null
  }
  findMinNode(node) {
    if(node) {
      while(node && node.left !== null) {
        node = node.left
      }
      return node
    }
    return null
  }
  max() {
    return this.maxNode(this.root)
  }
  maxNode(node) {
    if(node) {
      while(node && node.right !== null) {
        node = node.right
      }
      return node.key
    }
    return null
  }
  remove(key: number) {
    this.root = this.removeNode(this.root, key)
  }
  removeNode(node, key) {
    if(node === null) {
      return null
    }
    if(key < node.key) {
      node.left = this.removeNode(node.left, key)
    } else if(key > node.key) {
      node.right = this.removeNode(node.right, key)
    } else {
      if(node.left === null && node.right === null) {
        node = null
        return node
      }
      if(node.left === null) {
        node = node.right
        return node
      } else if(node.right === null) {
        node = node.left
        return node
      }

      const aux = this.findMinNode(node.right)
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }
}