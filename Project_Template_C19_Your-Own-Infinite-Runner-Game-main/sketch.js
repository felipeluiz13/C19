var cenario
var sonic
var sonicJump
var ring
var nave
var naveImg
var fundo
var sonicImg
var invisibleGround
var ringImg
var ringGroup
var naveGroup
var score = 0
var gameOver

function preload(){
  cenario = loadImage("cenario1.png");
  sonicImg = loadAnimation("sonic.gif");
  ringImg = loadImage("ring.png");
  sonicJump = loadAnimation("sonic jump.gif");
  naveImg = loadImage ("nave.png");
  gameOver = loadImage ("gameOver.png")
}

function setup() {
  createCanvas (windowWidth,windowHeight)
  fundo = createSprite (width/2,height/2,width,height)
  fundo.addImage(cenario)

  sonic = createSprite (200,height-250);
  sonic.addAnimation ("sonic",sonicImg);
  sonic.addAnimation("sonicJump",sonicJump)
  sonic.scale = 0.3;
  

  ringGroup = new Group ();
  naveGroup = new Group ();
   
  invisibleGround = createSprite (width/2,height-170,width,25);
  invisibleGround.visible = false;
}

function draw() {
    background ("black")
    fundo.velocityX = -10;
    if (fundo.x<0){
        fundo.x = fundo.width/2;
    }

    sonic.velocityY += 1;
    sonic.collide (invisibleGround);
    if (keyDown ("space") && sonic.y >= 617) {
     sonic.velocityY = -20;
    
     
    }
    if(sonic.y <= 600) {
      sonic.changeAnimation("sonicJump");
      sonic.scale = 1;
     }
   else {
    sonic.changeAnimation("sonic");
    sonic.scale = 0.3;
   }
   sonic.overlap (ringGroup,function(colector,colected){
     colected.remove ();
     score += 1;
   })
   drawSprites ()
    if (sonic.isTouching (naveGroup)){
      naveGroup.setVelocityXEach (0);
      ringGroup.setVelocityXEach (0);
      fundo.velocityX = 0;
      sonic.visible = false;
      image (gameOver,500,80,800,800);
    }
    else {
      createRing ()
      createEgg ()
    }
    
    
    image (ringImg,50,100,50,50);
    textSize (30);
    fill ("black");
    text (":"+ score,100,137)

}   

 function createRing( ){
   if(frameCount%60 === 0) {
     ring = createSprite (width,random(height-250,height-450));
     ring.addImage (ringImg);
     ring.velocityX = -5;
     ring.scale = 0.1;
     ringGroup.add (ring);
   }
 }

 function createEgg(){
   if (frameCount%60 === 0){
     nave = createSprite (width,617);
     nave.addImage (naveImg);
     nave.velocityX = -18;
     nave.scale = 0.3;
     naveGroup.add (nave);
   }
 }
