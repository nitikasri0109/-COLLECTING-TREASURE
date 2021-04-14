var ground, ground_image;
var beach, beach_image;
var jake, jake_animation
var friends, cubby, izzy, friendsgroup;
var treasure, treasuregroup, box1;
var money, moneygroup, rupees;
var jewellery, jewellerygroup, box2;
var bomb, bombgroup, blast;
var missile, missilegroup, miss;
var gameState = "display";
var score = 0;
var blastsound, win, checkPoint;
var gameOver, gameOver_image, Restart, Restart_image;
var a=0;

function preload() {

  //ground_image
  ground_image = loadImage("ground.png");

  //beach_image
  beach_image = loadImage("beach.png");

  //jake_aniamtion
  jake_animation = loadAnimation("Jake.png", "Jake1.png");

  //cubby
  cubby = loadImage("Cubby.png");

  //Izzy
  izzy = loadImage("Izzy.png");

  //box1
  box1 = loadImage("Treasure.png");

  //rupees
  rupees = loadImage("Money.png");

  //box2
  box2 = loadImage("Jewellery.png");

  //blast
  blast = loadImage("Bomb.png");

  //miss
  miss = loadImage("Missile.png");

  //blastsound
  blastsound = loadSound("Bombblast.mp3");

  //win
  win = loadSound("Winning.mp3");

  //checkPoint
  checkPoint = loadSound("checkPoint.mp3");

  //gameOver_image
  gameOver_image = loadImage("gameOver.png");

  //Restart_image
  Restart_image = loadImage("Restartbutton.png");
}

function setup() {

  createCanvas(600, 400);

  //ground
  ground = createSprite(300, 200, 0, 0);
  ground.addImage("ground", ground_image);
  ground.scale = 0.38;

  //beach
  beach = createSprite(200, 200, 0, 0);
  beach.addImage("beach", beach_image);
  beach.scale = 0.9;
  beach.visible = false;

  //jake
  jake = createSprite(50, 200, 0, 0);
  jake.addAnimation("jake", jake_animation);
  //jake.debug = true;
  jake.setCollider("circle", 10, -20, 20)
  jake.visible = false;

  //gameOver
  gameOver = createSprite(300, 100);
  gameOver.addImage("gameOver", gameOver_image);
  gameOver.visible = false;

  //Restart
  Restart = createSprite(300, 200);
  Restart.addImage("restart", Restart_image);
  Restart.scale = 0.2;
  Restart.visible = false;

  treasuregroup = new Group();
  friendsgroup = new Group();
  moneygroup = new Group();
  jewellerygroup = new Group();
  bombgroup = new Group();
  missilegroup = new Group();
}

function draw() {

  jake.y = World.mouseY;

  drawSprites();

  if (gameState === "display") {
    fill("black");
    textSize(25);
    text("Press on the background to continue", 100, 150);
  }

  if (mousePressedOver(ground) && gameState === "display"){   ground.visible = false;
    beach.visible = true;
    jake.visible = true;
    gameState = "play";
  }

  fill("black");
  textSize(20);
  text("score: " + (score), 50, 50);

  if (gameState === "play") {

    if (jake.isTouching(treasuregroup)) {
      a=0;
      score = score + 1;
      treasuregroup.setLifetimeEach(0);
      win.play();
    }

    if (jake.isTouching(moneygroup)) {
      a=0;
      score = score + 5;
      moneygroup.setLifetimeEach(0);
      win.play();
    }

    if (jake.isTouching(jewellerygroup)) {
      a=0;
      score = score + 10;
      jewellerygroup.setLifetimeEach(0);
      win.play();
    }

    if (jake.isTouching(friendsgroup)) {
      a=0;
      friendsgroup.setLifetimeEach(0);
      gameState = "end";
      blastsound.play();
    }

    if (jake.isTouching(bombgroup)) {
      a=0;
      bombgroup.setLifetimeEach(0);
      gameState = "end";
      blastsound.play();
    }

    if (jake.isTouching(missilegroup)) {
      a=0;
      missilegroup.setLifetimeEach(0);
      gameState = "end";
      blastsound.play();
    }

    if (a===0 && score != 0 && score % 10 === 0){
      checkPoint.play();
      a=1;
    }
    

    if (frameCount % 100 === 0) {

      var rand = Math.round(random(1, 3));


      if (rand == 1) {
        spawnBomb();
      } else if (rand == 2) {
        spawnMissile();
      } else if (rand == 3) {
        spawnFriends();
      }
    }
    if (frameCount % 60 === 0) {
    var rand = Math.round(random(1, 3));

    if (rand == 1) {
      spawnMoney();
    } 
      else if (rand == 2) {
      spawnTreasure();
    } 
      else if (rand == 3) {
      spawnJewellery();
    }
  }
  }


  if (gameState === "end") {
    gameOver.visible = true;
    Restart.visible = true;

    treasuregroup.setVelocityXEach(0);
    treasuregroup.setLifetimeEach(-1);

    friendsgroup.setVelocityXEach(0);
    friendsgroup.setLifetimeEach(-1);

    moneygroup.setVelocityXEach(0);
    moneygroup.setLifetimeEach(-1);

    jewellerygroup.setVelocityXEach(0);
    jewellerygroup.setLifetimeEach(-1);

    bombgroup.setVelocityXEach(0);
    bombgroup.setLifetimeEach(-1);

    missilegroup.setVelocityXEach(0);
    missilegroup.setLifetimeEach(-1);
  }

  if (mousePressedOver(Restart)) {
    reset();
  }
}

function spawnTreasure() {
  //treasure
  treasure = createSprite(600, random(60, 340), 10, 10);
  treasure.addImage("box", box1);
  treasure.velocityX = -4;
  treasure.scale = 0.1;
  treasure.lifetime = 150;
  treasuregroup.add(treasure);
}

function spawnFriends() {
  //friends
  friends = createSprite(600, random(60, 340), 10, 10);
  friends.velocityX = -4;
  friends.lifetime = 150;
  friendsgroup.add(friends);

  //rand
  var rand = Math.round(random(1, 2));

  switch (rand) {
    case 1:
      friends.addImage("cubby", cubby);
      friends.scale = 0.2;
      break;

    case 2:
      friends.addImage("Izzy", izzy);
      friends.scale = 0.1;
      break;
  }
}

function spawnMoney() {
  //money
  money = createSprite(600, random(60, 340), 10, 10);
  money.addImage("money", rupees);
  money.scale = 0.1;
  money.velocityX = -4;
  money.lifetime = 150;
  moneygroup.add(money);
}

function spawnJewellery() {
  //jewellery
  jewellery = createSprite(600, random(60, 340), 10, 10);
  jewellery.addImage("jewellery", box2);
  jewellery.scale = 0.1;
  jewellery.velocityX = -4;
  jewellery.lifetime = 150;
  jewellerygroup.add(jewellery);
}

function spawnBomb() {
  //bomb
  bomb = createSprite(600, random(60, 340), 10, 10);
  bomb.addImage("bomb", blast);
  bomb.scale = 0.1;
  bomb.velocityX = -4;
  bomb.lifetime = 150;
  bombgroup.add(bomb);
}

function spawnMissile() {
  //missile
  missile = createSprite(600, random(60, 340), 10, 10);
  missile.addImage("missile", miss);
  missile.scale = 0.2;
  missile.velocityX = -4;
  missile.lifetime = 150;
  missilegroup.add(missile);
}

function reset() {
  gameState = "play";

  score = 0;

  treasuregroup.destroyEach();
  friendsgroup.destroyEach();
  moneygroup.destroyEach();
  jewellerygroup.destroyEach();
  bombgroup.destroyEach();
  missilegroup.destroyEach();

  gameOver.visible = false;

  Restart.visible = false;
}