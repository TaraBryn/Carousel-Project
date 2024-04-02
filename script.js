const carousel = document.querySelector(".carousel");
let slides = Array.from(carousel.children);
const overlay = document.querySelector(".overlay");

let slideIndex = 1;

carousel.innerHTML =
  slides[slides.length - 2].outerHTML +
  slides[slides.length - 1].outerHTML +
  carousel.innerHTML +
  slides[0].outerHTML +
  slides[1].outerHTML; // Duplicate the first and last slides

const images = document.querySelectorAll(".carousel img");
slides = Array.from(carousel.children); // Update the slides array

function translateValue(index) {
  return (
    -slides.reduce((acc, slide, i) => {
      if (i < index) {
        return acc + slide.offsetWidth;
      }
      return acc;
    }, 0) -
    slides[index].offsetWidth / 2
  );
}

translateX = () =>
  (carousel.style.transform = `translateX(${translateValue(slideIndex)}px)`);

function updateSlide() {
  console.log(slideIndex);
  carousel.style.transition = "transform 0.9s ease-in-out";
  slideIndex++;
  translateX();
}

carousel.addEventListener("transitionend", () => {
  if (slideIndex >= slides.length - 3) {
    carousel.style.transition = "none";
    slideIndex = 1;
    translateX();
  }
});

translateX();

images.forEach((image) => {
  image.addEventListener("click", () => {
    overlay.innerHTML = `<button class="overlay-esc">X</button><img src="${image.src}" alt="${image.alt}">`;
    overlay.style.height = "100vh";
    overlay.style.width = "100vw";
    document.querySelector(".overlay-esc").addEventListener("click", () => {
      overlay.style.height = "0";
      overlay.style.width = "0";
    });
  });
});

overlay.addEventListener("transitionend", () => {
  if (overlay.style.height === "0") {
    overlay.innerHTML = "";
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlay.style.height === "100vh") {
    overlay.style.height = "0";
    overlay.style.width = "0";
  }
});

setTimeout(() => {
  updateSlide();
  setInterval(updateSlide, 2000); // Update the slide every half second
}, 2000);
