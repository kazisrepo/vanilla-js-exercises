/**
 * Project : Odin Etch a Sketch
 * Date: August 31st, 2023
 * Developer: Kazi Islam
 * Note:
 * You may find some duplicate code or different approaches in different places to handle something.
 * I tried to implement whatever I learnt so far.
 * I also tried with a dynamic width and height of the grid area, instead of fixed width
 * when user resize the window and the grid gets resized as well
 */

const gridContainer = document.querySelector("#gridContainer");
const btnGridLength = document.getElementById("btnGridLength");
const inputRangeSlider = document.getElementById("inputRangeSlider");
const lblGridSize = document.getElementById("lblGridLength");
const lblGridSizeRepeat = document.getElementById("lblGridLengthRepeat");
const btnCreateGrid = document.getElementById("btnCreateGrid");
const btnClearGrid = document.getElementById("btnClearGrid");

let gridDivs = [];
let penColor = "";

//#region Private functions
let enterLengthManually = () => {
  let gridLength = prompt("Please enter the grid length");
  if (isPositiveInteger(gridLength)) {
    if (isNumberWithinRange(parseInt(gridLength), 1, 100)) {
      //console.log(gridLength);
      lblGridSize.textContent = gridLength;
      lblGridSizeRepeat.textContent = gridLength;
      inputRangeSlider.value = gridLength;
    } else {
      alert("Please enter a number between 1 to 100");
    }
  } else {
    alert("Please enter a valid number between 1 to 100");
  }
};

let changeLabel = () => {
  lblGridSize.textContent = inputRangeSlider.value;
  lblGridSizeRepeat.textContent = inputRangeSlider.value;
};

function changeColor() {
  if (document.getElementById("rdoSingleColor").checked) {
    penColor = document.getElementById("colorCode").value;
  } else if (document.getElementById("rdoMultiColor").checked) {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    penColor = `rgb(${r}, ${g}, ${b})`;
  }

  this.style.backgroundColor = penColor;
}

function cleanGrid() {
  gridContainer.replaceChildren();
}

// this checks if the number falls between a min and max range
function isNumberWithinRange(number, min, max) {
  return number >= min && number <= max;
}

// finds any value is a positive ineteger or not
function isPositiveInteger(anyValue) {
  if (isNaN(anyValue)) return false;
  let number = Number(anyValue);
  if (!Number.isInteger(number)) return false; // checks for integer
  //if(!(number === Math.floor(number))) return false; // also checks for integer
  if (number < 0) return false;

  return true;
}

// this function captures the grid area and reset sizes of grid square
function setGridContainerArea() {
  gridContainer.style.height = `${gridContainer.clientWidth}px`;

  if (gridDivs.length > 0) {
    gridDivs.forEach((element) => {
      element.style.width =
        gridContainer.clientWidth / parseInt(lblGridSize.textContent) -
        1 +
        "px";
      element.style.height = element.style.width;
    });
  }
}

// this function validates the length of the grid and create the grid
function createGrid() {
  cleanGrid();
  let gridLength = parseInt(lblGridSize.textContent);
  if (gridLength === 0) {
    alert("Please enter a valid grid length");
    return;
  }

  // 1px deducted due to border occupancy
  let gridBoxWidth = gridContainer.clientWidth / gridLength - 1;

  //console.log("Grid container clientwidth: " + gridContainer.clientWidth);

  // square of a number:  x = Math.pow(number, power), x = x ** 2,
  // but simple multiplication is the fastest
  for (let i = 0; i < gridLength * gridLength; i++) {
    const div = document.createElement("div");
    div.classList.add("box");
    div.style.width = `${gridBoxWidth}px`;
    div.style.height = `${gridBoxWidth}px`;

    div.addEventListener("mousemove", changeColor);

    gridDivs.push(div);
    gridContainer.appendChild(div);
  }
}

//#endregion

//#region Event handling

// Event handler when user enters the grid length manually
btnGridLength.addEventListener("click", enterLengthManually);

// Event handler when user enters the grid length with input range slider
inputRangeSlider.addEventListener("input", changeLabel); // this may not work on IE
inputRangeSlider.addEventListener("change", changeLabel); // this should work on IE as well

btnCreateGrid.addEventListener("click", createGrid);
btnClearGrid.addEventListener("click", cleanGrid);

window.addEventListener("resize", setGridContainerArea);
window.addEventListener("load", setGridContainerArea);

//#endregion
