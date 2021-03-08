class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
}

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model);
    this.owners = [];
    this.year = year;
  }

  getCarInfo = () => `${this.make} ${this.model} released in ${this.year}`;
  addOwner = (owner) => this.owners.indexOf(owner) === -1 ? this.owners.push(owner) : this.owners;
  removeOwner = (owner) =>(this.owners = this.owners.filter((item) => item !== owner));
  getOwnersCount = () => this.owners.length;
  getOwnerNames = () => this.owners.map((owner) => owner.fullName());
  getFullInfo() {
    return `${this.make} ${this.model} from ${
      this.year
    }. ${this.getOwnersCount()} person owns this car. These are - ${this.getOwnerNames().join()}`;
  }
}

class Person {
  constructor(name, surname, age, gender, cars = []) {
    this.cars = cars;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.gender = gender;
  }

  fullName = () => `${this.name} ${this.surname}`;
  countCars = () => this.cars.length;
  buysCar = (car) => {
    this.cars.push(car);
    let index = car.owners.indexOf(this);
    index === -1 ? car.owners.push(this) : car.owners;
  };
  sellsCar = (car) => {
    this.cars = this.cars.filter((item) => item !== car);
    car.owners = car.owners.filter((item) => item !== this);
  };
  getAllCarsInfo = () =>
    `${this.name} owns these cars: ${this.cars
      .map((car) => car.getCarInfo())
      .join()}`;
}

let daniel916 = new Person("Daniel", "Barbakadze", 21, "M", []);
let ilona = new Person("Elon", "Musk", 30, "M");
let duti_picoti = new Car("BMW", "525", "1999");
let stodevianosto = new Car("Mercedes", "E190", 1991);

daniel916.buysCar(duti_picoti); // adds passed car
daniel916.buysCar(stodevianosto); // adds passed car
daniel916.sellsCar(duti_picoti); // removes passed car
ilona.buysCar(stodevianosto); // adds passed car
ilona.buysCar(duti_picoti); // adds passed car
console.log({
  daniel: {
    fullName: daniel916.fullName(),
    countCars: daniel916.countCars(),
    getAllCarsInfo: daniel916.getAllCarsInfo(),
  },
  elon: {
    fullName: ilona.fullName(),
    countCars: ilona.countCars(),
    getAllCarsInfo: ilona.getAllCarsInfo(),
  },
  duti_picoti: {
    getOwnersCount: duti_picoti.getOwnersCount(),
    getOwnerNames: duti_picoti.getOwnerNames(),
    getFullInfo: duti_picoti.getFullInfo(),
    getCarInfo: duti_picoti.getCarInfo(),
  },
  stodevianosto: {
    getOwnersCount: stodevianosto.getOwnersCount(),
    getOwnerNames: stodevianosto.getOwnerNames(),
    getFullInfo: stodevianosto.getFullInfo(),
    getCarInfo: stodevianosto.getCarInfo(),
  },
});
