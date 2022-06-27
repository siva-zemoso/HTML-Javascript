function increaseLocalScore(){

    var score=localStorage.getItem('score')??0;

    localStorage.setItem('score',parseInt(score)+1);
    document.getElementById("localScore").innerHTML=parseInt(score)+1;

}

function decreaseLocalScore(){

    var score=localStorage.getItem('score')??0;

    localStorage.setItem('score',parseInt(score)-1);
    document.getElementById("localScore").innerHTML=parseInt(score)-1;

}

function increaseSessionScore(){

    var score=sessionStorage.getItem('score')??0;

    sessionStorage.setItem('score',parseInt(score)+1);
    document.getElementById("sessionScore").innerHTML=parseInt(score)+1;

}

function decreaseSessionScore(){

    var score=sessionStorage.getItem('score')??0;

    sessionStorage.setItem('score',parseInt(score)-1);
    document.getElementById("sessionScore").innerHTML=parseInt(score)-1;

}

function initialValues(){
    document.getElementById("localScore").innerHTML=localStorage.getItem('score')??0;
    document.getElementById("sessionScore").innerHTML=sessionStorage.getItem('score')??0;
};
