'use strict';

console.log('Take a break. Drink Some water.')

let rounds = 25;
const allItemsArray = [];

const ulClickElem = document.getElementById('itemClicks');
const allItemsSectionElem = document.getElementById('allItems');

const leftImgElem = document.getElementById('leftImg');
const leftPElem = document.getElementById('leftP');

const middleImgElem = document.getElementById('middleImg');
const middlePElem = document.getElementById('middleP');

const rightImgElem = document.getElementById('rightImg');
const rightPElem = document.getElementById('rightP');

const buttonElem = document.getElementById('viewButton')

let leftItem = null;
let middleItem = null;
let rightItem = null;

let userName = prompt('Thank you for participating in the Bus Mall Survey. Please enter your name and click on the items that you would prefer to have.')

function Item (name, image) {
  this.name = name;
  this.image = image;
  this.views = 0;
  this.votes = 0;
}

Item.allItems = [];

Item.prototype.renderItem = function(img, p) {
  img.src = this.image;
  p.textContent = this.name;
  this.views++;
}

function storeItems() {
  const stringifiedItems = JSON.stringify(Item.allItems);
  localStorage.setItem('itemsInStorage', stringifiedItems)
}

// Shoutout to David Hecker during code review for helping with this
function getItemsFromStorage() {
  const stringifiedItems = localStorage.getItem('itemsInStorage')
  if(stringifiedItems) {
    const parsedItems = JSON.parse(stringifiedItems)
    for(let item of parsedItems) {
      const currenItemName = item.name
      for(let originalItem of Item.allItems) {
        const originalName = originalItem.name
        if(currenItemName === originalName) {
          originalItem.votes = item.votes;
          originalItem.views = item.views;
        }
      }
    }
  }  
}

function getRandomItems() {
  const unavailableItems = [leftItem, middleItem, rightItem];
  while(unavailableItems.includes(leftItem)) {
    let leftIndex = Math.floor(Math.random() * Item.allItems.length);
    leftItem = Item.allItems[leftIndex];
  }
  unavailableItems.push(leftItem);
  while(unavailableItems.includes(middleItem)) {
    let middleIndex = Math.floor(Math.random() * Item.allItems.length);
    middleItem = Item.allItems[middleIndex];
  }
  unavailableItems.push(middleItem);
  while(unavailableItems.includes(rightItem)) {
    let rightIndex = Math.floor(Math.random() * Item.allItems.length);
    rightItem = Item.allItems[rightIndex];
  }
  renderAllItems();
}

function renderAllItems(){
  leftItem.renderItem(leftImgElem, leftPElem);
  middleItem.renderItem(middleImgElem, middlePElem);
  rightItem.renderItem(rightImgElem, rightPElem);
}

function clickHandle(event) {
  let imgClicked = event.target.id;
  if (imgClicked === 'leftImg' || imgClicked === 'middleImg' || imgClicked === 'rightImg') {
    rounds--;
    if (imgClicked === 'leftImg') {
      leftItem.votes++;
    } else if (imgClicked === 'middleImg') {
      middleItem.votes++;
    } else if (imgClicked === 'rightImg') {
      rightItem.votes++;
    }
  } else {
    alert('Please click on a picture, ' + userName + '.');
  }
  if (rounds === 0) {
    allItemsSectionElem.removeEventListener('click', clickHandle);
    alert('Thank you for voting, ' + userName + '. Please click the button to view your results.');
    storeItems();
    renderButton();
  } else {
    getRandomItems();
  }
}

function viewResults() {
  renderResults();
  renderChart();
}

function renderButton() {
  let buttonElem = document.createElement('button');
  buttonElem.textContent = 'View Results';
  buttonElem.id = "view";
  let buttonDivElem = document.getElementById('viewButton');
  buttonDivElem.appendChild(buttonElem);
  buttonElem.addEventListener('click', viewResults)
}

function renderChart() {
  const ctx = document.getElementById('chartCanvas').getContext('2d');
  const allItemsArray = [];
  const allViewsArray = [];
  const allVotesArray = [];
  for(let item of Item.allItems) {
    allItemsArray.push(item.name);
    allViewsArray.push(item.views);
    allVotesArray.push(item.votes)
  }
  
  let chartCanvas = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: allItemsArray,
        datasets: [{
            label: '# of Votes',
            data: allVotesArray,
            backgroundColor: 'red',
            borderColor: 'blue',
            borderWidth: 1,
        }, {
          label: '# of Views',
          data: allViewsArray,
          backgroundColor: 'yellow',
          borderColor: 'green',
          borderWidth: 1,
        },]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
  });
}

function renderResults() {
  ulClickElem.textContent = '';
  // ulClickElem.innerHTML = '';
  for (let item of Item.allItems) {
    console.log(item);
    let liElem = document.createElement('li');
    if (item.views === 0) {
      liElem.textContent = `${item.name} has not been viewed.`;
      ulClickElem.appendChild(liElem);
    }
    else {
      liElem.textContent = `${item.name} has ${item.votes} vote(s).`;
      ulClickElem.appendChild(liElem);
    }
  }
}

allItemsSectionElem.addEventListener('click', clickHandle);

Item.allItems.push(new Item('R2D2 Rolling Suitcase', './img/bag.jpg'));
Item.allItems.push(new Item('Banana Slicer', './img/banana.jpg'));
Item.allItems.push(new Item('Bathroom Tablet Stand', './img/bathroom.jpg'))
Item.allItems.push(new Item('Open-Toe Rainboots', './img/boots.jpg'))
Item.allItems.push(new Item('3-in-1 Portable Toaster Oven', './img/breakfast.jpg'))
Item.allItems.push(new Item('Meatball Shaped Bubblegum', './img/bubblegum.jpg'))
Item.allItems.push(new Item('Designer Chair', './img/chair.jpg'))
Item.allItems.push(new Item('The Call of Cthulu Action Figure', './img/cthulhu.jpg'))
Item.allItems.push(new Item('Duck Bill Covid Mask for your Dog', './img/dog-duck.jpg'))
Item.allItems.push(new Item('Real Dragon Meat in a Can', './img/dragon.jpg'))
Item.allItems.push(new Item('Cutlery Pen Attachment', './img/pen.jpg'))
Item.allItems.push(new Item('Sweeper-Slippers for your Dog', './img/pet-sweep.jpg'))
Item.allItems.push(new Item('Pizza Scissors and Grafitti Stencil', './img/scissors.jpg'))
Item.allItems.push(new Item('Cozy Shark Sleeping Bag', './img/shark.jpg'))
Item.allItems.push(new Item('Sweeper-Onesie for your Baby', './img/sweep.png'))
Item.allItems.push(new Item('Star wars Tauntaun Sleeping Bag for your Child', './img/tauntaun.jpg'))
Item.allItems.push(new Item('Real Unicorn Meat in a Can', './img/unicorn.jpg'))
Item.allItems.push(new Item('Designer Watering Can', './img/water-can.jpg'))
Item.allItems.push(new Item('Practical Wine Glass', './img/wine-glass.jpg'))

getRandomItems();
getItemsFromStorage();
