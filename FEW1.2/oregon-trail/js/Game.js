var OregonH = OregonH || {};

OregonH.WEIGHT_PER_OX = 20;
OregonH.WEIGHT_PER_PERSON = 2;
OregonH.FOOD_WEIGHT = 0.6;
OregonH.FIREPOWER_WEIGHT = 5;
OregonH.GAME_SPEED = 800;
OregonH.DAY_PER_STEP = 0.2;
OregonH.FOOD_PER_PERSON = 0.02;
OregonH.FULL_SPEED = 5;
OregonH.SLOW_SPEED = 3;
OregonH.FINAL_DISTANCE = 1000;
OregonH.EVENT_PROBABILITY = 0.15;
OregonH.ENEMY_FIREPOWER_AVG = 5;
OregonH.ENEMY_GOLD_AVG = 50;

OregonH.Game = {};

OregonH.Game.init = function(){

  this.ui = OregonH.UI;

  this.eventManager = OregonH.Event;

  this.caravan = OregonH.Caravan;
  this.caravan.init({
    day: 0,
    distance: 0,
    crew: 30,
    food: 80,
    oxen: 2,
    money: 300,
    firepower: 2
  });

  //pass references
  this.caravan.ui = this.ui;
  this.caravan.eventManager = this.eventManager;

  this.ui.game = this;
  this.ui.caravan = this.caravan;
  this.ui.eventManager = this.eventManager;

  this.eventManager.game = this;
  this.eventManager.caravan = this.caravan;
  this.eventManager.ui = this.ui;

  //begin
  this.startJourney();
};

OregonH.Game.startJourney = function() {
  this.gameActive = true;
  this.previousTime = null;
  this.ui.notify('A great adventure begins', 'positive');

  this.step();
};

OregonH.Game.step = function(timestamp) {

  if(!this.previousTime){
    this.previousTime = timestamp;
    this.updateGame();
  }

  var progress = timestamp - this.previousTime;

  if(progress >= OregonH.GAME_SPEED) {
    this.previousTime = timestamp;
    this.updateGame();
  }

  if(this.gameActive) window.requestAnimationFrame(this.step.bind(this));
};

OregonH.Game.updateGame = function() {
  this.caravan.day += OregonH.DAY_PER_STEP;

  this.caravan.consumeFood();

  if(this.caravan.food === 0) {
    this.ui.notify('Your caravan starved to death', 'negative');
    this.gameActive = false;
    return;
  }

  this.caravan.updateWeight();

  this.caravan.updateDistance();

  this.ui.refreshStats();

  if(this.caravan.crew <= 0) {
    this.caravan.crew = 0;
    this.ui.notify('Everyone died', 'negative');
    this.gameActive = false;
    return;
  }

  if(this.caravan.distance >= OregonH.FINAL_DISTANCE) {
    this.ui.notify('You have returned home!', 'positive');
    this.gameActive = false;
    return;
  }

  if(Math.random() <= OregonH.EVENT_PROBABILITY) {
    this.eventManager.generateEvent();
  }
};

//pause
OregonH.Game.pauseJourney = function() {
  this.gameActive = false;
};

//resume
OregonH.Game.resumeJourney = function() {
  this.gameActive = true;
  this.step();
};


//init game
OregonH.Game.init();