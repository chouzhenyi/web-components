// flyWeight 享元模式哟！

// 策略模式
interface Strategy {
  outputPageStr(data: string[]): string
}
class listStrategy implements Strategy {
  public outputPageStr(data: string[]): string {
    const result: string = data.reduce((strRes, curItem) => {
      return strRes += `<div class="item">${curItem}</div>`
    }, '')
    return `<div class="list">${result}</div>`
  }
}

class ulStrategy implements Strategy {
  public outputPageStr(data: string[]): string {
    const result: string = data.reduce((strRes, curItem) => {
      return strRes += `<li class="item">${curItem}</li>`
    }, '')
    return `<ul class="list">${result}</ul>`
  }
}

class renderData {
  private strategy: Strategy;
  constructor(strategy: Strategy) {
    this.setStrategy(strategy)
  }
  public setStrategy(strategy: Strategy) {
    this.strategy = strategy
  }
  renderHtml(data: string[]) {
    return this.strategy.outputPageStr(data)
  }
}

function renderDataList(data: string[]) {
  const context = new renderData(new listStrategy())
  const listResult = context.renderHtml(data)
  context.setStrategy(new ulStrategy())
  const ulResult = context.renderHtml(data)
  return {
    listResult,
    ulResult
  }
}

export {
  renderDataList
}