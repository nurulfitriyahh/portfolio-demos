
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu" : "Buka menu"
  );
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
  });
});

document.getElementById("contact-form").addEventListener("submit", event => {
  event.preventDefault();

  const form = event.currentTarget;
  const name = document.getElementById("name").value.trim();
  const service = document.getElementById("service").value;

  if (!form.reportValidity()) return;

  alert(
    `Terima kasih, ${name}!\n\n` +
    `Pilihan layanan: ${service}\n` +
    `Pesan demo berhasil divalidasi.\n\n` +
    `Catatan: pesan ini belum dikirim ke email atau server.`
  );

  form.reset();
});
