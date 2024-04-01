const carousel = document.querySelector(".carousel");
const slides = Array.from(carousel.children);

let slideIndex = 2;
const slideWidth = slides[0].offsetWidth; // Get the width of a single slide

carousel.innerHTML =
  slides[slides.length - 2].outerHTML +
  slides[slides.length - 1].outerHTML +
  carousel.innerHTML +
  slides[0].outerHTML +
  slides[1].outerHTML; // Duplicate the first and last slides

translateValue = (index) => -index * slideWidth + slideWidth / 2;
translateX = () =>
  (carousel.style.transform = `translateX(${translateValue(slideIndex)}px)`);

function updateSlide() {
  carousel.style.transition = "transform 0.9s ease-in-out";
  slideIndex++;
  translateX();
}

carousel.addEventListener("transitionend", () => {
  if (slideIndex >= slides.length + 2) {
    carousel.style.transition = "none";
    slideIndex = 2;
    translateX();
  }
});

translateX();
setInterval(updateSlide, 2000); // Update the slide every half second
