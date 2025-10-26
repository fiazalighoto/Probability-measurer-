// 🌟 Page Loader Effect
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.8s ease";
    setTimeout(() => (loader.style.display = "none"), 800);
  }, 800);
});

// 🎲 Open Simulation Pages
function openSimulation(page) {
  window.open(page, "_blank");
}

// 🧮 Floating Math Symbols Animation
const symbolsContainer = document.querySelector(".symbols");
const mathSymbols = ["π", "Σ", "√", "∫", "∞", "θ", "λ", "∆", "µ", "φ"];
for (let i = 0; i < 20; i++) {
  const span = document.createElement("span");
  span.textContent = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
  span.style.left = Math.random() * 100 + "%";
  span.style.top = Math.random() * 100 + "%";
  span.style.fontSize = Math.random() * 2 + 1 + "rem";
  span.style.opacity = 0.2 + Math.random() * 0.4;
  span.style.animationDuration = 8 + Math.random() * 6 + "s";
  symbolsContainer.appendChild(span);
}

// ⬆️ Back to Top Button Logic
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 📬 Contact Form Animation (Demo)
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", () => {
    alert("Thank you for your message, Fiaz will get back to you soon!");
    form.reset();
  });
}

// 🌈 Navbar Smooth Scroll Highlight (Optional Enhancement)
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth"
      });
    }
  });
});
