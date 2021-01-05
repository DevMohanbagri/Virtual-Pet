//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  dog = createSprite(200,300,50,50);
  dog.scale = 0.15;
  dog.addImage(dogImg);
  
    foodStock = database.ref('food');
    foodStock.on("value",readStock);

}


function draw() {  
  background(46,139,87);

  if(foodS!=undefined){
    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);

    }

  //if(foodS === 0)

  drawSprites();
  //add styles here
  textSize(25);
  fill("black")
  text("Food Remaining : "+foodS,10,100)
  }

}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
      food: x 
  })

}

function readStock(data){
  foodS = data.val();
}

