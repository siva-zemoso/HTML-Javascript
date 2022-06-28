function menuItem(name,price,type,quantity){
    this.name=name;
    this.price=price;
    this.type=type;
    this.quantity=quantity;
}

function tables(totalCost,noOfItems){
    this.totalCost=totalCost;
    this.noOfItems=noOfItems;
}

var itemsList=[]

var draggableItems=[];

var tablesList=[];

tablesList.push(new tables(0,0));
tablesList.push(new tables(0,0));
tablesList.push(new tables(0,0));

let tabls=""

for(let i=0;i<tablesList.length;i++){
    tabls+=`<div class="card table" ondrop="dragDrop()">
        <div class="card-body">
            <h3 class="card-title">Table-${i+1}</h3>
            <div class="card-text">
                Rs:<span>${tablesList[i].totalCost}</span>
                | Total items:<span id="items">${tablesList[i].noOfItems}</span>
            </div>
        </div>
    </div>`;

}

document.getElementById("table-item").innerHTML=tabls;

itemsList.push(new menuItem("chicken biryani",280.00,"main course",1));
itemsList.push(new menuItem("chicken kabab",250.00,"starter",1));
itemsList.push(new menuItem("mutton biryani",400.00,"main course",1));
itemsList.push(new menuItem("chicken pulav",180.00,"starter",1));
itemsList.push(new menuItem("veg manchuriya",100.00,"starter",1));
itemsList.push(new menuItem("french fries",150.00,"starter",1));
itemsList.push(new menuItem("icecream",150.00,"dessert",1));
itemsList.push(new menuItem("Choclate cake",150.00,"dessert",1));


let items=""
let id=0;
for(let item of itemsList){

    items+=`<div class="card menu-item" id="${id}" draggable=true>
        <div class="card-body"> 
            <div class="card-title">
                <p>${item.name}</p>
            </div>
            <div class="card-text">
                <p>${item.price}</p>
            </div>
        </div>
    </div>`;

    id++;

}

document.getElementById("menu-items").innerHTML=items;


//add event listeners to menu items
draggableItems=document.querySelectorAll(".menu-item");
console.log(" draggable items"+draggableItems.length);


var draggedItem=[];
draggableItems.forEach((item)=>{
    item.addEventListener("dragstart",dragStart);
})

function dragStart(){
    draggedItem=this;
}


//adding event listeners to tables
var placingTable=null;

var tables=document.querySelectorAll(".table");

tables.forEach((table)=>{
    table.addEventListener("dragover",dragOver);
    table.addEventListener("dragenter",dragEnter);
    table.addEventListener("dragleave",dragLeave);
    table.addEventListener("drag",dragDrop);
    table.addEventListener("dblclick",openPopup);
})

function dragOver(e){
    e.preventDefault();
    this.style.border="1px dashed red"   
}

function dragEnter(){
    this.style.border = "1px dashed red"
    placingTable=this;
}

function dragLeave(){
    this.style.border = "none";
}

function dragDrop(){

    placingTable.style.border = "";
   
    let totalCost=placingTable.getElementsByTagName("span")[0].innerHTML;
    let noOfItems=placingTable.getElementsByTagName("span")[1].innerHTML;

    let itemCost=draggedItem.getElementsByTagName("p")[1].innerHTML

    totalCost=Number(totalCost)+Number(itemCost);
    noOfItems=Number(noOfItems)+1;

    placingTable.getElementsByTagName("span")[0].innerHTML=totalCost;
    placingTable.getElementsByTagName("span")[1].innerHTML=noOfItems;

    var str = placingTable.getElementsByTagName("h3")[0].innerHTML;
    var matches = str.match(/(\d+)/);
    if(sessionStorage[matches[0]]){

        let result = JSON.parse(sessionStorage.getItem(matches[0]));
        let flag=1;
        for(let i =0; i<result.length;i++){
            let first = result[i][0];
            let quantity = result[i][1];
            if(first == draggedItem.id){
                result[i][1] = quantity+=1;
                flag=0;
                break;
            }
        }
        if(flag){
            result.push([draggedItem.id,itemsList[draggedItem.id].quantity]);
        }
        sessionStorage.setItem(matches[0],JSON.stringify(result));
    
    }else{   
           sessionStorage.setItem(matches[0],JSON.stringify([[draggedItem.id,itemsList[draggedItem.id].quantity]]));      
    }

}

//search menu items
function searchItems(value){

    value=value.toLowerCase();

    let menuItems=document.getElementById("menu-items").getElementsByClassName("card");

    for(let item=0;item<menuItems.length;item++){

        let title=menuItems[item].getElementsByClassName("card-title")[0].childNodes[1].innerHTML;

        if(title.toLowerCase().indexOf(value)!=-1 || itemsList[item].type.indexOf(value)!=-1){
            menuItems[item].style.display="";
        }else{
            menuItems[item].style.display="none";
        }   
    }
}

//search tables
function searchTables(input){

    let tables=document.getElementsByClassName("table");

    for(let item of tables){
        let value=item.getElementsByClassName("card-title")[0].innerHTML;

        if(value.toLowerCase().indexOf(input.toLowerCase())!=-1){
            item.style.display="";
        }
        else{
            item.style.display="none";
        }
    }

}


var poppedUpTable=null;

function openPopup(){

    poppedUpTable=this;
    let popup=document.getElementById("popup");
    popup.classList.add("open-popup");
    poppedUpTable.classList.add("active-table");
    displayPopupItems();
    //document.getElementById("body").classList.add("blur-effect");
}


function closePopup(){
    let popup=document.getElementById("popup");
    popup.classList.remove("open-popup");
    poppedUpTable.classList.remove("active-table");
}

function displayPopupItems(){

    totalCost();

    let table=poppedUpTable.getElementsByTagName("h3")[0].innerHTML;
    let tableNumber=table.match(/(\d+)/);
    tableNumber=tableNumber[0];

    let displayItems="";

    document.getElementById("table-number").innerHTML=tableNumber;

    if(sessionStorage.getItem(tableNumber)){
        let items=JSON.parse(sessionStorage.getItem(tableNumber));
        console.log(items);    

        let sNo=1;

        for(let i=0;i<items.length;i++){
            let id=items[i][0];
            let quantity=items[i][1];
            displayItems+=`<tr>
                <td>${sNo}</td>
                <td>${itemsList[id].name}</td>
                <td>${itemsList[id].price}</td>
                <td><input type="number" value=${quantity} onchange="changeQuantity(this,${i},${tableNumber})" min="0"></input></td>
                <td><span onclick="deleteItemFromPopup(${i},${tableNumber})"><i class='fa fa-trash' ></i></span></td>
            </tr>`

            sNo+=1;
        }
        
    }else{
        displayItems="";
    }

    document.getElementById("popup-items").innerHTML=displayItems;
}

function totalCost(){

    let table=poppedUpTable.getElementsByTagName("h3")[0].innerHTML;
    let tableNumber=table.match(/(\d+)/)[0];

    let totalCost=0;
    let totalQuantity=0;

    if(sessionStorage.getItem(tableNumber)){
        let items=JSON.parse(sessionStorage.getItem(tableNumber));
        console.log(items);    

        for(let i=0;i<items.length;i++){
            let id=items[i][0];
            let quantity=items[i][1];

            totalCost+=((itemsList[id].price)*Number(quantity));
            totalQuantity+=Number(quantity);

        }

        console.log("total cost : "+totalCost);
    }

    document.getElementById("totalCost").innerHTML="Total : "+totalCost;
    poppedUpTable.getElementsByTagName("span")[0].innerHTML=totalCost; 
    poppedUpTable.getElementsByTagName("span")[1].innerHTML=totalQuantity;
}

function changeQuantity(inputValue,menuId,tableNumber){

        let items=JSON.parse(sessionStorage.getItem(tableNumber));

        items[menuId][1]=inputValue.value;

        sessionStorage.setItem(tableNumber,JSON.stringify(items));

        totalCost();

}

function deleteItemFromPopup(indexOfMenuItem,tableNumber){

    let items=JSON.parse(sessionStorage.getItem(tableNumber));

    items.splice(indexOfMenuItem,1);

    sessionStorage.setItem(tableNumber,JSON.stringify(items));

    displayPopupItems();
    totalCost();
}

function generateBill(){
    sessionStorage.clear();
    displayPopupItems();
}