
const initialItems = [
  { code: "BRG-001", name: "Laptop Lenovo ThinkPad", category: "Elektronik", location: "Rak A-01", stock: 12, minimum: 5 },
  { code: "BRG-002", name: "Mouse Wireless Logitech", category: "Elektronik", location: "Rak A-02", stock: 4, minimum: 10 },
  { code: "BRG-003", name: "Keyboard Mechanical", category: "Elektronik", location: "Rak A-03", stock: 18, minimum: 5 },
  { code: "BRG-004", name: "Kertas A4 80 GSM", category: "Perlengkapan Kantor", location: "Rak B-01", stock: 35, minimum: 10 },
  { code: "BRG-005", name: "Kursi Kerja Ergonomis", category: "Furniture", location: "Area C-01", stock: 8, minimum: 3 },
  { code: "BRG-006", name: "Meja Kerja Minimalis", category: "Furniture", location: "Area C-02", stock: 2, minimum: 3 },
  { code: "BRG-007", name: "Printer Epson L3210", category: "Elektronik", location: "Rak A-04", stock: 6, minimum: 2 },
  { code: "BRG-008", name: "Kabel HDMI 2 Meter", category: "Peralatan", location: "Rak D-01", stock: 0, minimum: 5 },
  { code: "BRG-009", name: "Stapler Besar", category: "Perlengkapan Kantor", location: "Rak B-02", stock: 15, minimum: 5 },
  { code: "BRG-010", name: "Obeng Set 12 in 1", category: "Peralatan", location: "Rak D-02", stock: 9, minimum: 3 }
];

let items = initialItems.map(item => ({ ...item }));
let activities = [
  { type: "in", title: "Penerimaan barang", detail: "Keyboard Mechanical · 5 unit masuk", time: "09:30" },
  { type: "out", title: "Pengeluaran barang", detail: "Kertas A4 80 GSM · 3 unit keluar", time: "09:15" },
  { type: "new", title: "Data barang terdaftar", detail: "Printer Epson L3210 ditambahkan", time: "Kemarin" }
];

const $ = id => document.getElementById(id);
const inventoryBody = $("inventoryBody");
const modalBackdrop = $("modalBackdrop");
const itemForm = $("itemForm");

function getStatus(item) {
  if (item.stock === 0) return "empty";
  if (item.stock <= item.minimum) return "low";
  return "safe";
}

function getStatusLabel(status) {
  return { safe: "Stok Aman", low: "Stok Menipis", empty: "Stok Habis" }[status];
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  })[char]);
}

function updateStats() {
  $("totalItems").textContent = items.length;
  $("totalStock").textContent = items.reduce((sum, item) => sum + item.stock, 0);
  $("lowStock").textContent = items.filter(item => getStatus(item) !== "safe").length;
  $("totalCategories").textContent = new Set(items.map(item => item.category)).size;
}

function updateCategoryFilter() {
  const filter = $("categoryFilter");
  const current = filter.value;
  const categories = [...new Set(items.map(item => item.category))].sort();

  filter.innerHTML = '<option value="">Semua kategori</option>' +
    categories.map(category =>
      `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`
    ).join("");

  if (categories.includes(current)) filter.value = current;
}

function renderItems() {
  const query = $("searchInput").value.trim().toLowerCase();
  const category = $("categoryFilter").value;
  const stockFilter = $("stockFilter").value;

  const filtered = items.filter(item => {
    const matchesSearch = [item.name, item.code, item.location]
      .some(value => value.toLowerCase().includes(query));
    const matchesCategory = !category || item.category === category;
    const status = getStatus(item);
    const matchesStock = !stockFilter || status === stockFilter;

    return matchesSearch && matchesCategory && matchesStock;
  });

  inventoryBody.innerHTML = filtered.length
    ? filtered.map(item => {
        const status = getStatus(item);
        return `
          <tr>
            <td><span class="code">${escapeHTML(item.code)}</span></td>
            <td><span class="item-name">${escapeHTML(item.name)}</span>
              <span class="subtext">Min. stok: ${item.minimum} unit</span>
            </td>
            <td><span class="category-pill">${escapeHTML(item.category)}</span></td>
            <td>${escapeHTML(item.location)}</td>
            <td><strong>${item.stock}</strong> unit</td>
            <td><span class="status ${status}">${getStatusLabel(status)}</span></td>
            <td>
              <div class="action-group">
                <button class="action-btn" data-action="in" data-code="${escapeHTML(item.code)}" title="Barang masuk">+ Masuk</button>
                <button class="action-btn out" data-action="out" data-code="${escapeHTML(item.code)}" title="Barang keluar">− Keluar</button>
                <button class="action-btn delete" data-action="delete" data-code="${escapeHTML(item.code)}" title="Hapus barang">×</button>
              </div>
            </td>
          </tr>`;
      }).join("")
    : '<tr><td colspan="7" class="empty-row">Barang tidak ditemukan. Coba kata kunci lain.</td></tr>';

  $("resultCount").textContent = `Menampilkan ${filtered.length} dari ${items.length} barang`;
  updateStats();
}

function renderActivities() {
  $("activityCount").textContent = `${activities.length} aktivitas`;

  $("activityList").innerHTML = activities.length
    ? activities.slice(0, 6).map(activity => `
        <div class="activity-row">
          <div class="activity-icon ${activity.type}">
            ${activity.type === "in" ? "↓" : activity.type === "out" ? "↑" : "+"}
          </div>
          <div class="activity-detail">
            <strong>${escapeHTML(activity.title)}</strong>
            <p>${escapeHTML(activity.detail)}</p>
          </div>
          <span class="activity-time">${escapeHTML(activity.time)}</span>
        </div>
      `).join("")
    : '<p class="subtext">Belum ada aktivitas.</p>';
}

function addActivity(type, title, detail) {
  const now = new Date();
  activities.unshift({
    type,
    title,
    detail,
    time: now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    })
  });
  renderActivities();
}

let toastTimeout;

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600);
}

function openModal() {
  itemForm.reset();
  $("formError").textContent = "";
  modalBackdrop.classList.add("open");
  itemForm.elements.name.focus();
}

function closeModal() {
  modalBackdrop.classList.remove("open");
}

$("today").textContent = new Date().toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});

$("addBtn").addEventListener("click", openModal);
$("closeModal").addEventListener("click", closeModal);
$("cancelBtn").addEventListener("click", closeModal);

modalBackdrop.addEventListener("click", event => {
  if (event.target === modalBackdrop) closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

$("menuToggle").addEventListener("click", () => {
  $("sidebar").classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    $("sidebar").classList.remove("open");
  });
});

$("searchInput").addEventListener("input", renderItems);
$("categoryFilter").addEventListener("change", renderItems);
$("stockFilter").addEventListener("change", renderItems);

itemForm.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(itemForm);
  const code = String(formData.get("code")).trim().toUpperCase();
  const name = String(formData.get("name")).trim();
  const category = String(formData.get("category"));
  const location = String(formData.get("location")).trim();
  const stock = Number(formData.get("stock"));
  const minimum = Number(formData.get("minimum"));

  if (items.some(item => item.code.toLowerCase() === code.toLowerCase())) {
    $("formError").textContent = "Kode barang sudah digunakan. Gunakan kode lain.";
    return;
  }

  if (!name || !code || !category || !location ||
      !Number.isInteger(stock) || stock < 0 ||
      !Number.isInteger(minimum) || minimum < 0) {
    $("formError").textContent = "Periksa kembali data barang yang dimasukkan.";
    return;
  }

  items.unshift({ code, name, category, location, stock, minimum });
  addActivity("new", "Barang baru ditambahkan", `${name} · ${stock} unit`);
  updateCategoryFilter();
  renderItems();
  closeModal();
  showToast("Barang berhasil ditambahkan ke data demo.");
});

inventoryBody.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const item = items.find(row => row.code === button.dataset.code);
  if (!item) return;

  const action = button.dataset.action;

  if (action === "delete") {
    if (!confirm(`Hapus barang "${item.name}" dari data demo?`)) return;

    items = items.filter(row => row.code !== item.code);
    addActivity("out", "Data barang dihapus", item.name);
    updateCategoryFilter();
    renderItems();
    showToast("Barang dihapus dari data demo.");
    return;
  }

  const rawAmount = prompt(
    `${action === "in" ? "Jumlah barang masuk" : "Jumlah barang keluar"} untuk ${item.name}:`,
    "1"
  );

  if (rawAmount === null) return;

  const amount = Number(rawAmount);

  if (!Number.isInteger(amount) || amount <= 0) {
    showToast("Masukkan jumlah berupa bilangan bulat positif.");
    return;
  }

  if (action === "out" && amount > item.stock) {
    showToast("Stok tidak mencukupi untuk pengeluaran tersebut.");
    return;
  }

  if (action === "in") {
    item.stock += amount;
    addActivity("in", "Barang masuk", `${item.name} · ${amount} unit masuk`);
    showToast("Stok barang berhasil ditambahkan.");
  } else {
    item.stock -= amount;
    addActivity("out", "Barang keluar", `${item.name} · ${amount} unit keluar`);
    showToast("Stok barang berhasil dikurangi.");
  }

  renderItems();
});

$("exportBtn").addEventListener("click", () => {
  if (!items.length) {
    showToast("Tidak ada data untuk diekspor.");
    return;
  }

  const headers = ["Kode Barang", "Nama Barang", "Kategori", "Lokasi", "Stok", "Stok Minimum", "Status"];
  const rows = items.map(item => [
    item.code, item.name, item.category, item.location,
    item.stock, item.minimum, getStatusLabel(getStatus(item))
  ]);

  const csvCell = value => `"${String(value).replace(/"/g, '""')}"`;
  const csv = [headers, ...rows]
    .map(row => row.map(csvCell).join(";"))
    .join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data-inventaris.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  showToast("File CSV berhasil dibuat.");
});

updateCategoryFilter();
renderItems();
renderActivities();
