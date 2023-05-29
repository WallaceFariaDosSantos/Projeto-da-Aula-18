var path, boy, cash, diamonds, endgame, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

//Estados de Jogo
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadImage("Runner-1.gif");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("Sword01.png");
  endImg =loadImage("fimdeJogo.png");
}

function setup(){
  //Crie uma tela
  createCanvas(windowWidth, windowHeight);

  //Plano de fundo se movendo
  path = createSprite(1130,500);
  path.addImage(pathImg);
  path.velocityX = -12;
  path.scale = 1.6;

  //Crie o menino correndo
  boy = createSprite(width/2,height-20,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale = 0.5;
  boy.setCollider("rectangle",800,0,180,100);

  //Fim de jogo
  endgame = createSprite(1250,500,20,20);
  endgame.addImage("endofgame", endImg);
  endgame.scale = 1;
  endgame.visible = false;
  
  //Grupos
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
}

function draw(){
  if(gameState === PLAY){
    background(0);
    boy.x = World.mouseX-370;
    boy.y = World.mouseY;
    
    edges= createEdgeSprites();
    boy.collide(edges);
    
    //Código para reiniciar o plano de fundo
    if(path.x < width-1500){
      path.x = width/2;
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if(cashG.isTouching(boy)){
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if(diamondsG.isTouching(boy)){
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)){
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END;
      }
    }
    
    if(gameState === END){
      endgame.visible = true;
    
      textSize(20);
      fill(255);
      text("Aperte a barra de espaço ou toque na tela para reiniciar o jogo", width-1450, 600);
    
      path.velocityX = 0;
      boy.velocityY = 0;

      if(keyDown("space")){
        reset();
      }

      if(touches.length > 0){
      reset();
      touches = [];
    }
  }
    drawSprites();
    textSize(20);
    fill(255);
    text("Tesouro: "+ treasureCollection, width-150,30);
  }
}

function createCash(){
  if(World.frameCount % 100 == 0){
    var cash = createSprite(2600, Math.round(random(50, 750), 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityX = -12;
    cash.lifetime = 300;
    cashG.add(cash);
    cash.setCollider("rectangle",0,0,10,10);
  }
}

function createDiamonds(){
  if(World.frameCount % 160 == 0){
    var diamonds = createSprite(2600, Math.round(random(50, 750), 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.12;
    diamonds.velocityX = -12;
    diamonds.lifetime = 300;
    diamondsG.add(diamonds);
    diamonds.setCollider("rectangle",0,0,10,10);
  }
}

function createJwellery(){
  if(World.frameCount % 205 == 0){
    var jwellery = createSprite(2600, Math.round(random(50, 750), 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.25;
    jwellery.velocityX = -12;
    jwellery.lifetime = 300;
    jwelleryG.add(jwellery);
    jwellery.setCollider("rectangle",0,0,10,10);
  }
}

function createSword(){
  if(World.frameCount % 265 == 0){
    var sword = createSprite(2600, Math.round(random(50, 750), 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.6;
    sword.velocityX = -12;
    sword.lifetime = 300;
    swordGroup.add(sword);
    sword.setCollider("rectangle",-320,0,40,40);
    sword.debug = true;
  }
}

function reset(){
  gameState = PLAY;
  endgame.visible = false;
  swordGroup.destroyEach();
  jwelleryG.destroyEach();
  diamondsG.destroyEach();
  cashG.destroyEach();
  treasureCollection = 0;
}