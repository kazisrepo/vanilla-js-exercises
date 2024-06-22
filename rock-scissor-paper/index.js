let computerWinCount = 0;
let playerWinCount = 0;
let result = "";
let noOfTimesPlayed = 0;
const resultWindow = document.querySelector(".result");

function getComputerChoice() {
  const choiceString = ["Rock", "Scissor", "Paper"];
  const minIndex = 0;
  const maxIndex = choiceString.length - 1;
  const indexChosen = Math.floor(
    Math.random() * (maxIndex - minIndex + 1) + minIndex
  );

  //console.log(`min ${minIndex} ; max: ${maxIndex} ; chosenIndex: ${indexChosen}`);

  return choiceString[indexChosen];
}

function playGame(playerSelection, computerSelection) {
  const playerSel = playerSelection.toLowerCase();
  const computerSel = computerSelection.toLowerCase();

  if (playerSel == "rock") {
    if (computerSel == "paper") {
      computerWinCount++;
      return "You Lose! Paper beats Rock.";
    } else if (computerSel == "scissor") {
      playerWinCount++;
      return "You win! Rock beats Scissor.";
    } else {
      return "Draw! Play again";
    }
  } else if (playerSel == "paper") {
    if (computerSel == "rock") {
      playerWinCount++;
      return "You Win! Paper beats Rock.";
    } else if (computerSel == "scissor") {
      computerWinCount++;
      return "You Lose! Scissor beats Paper.";
    } else return "Draw! Play again";
  } else {
    if (computerSel == "rock") {
      computerWinCount++;
      return "You Lose! Rock beats Scissor.";
    } else if (computerSel == "Paper") {
      playerWinCount++;
      return "You Win! Scissor beats Paper.";
    } else return "Draw! Play again";
  }
}

function game(playerSel) {
  noOfTimesPlayed++;

  //const playerSel = prompt("Enter your choice (Rock/Paper/Scissor) ");
  const compSel = getComputerChoice();
  resultWindow.innerHTML += `Round ${noOfTimesPlayed}; You-${playerSel};Computer-${compSel}; ${playGame(
    playerSel,
    compSel
  )} <br>`;

  if (playerWinCount == 5 || computerWinCount == 5) {
    if (playerWinCount > computerWinCount) {
      resultWindow.innerHTML += `<h1>Finally player wins. Player-${playerWinCount}; Computer-${computerWinCount}</h1>`;
    } else {
      resultWindow.innerHTML += `<h1>Finally computer wins. Computer-${computerWinCount}; Player-${playerWinCount}</h1>`;
    }
  }

  /*else if (playerWinCount < computerWinCount) {
    console.log(
      `Finally computer wins. Player-${playerWinCount}; Computer-${computerWinCount}`
    );
  } else
    console.log(
      `It's a draw finally. Player-${playerWinCount}; Computer-${computerWinCount}`
    );*/
}

//console.log(game());

const buttonRock = document.querySelector("#btnRock");
buttonRock.addEventListener("click", () => {
  game("rock");
});
const buttonScissor = document.querySelector("#btnScissor");
buttonScissor.addEventListener("click", () => {
  game("scissor");
});

const buttonPaper = document.querySelector("#btnPaper");
buttonPaper.addEventListener("click", () => {
  game("paper");
});
