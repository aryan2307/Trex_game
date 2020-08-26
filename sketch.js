var trex, ground, invisibleGround, obstaclesGroup, cloudsGroup, r, score, gameState,  reset,  gameOver;
var trex_animation, ground_img, obstacle1_img, obstacle2_img, obstacle3_img, obstacle4_img,cloud_img,trex_collided_img;

function preload(){
trex_animation=loadAnimation("trex1.png","trex3.png","trex4.png");
ground_img=loadImage("ground2.png");
obstacle1_img=loadImage("obstacle1.png");
obstacle2_img=loadImage("obstacle2.png");
obstacle3_img=loadImage("obstacle3.png");
obstacle4_img=loadImage("obstacle4.png");
cloud_img=loadImage("cloud.png");
trex_collided=loadAnimation("trex_collided.png");
}

function setup() {
  createCanvas(400, 400);
  trex=createSprite(75,300,30,30);
  ground=createSprite(200,325,800,1);
  trex.addAnimation("running",trex_animation);
  trex.scale=0.5;
  
  ground.addImage(ground_img);
  
  trex.setCollider("rectangle",0,0,90,75);
  
  score=0;
  
  gameState="play";
  
  obstaclesGroup=createGroup();
  cloudsGroup=createGroup();
}
function draw() {
  background("white");
  drawSprites();
  trex.collide(ground);
  if(gameState=="play"){
     spawnObstacles();
  spawnClouds();
  
  if(keyDown("space")&&trex.y>295){
     trex.velocityY=-12;
}
  trex.velocityY=trex.velocityY+0.8;
  ground.velocityX=-8;
  if(ground.x<0){
    ground.x=ground.width/2;
}
  score=Math.round(frameCount/2);
  text("score: "+score,190,100);
}
  if(trex.isTouching(obstaclesGroup)){
    gameState="end";
  }
  
  if(gameState=="end"){
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    trex.velocityX=0;
    ground.velocityX=0;
    trex.changeAnimation(trex_collided);
  }
}
function spawnObstacles(){
  if(frameCount%80==0){
    var obstacle=createSprite(450,300,30,30);
    var r= Math.round(random(1,4));
    switch(r){
      case 1: obstacle.addImage(obstacle1_img)
        break;
      case 2: obstacle.addImage(obstacle2_img)
        break;
      case 3: obstacle.addImage(obstacle3_img)
        break;
      case 4: obstacle.addImage(obstacle4_img)
        break;
    }
    obstacle.velocityX=-8;
    obstacle.scale=0.75;
    obstacle.lifetime=60;
    obstaclesGroup.add(obstacle);
}
}

function spawnClouds(){
  if(frameCount%100==0){
    var cloud=createSprite(415,150,30,30);
    cloud.addImage(cloud_img);
    cloud.velocityX=-6;
    cloud.lifetime=100;
    cloudsGroup.add(cloud);
  }
}