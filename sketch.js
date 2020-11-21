// Ctrl + s--> to save
var PLAY=1; //constant variables
var END=0; //constant variables
var gameState = PLAY;
var trex ,trex_running,edges;
var ground,groundimage
var invisibleground
var cloud,cloudimage
var rand=0
var obstacle, 
    obstacleimg1,
    obstacleimg2,
    obstacleimg3,
    obstacleimg4,
    obstacleimg5,
    obstacleimg6
var score=0;
var cloudsGroup, obstaclesGroup,trex_stopped;
var gameOver,gameoverimage;
var restart,restartimage;
var diesound
//Load the images, animations and sounds
function preload()
{
  trex_running = loadAnimation("trex1.png", "trex3.png",                                        "trex4.png");
  trex_stopped = loadAnimation("trex_collided.png");
  groundimage  = loadImage("ground2.png"); 
  cloudimage =loadImage("cloud.png")
 obstacleimg1 =loadImage("obstacle1.png");  obstacleimg2 =loadImage("obstacle2.png");
 obstacleimg3 =loadImage("obstacle3.png");
 obstacleimg4 =loadImage("obstacle4.png");
 obstacleimg5 =loadImage("obstacle5.png");
 obstacleimg6 =loadImage("obstacle6.png");
 gameoverimage =loadImage("gameOver.png");
 restartimage =loadImage("restart.png");
  diesound=loadSound("die.mp3")
}

//Create canvas and other sprites
function setup()
{
  createCanvas(600,400)
  
  //Create a trex sprite
  trex = createSprite(50,320  ,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stopped",trex_stopped);
  trex.scale=0.5;
  
  //Create a ground     
  ground= createSprite(50,380,20,50);
  ground.addImage(groundimage);
  ground.velocityX=-2
  
 gameOver=createSprite(300,200);
  gameOver.addImage(gameoverimage);
  gameOver.scale=0.5
  gameOver.visible=false
  
  restart=createSprite(300,250);
  restart.addImage(restartimage) ;
  restart.scale=0.5
  restart.visible=false 
  
  
  //create a invisibleground
    invisibleground= createSprite(50,410,20,50);
  invisibleground.visible=false
  //create edge sprites
  edges=createEdgeSprites();
  // edges[0] --> left edge    
  // edges[1] --> right edge
  // edges[2] --> top edge
  // edges[3] --> bottom edge
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}
//draw the trex
function draw()
{
  background(180);
  
  
  if(gameState===PLAY)
    {
      // to make the trex jump
  if((keyDown('space') || keyDown('up'))&& trex.collide(invisibleground) )
    {
  trex.velocityY=-12;
    }
      
        //gravity to the  trex
 trex.velocityY=trex.velocityY+0.8
      
      //to create infinity moving of ground
  if(ground.x<0)
  {
    ground.x=600
  }
      createCloud();
      createObstacles();
      //score = Math.round(frameCount/240);
      //score=Math.round(score+0.2);
      if(frameCount%50){
         score = score+1;
      }

     // trex.debug=true
      trex.setCollider("circle",0,0,45);
    }
  else if(gameState===END)
    {
        trex.changeAnimation("stopped",trex_stopped);
      trex.velocityY=0;
      ground.velocityX=0;
       obstaclesGroup.setVelocityEach(0,0);
      cloudsGroup.setVelocityEach(0,0);
       obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
      
      gameOver.visible=true;
      restart.visible=true;
    }
if(trex.isTouching ( obstaclesGroup))
{
  diesound.play();
  gameState=END;
}
  //local variables
  //Global variables
 if(mousePressedOver(restart))
    {
      gameState=PLAY;
      cloudsGroup.destroyEach();
      obstaclesGroup.destroyEach();
      trex.changeAnimation('running',trex_running);
      score=0;
      gameOver.visible=false;
      restart.visible=false;
           
    }
  trex.collide(invisibleground);
   
  textSize (20)
  text(" score "+score,400,50);
  
  drawSprites();

}
//to create cloud
function createCloud(){
  //to create space between cloud
  if(frameCount%60===0){
    //multipling the clouds
  rand=Math.round(random(150 ,200));
  cloud=createSprite(600,rand);
   //creating cloud image
   cloud.addImage(cloudimage);
  cloud.velocityX=-6;
    trex.depth=cloud.depth+1
  //lifetime = canvas size / velocity of the sprite
    cloud.lifetime=100;
    cloudsGroup.add(cloud);
  }
}
//to create cloud

function createObstacles(){
  
  //to create space between cloud
  
  if(frameCount%60===0){
    
    //multipling the clouds       
    
  rand=Math.round(random(1 ,6));
  obstacle=createSprite(600,370);
   //creating cloud image
 obstacle.velocityX=-(6+score/100);
  //console.log("harsha"+"1")
   switch(rand) 
{
  case 1:obstacle.addImage(obstacleimg1);break;
  case 2:obstacle.addImage(obstacleimg2);break;
  case 3:obstacle.addImage(obstacleimg3);break;
  case 4:obstacle.addImage(obstacleimg4);break;
  case 5:obstacle.addImage(obstacleimg5);break;
  case 6:obstacle.addImage(obstacleimg6);break;
}
  //lifetime = canvas size / velocity of the sprite 
     obstacle.lifetime=100;
    obstacle.scale=0.4;
    obstaclesGroup.add(obstacle);
  }
}
