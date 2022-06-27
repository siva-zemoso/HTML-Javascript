//using promises

function getData(uId) {

    return new Promise((resolve,reject)=>{
        setTimeout(() => {
        console.log("Fetched the data!");
        resolve("skc@gmail.com");
        }, 3000);
    });
    
}
    
let email;
console.log("start");
getData("skc")
.then((result)=>{
    email=result;
    console.log("first Email id of the user id is: " + email);
    console.log("end");
});


//using async and await

async function getData1(uId) {
    let promise= new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log("Fetched the data!");
            return resolve("skc@gmail.com");
        }, 4000);
    });

    console.log("start");

    let res=await promise;
    console.log("second Email id of the user id is: " + res);
    console.log("end");
}

getData1("src");