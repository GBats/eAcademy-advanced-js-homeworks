function Car(make, model, year) {
    this.owners = [];
    this.make = make;
    this.model = model;
    this.year = year;
    this.getCarInfo = function() {
        return `${this.make} ${this.model} released in ${this.year}`
    };
    this.addOwner = function(owner) {
        let index = this.owners.indexOf(owner);
        if (index === -1) {
            return this.owners.push(owner)
        } else {
            return
        }
    };

    this.removeOwner = function(owner) {
        let index = this.owners.indexOf(owner);
        console.log(index)
        if (index > -1) {
            return this.owners.splice(index, 1);
        }
    };

    this.getOwnersCount = function() {
        return this.owners.length;
    };

    this.getOwnerNames = function() {
        return this.owners.map(owner => owner.fullName())
    };

    this.getFullInfo = function() {
        return `${make} ${model} from ${year}. ${this.getOwnersCount()} person owns this car. These are - ${this.getOwnerNames().join()}`

    }


}

function Person(name, surname, age, gender, cars = []) {
    this.cars = cars;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.gender = gender;
    this.fullName = function() {
        return `${this.name} ${this.surname}`
    };
    this.countCars = function() {
        return cars.length;
    };
    this.buysCar = function(car) {
        this.cars.push(car);
        let index = car.owners.indexOf(this);
        if (index === -1) {
            car.owners.push(this);
        } else {
            return
        }

    }
    this.sellsCar = function(car) {
        let carIndex = this.cars.indexOf(car);
        if (carIndex > -1) {
            cars.splice(carIndex, 1)
        }
        let ownerIndex = car.owners.indexOf(this);
        if (ownerIndex > -1) {
            car.owners.splice(ownerIndex, 1)
        }
    }
    this.getAllCarsInfo = function() {
        return `${this.name} owns these cars: ${this.cars.map(car=>car.getCarInfo()).join()}`
    }
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
