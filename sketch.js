//Create variables here
var dog,dogImage,happyDog;
var database;
var foodS,foodStock;
var feedPet,addFood;
var lastFed,foodObj;
var fedTime;
var gameState,readState;
var garden,washroom,bedroom;
var currentTime
var vaccinationPlan,dogTest
function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
  garden=loadImage("images/Garden.png")
  bedroom=loadImage("images/Bed Room.png")
  washroom=loadImage("images/Wash Room.png")


}

function setup() {
	createCanvas(1500,500);
  database = firebase.database();

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);


  dog=createSprite(850,200,20,20)
  dog.addImage(dogImage)
  dog.scale=0.3

  feedPet=createButton("Feed Pet")
  feedPet.position(1200,100 )
  feedPet.mousePressed(feedDog)
  addFood=createButton("Add Food")
  addFood.position(1500,100)
  addFood.mousePressed(addFoods)

  

  foodObj=new Food()
  readState=database.ref("gameState")
  readState.on("value",function (data){
    gameState=data.val()
  })

  fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});
}


function draw() {  

  if(gameState!== "Hungry"){
    feedPet.hide()
    addFood.hide()
    dog.remove()
  }else{
    feedPet.show()
    addFood.show()
    dog.addImage(sadDog)
  }
currentTime=hour()
if(currentTime==(lastFed+1)){
  update("playing")
  foodObj.garden()
}else if(currentTime==(lastFed+2)){
  update("sleeping")
  foodObj.bedroom()
}else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("bathing")
  foodObj.washroom()
}else{
  update("hungry")
  foodObj.display()
}
drawSprites()
}

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS)
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
x=x-1;
  }
}

function feedDog(){
  dog.addImage(happyDog)

  if(foodObj.getFoodStock<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref("/").update({
   Food:foodS
  })
}
function update(state){
  database.ref("/").update({
    gameState:state
  })
}