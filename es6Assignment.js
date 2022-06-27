//Refactor the following function into a one-liner:
const printName= name=> "Hi "+name;
console.log(printName("keerthi"));

//Rewrite the following code using template literals
const printBill = (name, bill) => `Hi ${name}, please pay: ${bill}`;
console.log(printBill("keerthi",1000));


//Modify the following code such that the object properties are destructured and logged.
const {fullName,age}={
    fullName: "Noam Chomsky",
    age: 92
}

console.log(fullName);
console.log(age);