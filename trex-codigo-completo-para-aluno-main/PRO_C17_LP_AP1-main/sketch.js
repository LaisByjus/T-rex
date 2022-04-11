var trex, trexRunning,trexColide;
var edges;
var solo, imagemSolo;
var soloInvisivel;
var nuvem,imagemNuvem;
var cacto,imagemCacto1,imagemCacto2,imagemCacto3,imagemCacto4, imagemCacto5, imagemCacto6;
var score=0;
var play=1;
var end=0;
var gameState=play;
var nuvemGp,cactoGp;
var gameOver,gameOverImg;
var restart,restartImg;
var somPulo,somPontos,somMorte;

function preload(){
  trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png"); 
  imagemSolo = loadImage("ground2.png");
  imagemNuvem= loadImage ("cloud.png");
  trexColide=loadAnimation("trex_collided.png");
  imagemCacto1= loadImage ("obstacle1.png");
  imagemCacto2= loadImage ("obstacle2.png");
  imagemCacto3= loadImage ("obstacle3.png");
  imagemCacto4= loadImage ("obstacle4.png");
  imagemCacto5= loadImage ("obstacle5.png");
  imagemCacto6= loadImage ("obstacle6.png");
  gameOverImg= loadImage  ("gameOver.png");
  restartImg= loadImage   ("restart.png");
  somPulo=loadSound("jump.mp3");
  somPontos=loadSound("checkpoint.mp3");
  somMorte=loadSound("die.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  edges= createEdgeSprites();
  //crie um sprite de trex
  trex = createSprite(50,height-40,20,50);
 trex.addAnimation("running", trexRunning);
 trex.scale= 0.5;
 trex.addAnimation("colid", trexColide);
 trex.debug=false; 
 //trex.setCollider("rectangle",0,0,50,50,60);
 trex.setCollider("circle",0,0,20)
 
 gameOver=createSprite(width/2,height-120,100,10);
 gameOver.addImage(gameOverImg);
 gameOver.scale=0.5
 gameOver.visible=false

 restart=createSprite(width/2,height-90,100,10);
 restart.addImage(restartImg);
 restart.scale=0.5
 restart.visible=false
 solo=createSprite(width/2,height-30,width,2);
 solo.addImage("solo", imagemSolo);
 soloInvisivel=createSprite(width/2,height-10,width,2);
 soloInvisivel.visible=false;
 nuvemGp=new Group();
 cactoGp=new Group();
}

function draw(){
  background("white");
  
  if(trex.isTouching(cactoGp)){
    gameState=end;

    //somMorte.play()  
  }

    if (gameState==play) {
      score+=Math.round(getFrameRate()/60);
      if(score%100==0&& score>0){
        somPontos.play()    
      }
      if(touches.length>0||keyDown("space")&& trex.y>height-36){
        trex.velocityY =-12;
      somPulo.play()
      touches=[]
      } 
      solo.velocityX=-(12+score/100); 
       
        if(solo.x<300){
          solo.x=solo.width/2;
        }
        nuvens();
        cactos();
  }
  
  if (gameState==end){
    trex.changeAnimation("colid", trexColide);
    solo.velocityX=0;
    nuvemGp.setVelocityXEach(0)
    cactoGp.setVelocityXEach(0) 
    cactoGp.setLifetimeEach(-1)
    nuvemGp.setLifetimeEach(-1)
    gameOver.visible=true
     restart.visible=true
    if(mousePressedOver(restart)){
    gameState=play  
    gameOver.visible=false
    restart.visible=false
    cactoGp.destroyEach()
    nuvemGp.destroyEach()
    trex.changeAnimation("running",trexRunning)
    score=0

    }
    }
  
  gravity();
  trex.collide(soloInvisivel);
 //console.log(trex.Y);
 text("X: "+mouseX+" /Y:"+mouseY,mouseX,mouseY);


 fill ("gray");
 textSize("18");
 
text("score; "+score,width-90,height-173);

 drawSprites();

}
function gravity(){
  trex.velocityY += 0.5;
  trex.collide(edges[3 ]);
}
function nuvens(){
  if(frameCount%70===0){
    nuvem=createSprite (width,random(height-165,height-97),40,10);
  nuvem.velocityX= -(5+score/100); 
  nuvem.scale=random(0.3,1.7);
  nuvem.addImage(imagemNuvem);
  nuvem.depth=trex.depth-1;
  nuvem.lifetime=width/nuvem.velocityX;
  nuvemGp.add(nuvem);
}
}
function cactos(){
  if (frameCount%100==0){
    cacto=createSprite(width,height-30,10,50);
  cacto.velocityX=-(7+score/100); 
  cacto.scale=0.5;
  cacto.lifetime=width/cacto.velocityX;
  cactoGp.add(cacto);
  var sorteioCactos=Math.round(random(1,6));
  switch (sorteioCactos) {
    case 1: cacto.addImage(imagemCacto1);
    break;
    case 2: cacto.addImage(imagemCacto2);
    break;
    case 3: cacto.addImage(imagemCacto3);
    break;
    case 4: cacto.addImage(imagemCacto4);
    break;
    case 5: cacto.addImage(imagemCacto5);
    break;
    case 6: cacto.addImage(imagemCacto6);
    break;
  }
  }
}