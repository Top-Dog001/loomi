document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector(".intro");
  const main = document.querySelector(".main-content");

  // Auto close after 6s
  setTimeout(() => {
    intro.style.opacity = "0";
    intro.style.transform = "translateY(-100px)";
    setTimeout(() => {
      intro.style.display = "none";
      document.body.style.overflow = "auto"; // re-enable scroll
      main.style.display = "block"; // show landing
    }, 1000); // wait for fade
  }, 6000);
});

// ================== CAPTIVATOR TEXT ==================
const leftWords = ["Creativity", "Passion", "Energy", "Dreams"];
const rightWords = ["Design", "Innovation", "Impact", "Growth"];
let leftIndex = 0;
let rightIndex = 0;

const leftText = document.querySelector(".changing-text.left");
const rightText = document.querySelector(".changing-text.right");

function changeLeft() {
  if (!leftText) return;
  leftText.style.opacity = 0;
  setTimeout(() => {
    leftIndex = (leftIndex + 1) % leftWords.length;
    leftText.textContent = leftWords[leftIndex];
    leftText.style.opacity = 1;
  }, 500);
}

function changeRight() {
  if (!rightText) return;
  rightText.style.opacity = 0;
  setTimeout(() => {
    rightIndex = (rightIndex + 1) % rightWords.length;
    rightText.textContent = rightWords[rightIndex];
    rightText.style.opacity = 1;
  }, 500);
}

setInterval(changeLeft, 4000);
setInterval(changeRight, 4000);

// ================== SLIDER ==================
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
let current = 0;
let timer;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
  current = index;

  // update about section bg
  updateAboutBg(index);
}

function nextSlide() {
  let newIndex = (current + 1) % slides.length;
  showSlide(newIndex);
}

function prevSlide() {
  let newIndex = (current - 1 + slides.length) % slides.length;
  showSlide(newIndex);
}

function startAutoPlay() {
  timer = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
  clearInterval(timer);
}

// controls
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });
}
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });
}

// ================== ABOUT BG COLOR ==================
const aboutSection = document.querySelector("#about");

const slideColors = [
  "#3b2b1a54", // slide 1 tint (purple)
  "##140a1f", // slide 2 tint (blue)
  "#263e5454", // slide 3 tint (brown)
];

function updateAboutBg(index) {
  if (!aboutSection) return;
  aboutSection.style.transition = "background-color 1s ease";
  aboutSection.style.backgroundColor = slideColors[index];
}

// reset when out of view
if (aboutSection) {
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          aboutSection.style.backgroundColor = "#000";
        }
      });
    },
    { threshold: 0.2 }
  );
  aboutObserver.observe(aboutSection);
}

// ================== SLIDER HOOK ==================
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");

      // update caption text color from dataset
      const caption = slide.querySelector(".caption");
      if (caption) {
        caption.style.transition = "color 1s ease";
        caption.style.color = slide.dataset.text || "#fff";
      }
    }
  });

  current = index;

  // 🔥 sync about bg with active slide
  updateAboutBg(index);
}

// ================== INIT ==================
if (slides.length > 0) {
  showSlide(current);
  startAutoPlay();
}

// ================== VALUES HEADER FADE ==================
const valuesHeader = document.querySelectorAll(".fade-in");

const valuesObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        valuesHeader.forEach((el) => el.classList.add("visible"));
      }
    });
  },
  { threshold: 0.3 }
);

const valuesSection = document.querySelector(".values-header");
if (valuesSection) {
  valuesObserver.observe(valuesSection);
}


document.querySelectorAll('.accordion').forEach(button => {
  button.addEventListener('click', function () {
    const panel = this.nextElementSibling;
    const logoOverlay = panel.querySelector('.logo-overlay');
    const content = panel.querySelector('.service-content');

    this.classList.toggle('active');

    if (this.classList.contains("active")) {
      // expand to fit content
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.paddingTop = "0.5rem";

      // after 6s, show overlay full-screen
      setTimeout(() => {
        if (this.classList.contains("active")) {
          content.style.opacity = "0"; // hide content
          logoOverlay.style.left = "0"; // slide overlay into view
        }
      }, 6000);

      // after 9s, slide overlay back out and restore content
      setTimeout(() => {
        logoOverlay.style.left = "100%"; // slide out
        content.style.opacity = "1"; // restore content
      }, 9000);

    } else {
      // collapse
      panel.style.maxHeight = null;
      panel.style.paddingTop = "0";
      logoOverlay.style.left = "100%"; // reset overlay
      content.style.opacity = "1";
    }
  });
});







document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('cardSlider');
  const slides = Array.from(slider.querySelectorAll('.card'));
  if (!slides.length) {
    console.warn('Slider: no slides found');
    return;
  }

  let current = 0;
  const slideCount = slides.length;
  const delay = 4000; // ms

  // position slides initially
  function updatePositions() {
    slides.forEach((slide, i) => {
      // compute offset relative to current (0 => visible, positive => right, negative => left)
      const offset = (i - current) * 100;
      slide.style.transform = `translateX(${offset}%)`;
      slide.style.opacity = (i === current) ? '1' : '1'; // keep opacity stable; remove if you want fade
      slide.classList.toggle('active', i === current);
    });
  }

  // start values
  updatePositions();

  // autoplay
  let timer = setInterval(() => {
    current = (current + 1) % slideCount;
    updatePositions();
  }, delay);

  // optional: pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = setInterval(() => {
      current = (current + 1) % slideCount;
      updatePositions();
    }, delay);
  });

  // optional: allow manual click to advance
  slider.addEventListener('click', () => {
    // advance on click (useful for mobile)
    clearInterval(timer);
    current = (current + 1) % slideCount;
    updatePositions();
    timer = setInterval(() => {
      current = (current + 1) % slideCount;
      updatePositions();
    }, delay);
  });
});