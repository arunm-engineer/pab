class Person {   // Classes work within in use strict mode
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getDetails() {
        console.log(this);
        console.log(`Name is ${this.name} and age is ${this.age}`);
    }

    setDetails(newName, newAge) {
        this.name = newName;
        this.age = newAge;

    }
}

let Binod = new Person("Sam", 20);

// Binod.getDetails();
// Binod.setDetails("Zack",25);
// Binod.getDetails();


// document.querySelector("button").addEventListener("click", Binod.getDetails);
// document.querySelector("button").click();


// setTimeout(Binod.getDetails, 1000);

// let fn = Binod.getDetails;
// fn();        // Strict mode function call -> undefined

