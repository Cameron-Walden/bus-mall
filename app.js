'use strict';

console.log('Take a break. Drink Some water.')

let clickCount = 0;
let rounds = 10;

const ulClickElem = document.getElementById('itemClicks');
const clickSectionElem = document.getElementById('allItems');

const leftImgElem = document.getElementById('leftImg');
const leftPElem = document.getElementById('leftP');

const middleImgElem = document.getElementById('middleImg');
const middlePElem = document.getElementById('middleP');

const rightImgElem = document.getElementById('rightImg');
const rightPElem = document.getElementById('rightP');

let leftItem = null;
let middleItem = null;
let rightItem = null;

let userName = prompt('Thank you for using the BusMall App. What\'s your name?')

function Item (name, image) {
  this.name = name;
  this.image = image;
  this.views = 0;
  this.likes = 0;
  Item.allItems.push(this);
}

Item.allItems = [];

Item.prototype.renderItem = function (img, p) {
  img.src = this.image;
  p.textContent = this.name;
}

function getRandomItems() {
  let leftIndex = Math.floor(Math.random() * Item.allItems.length);
  leftItem = Item.allItems[leftIndex];

  let middleIndex = Math.floor(Math.random() * Item.allItems.length);
  middleItem = Item.allItems[middleIndex];

  let rightIndex = Math.floor(Math.random() * Item.allItems.length);
  rightItem = Item.allItems[rightIndex];

  while (leftItem === middleItem || leftItem === rightItem || middleItem === rightItem) {
    leftIndex = Math.floor(Math.random() * Item.allItems.length);
    leftItem = Item.allItems[leftIndex];

    middleIndex = Math.floor(Math.random() * Item.allItems.length);
    middleItem = Item.allItems[middleIndex];
  }
  leftItem.views++;
  middleItem.views++;
  rightItem.views++;
}

function renderAllItems(){
  leftItem.renderItem(leftImgElem, leftPElem);
  middleItem.renderItem(middleImgElem, middlePElem);
  rightItem.renderItem(rightImgElem, rightPElem);
}

function renderResults() {
  ulClickElem.textContent = '';
  for (let item of Item.allItems) {
    let liElem = document.createElement('li');
    if (item.views === 0) {
      liElem.textContent = `${item.name} has not been viewed yet.`;
      ulClickElem.appendChild(liElem);
    }
  }
}

function clickHandle(event) {
  let imgClicked = event.target.id;
  console.log(imgClicked);
  if (imgClicked === 'leftImg' || imgClicked === 'middleImg' || imgClicked === 'rightImg') {
    clickCount++;
    console.log(clickCount);if (imgClicked === 'leftImg') {
      leftItem.likes++;
      renderResults();
      getRandomItems();
      renderAllItems();
    } else if (imgClicked === 'middleImg') {
      middleItem.likes++;
      renderResults();
      getRandomItems();
      renderAllItems();
    } else if (imgClicked === 'rightImg') {
      rightItem.likes++;
      renderResults();
      getRandomItems();
      renderAllItems();
    }
  }
  else {
    alert('Please click on a picture, ' + userName + '.');
  }
}

clickSectionElem.addEventListener('click', clickHandle);

new Item('Bag', './img/bag.jpg');
new Item('Banana', './img/banana.jpg');
new Item('Bathroom', './img/bathroom.jpg')
new Item('Boots', './img/boots.jpg')
new Item('Breakfast', './img/breakfast.jpg')
new Item('Bubblegum', './img/bubblegum.jpg')
new Item('Chair', './img/chair.jpg')
new Item('Cthulhu', './img/cthulhu.jpg')
new Item('Dog-Duck', './img/dog-duck.jpg')
new Item('Dragon', './img/dragon.jpg')
new Item('Pen', './img/pen.jpg')
new Item('Pet-Sweep', './img/pet-sweep.jpg')
new Item('Scissors', './img/scissors.jpg')
new Item('Shark', './img/shark.jpg')
new Item('Sweep', './img/sweep.png')
new Item('Tauntaun', './img/tauntaun.jpg')
new Item('Unicorn', './img/unicorn.jpg')
new Item('Water-Can', './img/water-can.jpg')
new Item('Wine Glass', './img/wine-glass.jpg')

getRandomItems();
renderAllItems();