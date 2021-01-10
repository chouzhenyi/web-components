// 组合模式 Composite
class CompositeRender {
  constructor(type, data) {
    this.type = type
    this.data = data
    this.children = []
  }
  add(child) {
    this.children.push(child)
  }
  render() {
    const { wrapperClassName, className, text } = this.data || {}
    const type = this.type
    let template = ''
    if (type === 1) {
      template = `<div class="${className}">${text}</div>`
    } else {
      let childrenTemplate = ''
      const children = this.children || []
      const len = children.length
      for(let i = 0; i < len; i++) {
        const item = children[i]
        childrenTemplate += item && item.render && item.render() || ''
      }
      template += `<div class="${wrapperClassName}">
        ${childrenTemplate}
      </div>`
    }
    return template
  }
}

export {
  CompositeRender
}