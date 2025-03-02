let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let playedCards = [];

let number = 0;
let isGame = true;
const cardsField = document.getElementById("cards");
const plCards = document.getElementById("pl_cards");
const realCards = document.getElementById("real_cards");
const playedCardsField = document.getElementById("played_cards");
const info = document.getElementById("info");
const rel = document.getElementById("reload");

info.innerHTML = "Take the card!";

function shuffle(arr) {
  let rand, temp;
  for (let i = 0; i < arr.length; i++) {
    rand = Math.floor(Math.random() * (i + 1));
    temp = arr[rand];
    arr[rand] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

shuffle(cards);

cardsField.innerHTML = showCards(cards);

function showCards(cards) {
  return cards.join(", ");
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");

  event.target.appendChild(document.getElementById(data));
  play(cards, data);
  // console.log(data);
  // const number = +data.slice(3);
  // info.innerHTML = number + ": " + cards[number];
  // console.log(number);
  // console.log(cards);
  // removeCard(number);
  // console.log(cards);
}

function generateCards(cards, cardsF, s = "r") {
  cardsF.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    cardsF.innerHTML += `<div id="${s}c_${i}" class="card" draggable="true" ondragstart="drag(event)"><span>${cards[i]}</span></div>`;
  }
}

function newPlay() {
  location.reload();
  return false;
}

function removeCard(number) {
  playedCards.push(cards[number]);
  cards.splice(number, 1);
  cardsField.innerHTML = showCards(cards);
  plCards.innerHTML = showCards(playedCards);
  generateCards(cards, realCards);
  generateCards(playedCards, playedCardsField, "p");
}

function myMove(elId) {
  isGame = false;
  let b = false;
  number = Number(elId.substr(3));
  if (number > cards.length || number < 0) {
    throw new Error("Input error! Try again!");
  }
  //   if (checkWin("You ", cards[number])) {
  //     b = true;
  //   } else {
  setTimeout(removeCard.bind(null, number), 200);
  isGame = true;
  // }
  return b;
}

function computerMove() {
  isGame = false;
  let b = false;
  number = Math.floor(Math.random() * cards.length);

  console.log(number);

  let computerCard = document.getElementById(`rc_${number}`);
  console.log(computerCard.id);

  // if (checkWin("I ", cards[number])) {
  //   b = true;
  //   return b;
  // } else {
  setTimeout(removeCard.bind(this, number), 200);
  isGame = true;
  //  }
  return b;
}

function play(cards, elId) {
  if (!isGame) return;
  try {
    if (myMove(elId)) return;
    setTimeout(computerMove, 300);
  } catch (ex) {
    info.innerHTML = ex.message;
  }
}

window.onload = function () {
  generateCards(cards, realCards);
  rel.addEventListener("click", newPlay);
};
