const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let i = 1;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over

    newDiv.classList.add(color);

    // also assigns each div an id
    newDiv.id = i;
    i++;
    newDiv.style.backgroundColor = 'darkgrey'

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

const pickedCards = [];
let cardColors = [];
let onWait = false;
let winCount = 0
let tryCount = 0
// TODO: Implement this function!
function handleCardClick(event) {
  // prevents cards from being shown while cards are already being shown

  if (onWait) {
    console.log('you have to wait for the next round to start!')

  } else {
    // assigns card data to appropriate arrays
    pickedCards.push(event.target.id);
    cardColors.push(event.target.className);

    // if no cards picked yet, this assigns the first values to pickedCards and cardColors
    if (pickedCards.length == 1) {
      console.log('Please pick another card');
      cardDivOne = document.getElementById(pickedCards[0]);
    }


    // ensures the same card isnt picked twice by comparing the card ids
    else if (pickedCards[0] == pickedCards[1]) {
      console.log('You have picked the same card; please pick another card.')
      // removes the repeated card from the arrays
      pickedCards.pop();
      cardColors.pop();

    }
    // executes if the picked card colors match
    else if (cardColors[0] == cardColors[1]) {
      tryCount++;
      console.log('you matched the colors!')
      cardDivTwo = document.getElementById(pickedCards[1]);
      cardDivOne.style.backgroundColor = cardColors[0];
      cardDivTwo.style.backgroundColor = cardColors[1];
      cardDivOne.removeEventListener("click", handleCardClick)
      cardDivTwo.removeEventListener("click", handleCardClick)
      // resets the card picks
      cardDivOne = null;
      cardDivTwo = null;
      pickedCards.pop();
      pickedCards.pop();
      cardColors.pop();
      cardColors.pop();
      winCount += 2;
      // executes if the game is won
      if (winCount >= COLORS.length) {
        // kills event listener so that further clicks have no effect
        // gameContainer.removeEventListener("click", handleCardClick)
        // gameContainer.outerHTML = gameContainer.outerHTML
        // victory message
        setTimeout(() => {
          alert(`YOU WIN! IT TOOK YOU ${tryCount} TRIES REFRESH THE PAGE TO START OVER!!`)
        }, 500);
        // alert('YOU WIN! REFRESH THE PAGE TO START OVER!!')
      }
    }
    // executes if the picked card colors dont match
    else {
      tryCount++;
      cardDivTwo = document.getElementById(pickedCards[1]);
      // shows colors of picked cards
      cardDivOne.style.backgroundColor = cardColors[0];
      cardDivTwo.style.backgroundColor = cardColors[1];
      setTimeout(function () {
        cardDivOne.style.backgroundColor = 'darkgrey';
        cardDivTwo.style.backgroundColor = 'darkgrey';
        // resets the card picks
        cardDivOne = null;
        cardDivTwo = null;
        pickedCards.pop();
        pickedCards.pop();
        cardColors.pop();
        cardColors.pop();
      }, 1000)

      onWait = true
      setTimeout(function () {
        onWait = false;
      }, 1100)
      // alert(`That's not a match! New round begins in 5 seconds!`);
    }
    // you can use event.target to see which element was clicked
    console.log(event);
    console.log("you just clicked", event.target);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
