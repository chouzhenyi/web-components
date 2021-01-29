interface Product {
  type: string
  id: number
  color: string
  Bottling(): string
}

abstract class Drink {
  drinkData: Product
  public showDrinkDetail(): Product {
    return this.drinkData
  }
}

class OrangeJuiceProduct implements Product {
  constructor(public type: string,public id: number,public color: string,public name: string) {}
  Bottling():string {
    return `
      本饮料编号${this.id}--
      需要装瓶的是${this.name},
      颜色是：${this.color},
      他的类型是${this.type}
    `
  }
}

class OrangeJuice extends Drink {
  drinkData: Product
  public constructor(type: string, id: number, color: string, name: string) {
    super()
    const data =  new OrangeJuiceProduct(type, id, color, name)
    this.drinkData = data
  }
}

function productADrink(drink: Drink) {
  const data = drink.showDrinkDetail()
  console.log(data);
  console.log(data.Bottling());
  
}

function clientProduct() {
  productADrink(new OrangeJuice('橙汁', 1, '橙黄色', '美汁源'))
}

export {
  clientProduct,
}