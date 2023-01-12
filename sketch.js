var bg,bgimg
var ground1,ground2
var monkeyRunning,monkeyStanding,monkey
var playButton,playButtonImg  
var gameState="start"
var obstacle,obstacleImg
var fruits, fruit1, fruit2,fruit3,fruit4,fruit5 
var winningSound, losingSound, jumpSound, collectSound, hitSound, playSound

function preload(){
  titleImg=loadImage("title.png")
 bgimg=loadImage("./Monkey go Happy files/jungle.jpg")
 monkeyRunning=loadAnimation("./Monkey go Happy files/Monkey_01.png","./Monkey go Happy files/Monkey_02.png",
 "./Monkey go Happy files/Monkey_03.png","./Monkey go Happy files/Monkey_04.png",
 "./Monkey go Happy files/Monkey_05.png", "./Monkey go Happy files/Monkey_06.png",
 "./Monkey go Happy files/Monkey_07.png","./Monkey go Happy files/Monkey_08.png",
 "./Monkey go Happy files/Monkey_09.png","./Monkey go Happy files/Monkey_10.png");
monkeyStanding=loadAnimation("./Monkey go Happy files/Monkey_10.png")
playButtonImg=loadImage("gamestart.png")
obstacleImg=loadImage("monsters.png")
fruit1=loadImage("apple.png")
fruit2=loadImage("banana.png")
fruit3=loadImage("grape.png")
fruit4=loadImage("mango.png")
fruit5=loadImage("orange.png")
winningSound=loadSound("winning.mp3")
losingSound=loadSound("losing.wav")
jumpSound=loadSound("jumping.wav")
collectSound=loadSound("collect.wav")
hitSound=loadSound("hitobstacle.wav")
playSound=loadSound("playbutton.wav")

}

function setup() {
createCanvas(windowWidth,windowHeight)

bg=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight)
bg.addImage(bgimg)
bg.scale=1.6
bg.x=windowWidth/2

ground1=createSprite(windowWidth/2,windowHeight-10,windowWidth,50)
ground1.shapeColor="grey"

ground2=createSprite(windowWidth/2,windowHeight-5,windowWidth,10)
ground2.shapeColor="brown"

title=createSprite(windowWidth/2,55,50,50)
title.addImage(titleImg)
title.scale=1.4

monkey=createSprite(80,windowHeight-100,50,50)
monkey.addAnimation("running",monkeyRunning)
monkey.scale=0.3

monkey.addAnimation("standing",monkeyStanding)

playButton=createSprite(windowWidth/2,windowHeight/2,50,50)
playButton.addImage(playButtonImg)
playButton.scale=1.4
playButton.visible=true  



}

function draw() {
 background("green")

 if(gameState==="start"){
  monkey.changeAnimation("standing",monkeyStanding)
  if(mousePressedOver(playButton)){
    gameState="play"
  }
 }

 if(gameState==="play"){
  bg.velocityX=-4
  playButton.visible=false 
  monkey.changeAnimation("running",monkeyRunning)

  if(bg.x<width/2){
    bg.x=width/2
  }

  if((touches.length > 0 || keyDown("SPACE")) && monkeyStanding.y  >= height-120) {
    jumpSound.play() 
    monkeyStanding.velocityY = -10;
     touches = [];
  }
  
  trex.velocityY = trex.velocityY + 0.8

  spawnObstacles()
  spawnFruits()
 }

 if(gameState==="end"){

 }
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*score/100);
  
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImg);
              break;
    }
           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = monkeyStanding.depth;
    monkeyStanding.depth +=1;
  }
}

function spawnFruits() {
  if(frameCount % 60 === 0) {
    var fruits = createSprite(600,height-95,20,30);
    fruits.setCollider('circle',0,0,45)
    fruits.debug = true
  
    fruits.velocityX = -(6 + 3*score/100);
  
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: fruits.addImage(fruit1);
              break;
      case 2: fruits.addImage(fruit2);
              break;
      case 3: fruits.addImage(fruit3);
              break;
      case 4: fruits.addImage(fruit4);
              break;
      case 5: fruits.addImage(fruit5);
              break;
    }
               
    fruits.scale = 0.3;
    fruits.lifetime = 300;
    fruits.depth = monkeyStanding.depth;
    monkeyStanding.depth +=1;
  }
}