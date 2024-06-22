let images = [];
let slides = [];
let slideIndex = 0;
let autoScrollTimer;

const imageSliderContainer = document.getElementById("container");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnReload = document.getElementById("btnReload");

function fetchImages(callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        images = JSON.parse(xhr.responseText);
        images = images.ImageList;
        callback();
      } else {
        console.error("Error fetching images:", xhr.status);
      }
    }
  };
  xhr.open("GET", "https://comp125-a4-api.onrender.com/imagelist", true);
  xhr.send();
}

const startAutoScroll = () => {
  stopAutoScroll();
  let currentInterval = images[slideIndex].time;
  autoScrollTimer = setTimeout(() => {
    plusSlides(1);
    startAutoScroll(); // Continue auto scrolling
  }, currentInterval);
};

const stopAutoScroll = () => {
  clearTimeout(autoScrollTimer);
};

const resetAutoScroll = () => {
  stopAutoScroll();
  startAutoScroll();
};

btnPrev.addEventListener("click", () => {
  plusSlides(-1);
});
btnNext.addEventListener("click", () => {
  plusSlides(1);
});
btnReload.addEventListener("click", () => {
  slideIndex = 0;
  fetchImages(() => {
    createGallery();
    resetAutoScroll();
  });
});

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// #region image slider
const showSlides = (n) => {
  let i;
  slides = document.getElementsByClassName("mySlides");
  console.log(slides);
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.add("hideSlide");
  }
  slideIndex = n;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  slides[slideIndex].classList.remove("hideSlide");
};

const plusSlides = (n) => {
  showSlides((slideIndex += n));
  resetAutoScroll();
};

const createGallery = () => {
  removeAllChildNodes(imageSliderContainer);
  images.forEach((item) => {
    let imgDiv = document.createElement("div");
    imgDiv.classList.add("mySlides", "fade");
    let img = document.createElement("img");
    img.src = item.name;
    img.classList.add("image");
    imgDiv.appendChild(img);
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

  showSlides(slideIndex); // Display the first slide
  startAutoScroll();
};

fetchImages(createGallery);
