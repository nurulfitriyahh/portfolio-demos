
const navMenu = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");
const orderForm = document.getElementById("orderForm");
const serviceSelect = document.getElementById("serviceSelect");
const packageSelect = document.getElementById("packageSelect");
const summaryBackdrop = document.getElementById("summaryBackdrop");
const summaryContent = document.getElementById("summaryContent");
const toast = document.getElementById("toast");

const packagePrices = {
  Starter: 150000,
  Professional: 350000,
  Business: 750000
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  });
});

document.querySelectorAll(".choose-package").forEach(button => {
  button.addEventListener("click", () => {
    packageSelect.value = button.dataset.package;
    document.getElementById("pesan").scrollIntoView({ behavior: "smooth" });
    showToast(`Paket ${button.dataset.package} dipilih. Lengkapi formulir pemesanan.`);
  });
});

function closeSummary() {
  summaryBackdrop.classList.remove("open");
}

function showSummary(data) {
  const price = packagePrices[data.package];

  summaryContent.innerHTML = `
    <div class="summary-row"><span>Nama</span><strong>${escapeHTML(data.name)}</strong></div>
    <div class="summary-row"><span>Email</span><strong>${escapeHTML(data.email)}</strong></div>
    <div class="summary-row"><span>WhatsApp</span><strong>${escapeHTML(data.phone)}</strong></div>
    <div class="summary-row"><span>Layanan</span><strong>${escapeHTML(data.service)}</strong></div>
    <div class="summary-row"><span>Paket</span><strong>${escapeHTML(data.package)}</strong></div>
    <div class="summary-row brief-row"><span>Brief desain</span><strong>${escapeHTML(data.brief)}</strong></div>
    <div class="summary-row"><span>Estimasi harga</span><strong class="summary-total">${formatRupiah(price)}</strong></div>
  `;

  summaryBackdrop.classList.add("open");
}

orderForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!orderForm.reportValidity()) return;

  const data = Object.fromEntries(new FormData(orderForm).entries());

  if (!Object.hasOwn(packagePrices, data.package)) {
    showToast("Silakan pilih paket yang tersedia.");
    return;
  }

  showSummary(data);
});

document.getElementById("closeSummary").addEventListener("click", closeSummary);

document.getElementById("editOrder").addEventListener("click", closeSummary);

summaryBackdrop.addEventListener("click", event => {
  if (event.target === summaryBackdrop) closeSummary();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeSummary();
});

document.getElementById("confirmOrder").addEventListener("click", () => {
  closeSummary();
  orderForm.reset();
  showToast("Simulasi pemesanan selesai. Tidak ada data yang dikirim.");
});
