class Food{

constructor(){
    this.foodStock=0
    this.lastFed
    this.image=loadImage("images/Milk.png")
}

getFedTime(lastFed){
    this.lastFed=lastFed
}
deductFood(){
if(this.foodStock>0){
    this.foodStock=this.foodStock-1
}

}
getFoodStock(){
return this.foodStock
}

updateFoodStock(foodStock){
    this.foodStock=foodStock
}



display(){
    background("green")

fill(255)
textSize(15)
if(lastFed>= 12){
    text("last Fed : "+lastFed%12+" PM",50,30)
    }else if(lastFed==0){
        text("last Fed : 12 AM",50,30)
    }else {
        text("last Fed : "+lastFed+" AM",50,30)
        
    }


    var x=80,y=100
imageMode("CENTRE")
image(this.image,720,220,70,70)
if(this.foodStock !== 0){
    for(var i=0;i<this.foodStock;i++){
        if(i % 10=== 0){
            x=80
            y=y+50
        }
        image(this.image,x,y,50,50)
        x=x+30
    }
}
    
}
bedroom(){
    background(bedroom,550,500)
}
washroom(){
    background(washroom,550,500)
}
garden(){
    background(garden,550,500)
}
}