var OregonH = OregonH || {};

OregonH.UI = {};

OregonH.UI.notify = function(message, type){
  document.getElementById('updates-area').innerHTML = '<div class="update-' + type + '">Day '+ Math.ceil(this.caravan.day) + ': ' + message+'</div>' + document.getElementById('updates-area').innerHTML;
};

OregonH.UI.refreshStats = function() {
  //modify the dom
  document.getElementById('stat-day').innerHTML = Math.ceil(this.caravan.day);
  document.getElementById('stat-distance').innerHTML = Math.floor(this.caravan.distance);
  document.getElementById('stat-crew').innerHTML = this.caravan.crew;
  document.getElementById('stat-oxen').innerHTML = this.caravan.oxen;
  document.getElementById('stat-food').innerHTML = Math.ceil(this.caravan.food);
  document.getElementById('stat-money').innerHTML = this.caravan.money;
  document.getElementById('stat-firepower').innerHTML = this.caravan.firepower;
  document.getElementById('stat-weight').innerHTML = Math.ceil(this.caravan.weight) + '/' + this.caravan.capacity;

  document.getElementById('caravan').style.left = (380 * this.caravan.distance/OregonH.FINAL_DISTANCE) + 'px';
};

OregonH.UI.showShop = function(products){

  var shopDiv = document.getElementById('shop');
  shopDiv.classList.remove('hidden');

  if(!this.shopInitiated) {

    shopDiv.addEventListener('click', function(e){
      var target = e.target || e.src;

      if(target.tagName == 'BUTTON') {
        shopDiv.classList.add('hidden');
        OregonH.UI.game.resumeJourney();
      }
      else if(target.tagName == 'DIV' && target.className.match(/product/)) {

        console.log('buying')

        var bought = OregonH.UI.buyProduct({
          item: target.getAttribute('data-item'),
          qty: target.getAttribute('data-qty'),
          price: target.getAttribute('data-price')
        });

        if(bought) target.html = '';
      }
    });

    this.shopInitiated = true;
  }

  var prodsDiv = document.getElementById('prods');
  prodsDiv.innerHTML = '';

  var product;
  for(var i=0; i < products.length; i++) {
    product = products[i];
    prodsDiv.innerHTML += '<div class="product" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
  }


};

OregonH.UI.buyProduct = function(product) {
  if(product.price > OregonH.UI.caravan.money) {
    OregonH.UI.notify('Not enough money', 'negative');
    return false;
  }

  OregonH.UI.caravan.money -= product.price;

  OregonH.UI.caravan[product.item] += +product.qty;

  OregonH.UI.notify('Bought ' + product.qty + ' x ' + product.item, 'positive');

  OregonH.UI.caravan.updateWeight();

  OregonH.UI.refreshStats();

  return true;

};

OregonH.UI.showAttack = function(firepower, gold) {
  var attackDiv = document.getElementById('attack');
  attackDiv.classList.remove('hidden');

  this.firepower = firepower;
  this.gold = gold;

  document.getElementById('attack-description').innerHTML = 'Firepower: ' + firepower;

  if(!this.attackInitiated) {

    document.getElementById('fight').addEventListener('click', this.fight.bind(this));

    document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));

    this.attackInitiated = true;
  }
};

OregonH.UI.fight = function(){

  var firepower = this.firepower;
  var gold = this.gold;

  var damage = Math.ceil(Math.max(0, firepower * 2 * Math.random() - this.caravan.firepower));

  if(damage < this.caravan.crew) {
    this.caravan.crew -= damage;
    this.caravan.money += gold;
    this.notify(damage + ' people were killed fighting', 'negative');
    this.notify('Found $' + gold, 'gold');
  }
  else {
    this.caravan.crew = 0;
    this.notify('Everybody died in the fight', 'negative');
  }

  document.getElementById('attack').classList.add('hidden');
  this.game.resumeJourney();
};

OregonH.UI.runaway = function(){

  var firepower = this.firepower;

  var damage = Math.ceil(Math.max(0, firepower * Math.random()/2));

  if(damage < this.caravan.crew) {
    this.caravan.crew -= damage;
    this.notify(damage + ' people were killed running', 'negative');
  }
  else {
    this.caravan.crew = 0;
    this.notify('Everybody died running away', 'negative');
  }

  document.getElementById('runaway').removeEventListener('click');

  document.getElementById('attack').classList.add('hidden');
  this.game.resumeJourney();

};