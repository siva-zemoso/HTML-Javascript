
//function declaration
function func1(){
    console.log("Greetings from func1!!!")
}

function func2(func){
    func();
    console.log("Hello from Func2!!! ");
    
}

func2(func1);


//function expression
const func3=function(){
    return "Greetings from function3 !!"
}


const func4=function(func){
    console.log(func());
    console.log("Hello from function 4!!");   
}

func4(func3);


//arrow function
const func5=()=>{
    return "Greetings from function5!!"
}

func4(func5);