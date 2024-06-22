let imageFiles = [
  "images/image01.jpg",
  "images/image02.jpg",
  "images/image03.jpg",
  "images/image04.jpg",
  "images/image05.jpg",
  "images/image06.jpg",
  "images/image07.jpg",
  "images/image08.jpg",
];

let imageCaptions = [
  "Caption 1",
  "Caption 2",
  "Caption 3",
  "Caption 4",
  "Caption 5",
  "Caption 6",
  "Caption 7",
  "Caption 8",
];

let favoriteItems = [];
let isEventAttached = false;
let imageSrcString = "";

const btnAdd = document.getElementById("addToFavorite");
const btnRemove = document.getElementById("removeFromFavorite");
const favItemDiv = document.getElementById("favItemDiv");
const imageSliderContainer = document.getElementById("container");

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// #region image slider
let slideIndex = 1;
const showSlides = (n) => {
  let i;

  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
};
const plusSlides = (n) => {
  showSlides((slideIndex += n));
};
const currentSlide = (n) => {
  showSlides((slideIndex = n));
};
const createGallery = () => {
  let caption = 0;

  removeAllChildNodes(imageSliderContainer);
  imageFiles.forEach((item) => {
    let imgDiv = document.createElement("div");
    imgDiv.classList.add("mySlides", "fade");
    let img = document.createElement("img");
    img.src = item;
    img.classList.add("imageFile");
    img.addEventListener(
      "click",
      () => {
        openBiggerImage(item, false);
      },
      false
    );
    let capDiv = document.createElement("div");
    capDiv.classList.add("text");
    capDiv.innerHTML = imageCaptions[caption];
    caption++;

    imgDiv.appendChild(img);
    imgDiv.appendChild(capDiv);
    imageSliderContainer.appendChild(imgDiv);
  });

  let prevAnchor = document.createElement("a");
  let nextAnchor = document.createElement("a");
  prevAnchor.classList.add("prev");
  prevAnchor.addEventListener("click", () => {
    plusSlides(-1);
  });
  prevAnchor.innerHTML = "&#10094;";
  nextAnchor.classList.add("next");
  nextAnchor.addEventListener("click", () => {
    plusSlides(1);
  });
  nextAnchor.innerHTML = "&#10095;";

  imageSliderContainer.appendChild(prevAnchor);
  imageSliderContainer.appendChild(nextAnchor);
};
createGallery();
showSlides(slideIndex);

//#endregion
const populateFavList = () => {
  console.log("start populate favlist: ", favoriteItems);
  if (favoriteItems.length > 0) {
    removeAllChildNodes(favItemDiv);
    for (let i = 0; i < favoriteItems.length; i++) {
      let imgFile = favoriteItems[i];

      let imgDiv = document.createElement("div");
      imgDiv.classList = "favImgDiv";

      let favImageAnchor = document.createElement("a");
      favImageAnchor.href = "#";
      favImageAnchor.addEventListener("click", () => {
        openBiggerImage(imgFile, true);
      });
      let imageFile = document.createElement("img");
      imageFile.src = imgFile;
      favImageAnchor.appendChild(imageFile);
      imgDiv.appendChild(favImageAnchor);
      favItemDiv.appendChild(imgDiv);
    }
  }

  console.log("end populate favlist: ", favoriteItems);
};

const openBiggerImage = (imgFile, isFavWindow) => {
  btnAdd.style.display = isFavWindow ? "none" : "inline";
  btnRemove.style.display = isFavWindow ? "inline" : "none";

  //btnRemove.onclick = removeFromFavorite(imgFile);
  imageSrcString = imgFile;

  document.getElementById("biggerview").src = imgFile;
  document.getElementById("bigImageContainer").style.display = "block";
  document.getElementById("overlay").style.display = "block";
};

const addToFavorite = () => {
  if (favoriteItems.length < 5) {
    if (favoriteItems.includes(imageSrcString)) {
      alert("Item already exists.");
    } else {
      favoriteItems.push(imageSrcString);
      populateFavList();
      alert("Item is added to favorite.");
    }
  } else {
    alert("Maximum 5 items allowed in favorite. Delete one to add a new one.");
  }
};
function removeFromFavorite() {
  if (favoriteItems.includes(imageSrcString)) {
    favoriteItems.splice(favoriteItems.indexOf(imageSrcString), 1);
    populateFavList();
    alert("Item is removed. You may close the window.");
  } else {
    alert("Item does not exist.");
  }
}

btnAdd.removeEventListener("click", addToFavorite, false);
btnAdd.addEventListener("click", addToFavorite, false);
btnRemove.removeEventListener("click", removeFromFavorite, false);
btnRemove.addEventListener("click", removeFromFavorite, false);

// Function to close the popup
function closeBiggerImage() {
  imageSrcString = "";
  document.getElementById("bigImageContainer").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// #region slideshow

// Next/previous controls

// #endregion
