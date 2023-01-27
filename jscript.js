let foods=[]
let breakfast=[]
let lunch=[]
let dinner=[]

function init(){

  getData()
}


function getData() {
  let req = new XMLHttpRequest()

  req.open('GET', 'http://localhost:5500/DataMakanan.json', true)

  req.onload = function (){
    if(req.status >= 200 || req.status < 400){
      let data = JSON.parse(req.responseText)

      foods = data.food

      showData(foods)
    }
  }

  req.onerror = function () {
    alert('Request Handle Error');
  }

  req.send()
}


function showData(datas) {
  let div = document.getElementById('container')
  div.innerHTML = ''
  let tbody = document.getElementById('users').querySelector('tbody');
  tbody.innerHTML = '';
  let i = 1;

  datas.map(data => {
        let colID = '<td>'+i+'</td>';
        let colBody = '<td>'+data.name+'</td>';
        let btnShowComments = '<td><button class="buttonsEDT" onClick="editData('+ data.id +')">Edit Name</button> <button class="buttonsEDT" onClick="deleteData('+ data.id +')">Delete</button></td>';
        let newRow = '<tr>'+colID+colBody+btnShowComments+'</tr>';
        tbody.innerHTML += newRow;
      const nameRow = '<div id='+data.id+'>'+''+'</div>'
      div.innerHTML += nameRow
      i++;
  })
}


function formHandler(event) {

  event.preventDefault()

  let inputValue = event.target['inputName'].value
  console.log(inputValue);

  postData(inputValue)
}

function postData(data){
  var makan = document.querySelector("input[name=inputName]")
  if(makan.value !== ''){
      let newFood = {
      "id" : generateId(),
      "name" : data
      } 

      foods = foods.concat(newFood)
    
      showData(foods)
      alert("Food Registered!")
      console.log(foods);
  }
  else{
    alert("Food Name Can't Be Empty!");
    console.log("data kosong");
  }
  
}

function generateId() {
  let id = Math.floor(Math.random() * 100)

  foods.map(data => {
   
    if(id === data.id){
      generateId()
    }
  })

  
  return id;
}



function deleteData(id){

  foods = foods.filter(food => food.id !== id)
  alert("Food Deleted");
  showData(foods)
}

function editData(id){

  let div = document.getElementById(id)
  let editFood = {}

  foods.filter(food => food.id === id).map(food => editFood = food)

  div.innerHTML = '<form onsubmit="updateData('+ editFood.id +',event)">'+
                    '<input type="text" value="'+ editFood.name +'"name="foodName"/>'+
                    '<button type="submit" class="buttonsDN">Done</button>'
                  '</form>'
}

function updateData(id, event){
  event.preventDefault()

  let inputVal = event.target['foodName'].value;
  if(inputVal!== ''){
    foods.map(food => {
    if(food.id === id){
      food.name = inputVal
    }
    })
    alert("Food Updated!");
    showData(foods)
  }
  else{
    alert("Food Name Can't Be Empty!");
  }
  
}


function randomizeFunction() {
  const random = [0,1,2];
  foods.map(data=> {
    var item = random[Math.floor(Math.random()*random.length)];
    console.log(item);
    if(item===0){
      let newBreakfast = {
        "name" : data.name
      }

      breakfast = breakfast.concat(newBreakfast)
      console.log(breakfast)
    }
    if(item===1){
      let newLunch = {
        "name" : data.name
      }

      lunch = lunch.concat(newLunch)
      console.log(lunch)
    }
    if(item===2){
      let newDinner = {
        "name" : data.name
      }

      dinner = dinner.concat(newDinner)
      console.log(dinner)
    }
  })

  showDataBreak(breakfast);
  showDataLunch(lunch);
  showDataDinner(dinner);
}


function showDataBreak(datas){
  var bfast=[];
  bfast = "";
  console.log(bfast)
  datas.map(data => {
    if(bfast===""){
      bfast = data.name;
    }
    else{
      bfast += ", " +data.name;
    }
  })
 

  document.getElementById('break').innerHTML = "Breakfast : " + bfast;
}

function showDataLunch(datas){
  var lunchs = "";

  datas.map(data => {
        if(lunchs===''){
          lunchs = data.name;
        }
        else{
          lunchs += ", " +data.name;
        }
  })

  document.getElementById('lunchID').innerHTML = "Lunch : " + lunchs;
}

function showDataDinner(datas){
  var dinners = "";

  datas.map(data => {
        if(dinners===''){
          dinners = data.name;
        }
        else{
          dinners += ", " +data.name;
        }
  })

  document.getElementById('dinner').innerHTML = "Dinner : " + dinners;
}
