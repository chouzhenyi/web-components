interface AbstractCar {
  name:string
  setSeatCover(material:string): string
}
class Lamborghini implements AbstractCar {
  constructor(public name:string) {}
  setSeatCover(material): string {
    return `真皮座椅，座椅材料是：${material}`
  }
}
class Fiat implements AbstractCar {
  constructor(public name:string) {}
  setSeatCover(material):string {
    return `普通的车子，${material}的，瞎开就行了`
  }
}
interface AbstractBus {
  name:string
  setSeatCount(num: number): number
}
class Benz implements AbstractBus {
  constructor(public name:string) {}
  setSeatCount(num): number {
    return num + 1
  }
}
class Ford implements AbstractBus {
  constructor(public name:string) {}
  fibonacci(n):number {
    if(n == 1 || n == 2) {
      return 1
    };
    return this.fibonacci(n - 2) + this.fibonacci(n - 1)
  }
  setSeatCount(num): number {
    return this.fibonacci(num)
  }
}

// 抽象工厂
interface AbstractVehicleFactory {
  createCar(name:string): AbstractCar;
  createBus(name:string): AbstractBus;
}

// 高端工厂
class upperVehicleFactory implements AbstractVehicleFactory {
  public createBus(name:string): AbstractBus {
    return new Benz(name)
  }
  public createCar(name:string): AbstractCar {
    return new Lamborghini(name)
  }
}

// 低端工厂
class lowerVehicleFatory implements AbstractVehicleFactory {
  public createBus(name:string): AbstractBus {
    return new Ford(name)
  }
  public createCar(name:string): AbstractCar {
    return new Fiat(name)
  }
}

function clientVehicleHandle(factory: AbstractVehicleFactory, name:string) {
  const bus = factory.createBus(name)
  const car = factory.createCar(name)
  console.log(`公交车的座位数${bus.setSeatCount(2)}`);
  console.log(`轿车座椅要舒服：${car.setSeatCover('亚麻布')}`);
}

function upper() {
  return clientVehicleHandle(new upperVehicleFactory(), '高级车')
}


function lower() {
  return clientVehicleHandle(new lowerVehicleFatory(), '青春版车子')
}

export {
  upper,
  lower,
}

