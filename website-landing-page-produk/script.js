
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const orderButton = document.getElementById("orderButton");
const toast = document.getElementById("toast");
const closeToast = document.getElementById("closeToast");

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// FAQ accordion
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");

    button.setAttribute("aria-expanded", String(isOpen));
  });
});

// Demo order notification
let toastTimeout;

function showDemoToast() {
  toast.classList.add("show");
  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}

orderButton.addEventListener("click", showDemoToast);

closeToast.addEventListener("click", () => {
  toast.classList.remove("show");
  clearTimeout(toastTimeout);
});

// Close notification with Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toast.classList.remove("show");
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }
});
