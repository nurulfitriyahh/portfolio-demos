
const $ = id => document.getElementById(id);

const products = [
  { id: "P001", name: "Kaos Basic Premium", price: 85000, icon: "👕" },
  { id: "P002", name: "Hoodie Essential", price: 175000, icon: "🧥" },
  { id: "P003", name: "Totebag Canvas", price: 45000, icon: "👜" },
  { id: "P004", name: "Topi Casual", price: 55000, icon: "🧢" },
  { id: "P005", name: "Kemeja Oversize", price: 135000, icon: "👔" },
  { id: "P006", name: "Kaos Graphic", price: 99000, icon: "🎨" }
];

const dateOffset = days => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const initialTransactions = [
  { id: "TRX-1001", date: dateOffset(0), customer: "Andi Saputra", productId: "P001", quantity: 2, payment: "QRIS" },
  { id: "TRX-1002", date: dateOffset(0), customer: "Siti Rahma", productId: "P002", quantity: 1, payment: "Transfer Bank" },
  { id: "TRX-1003", date: dateOffset(-1), customer: "Budi Pratama", productId: "P003", quantity: 3, payment: "Tunai" },
  { id: "TRX-1004", date: dateOffset(-1), customer: "Dina Putri", productId: "P006", quantity: 2, payment: "E-Wallet" },
  { id: "TRX-1005", date: dateOffset(-2), customer: "Rizky Maulana", productId: "P005", quantity: 1, payment: "QRIS" },
  { id: "TRX-1006", date: dateOffset(-3), customer: "Nadia Aulia", productId: "P001", quantity: 4, payment: "Transfer Bank" },
  { id: "TRX-1007", date: dateOffset(-4), customer: "Fajar Hidayat", productId: "P004", quantity: 2, payment: "Tunai" },
  { id: "TRX-1008", date: dateOffset(-5), customer: "Putri Ananda", productId: "P002", quantity: 1, payment: "QRIS" },
  { id: "TRX-1009", date: dateOffset(-6), customer: "Dimas Akbar", productId: "P003", quantity: 2, payment: "E-Wallet" },
  { id: "TRX-1010", date: dateOffset(-6), customer: "Maya Salsabila", productId: "P006", quantity: 1, payment: "Tunai" }
];

let transactions = initialTransactions.map(item => ({ ...item }));
const paymentColors = {
  "Tunai": "#f1b45f",
  "Transfer Bank": "#4ba8df",
  "QRIS": "#6558df",
  "E-Wallet": "#43bf93"
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  })[char]);
}

function rupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

function getProduct(id) {
  return products.find(product => product.id === id);
}

function transactionTotal(transaction) {
  return getProduct(transaction.productId).price * transaction.quantity;
}

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function visibleTransactions() {
  const query = $("searchInput").value.trim().toLowerCase();
  const payment = $("paymentFilter").value;
  const date = $("dateFilter").value;

  return transactions.filter(transaction => {
    const product = getProduct(transaction.productId);
    const matchesQuery = [
      transaction.id, transaction.customer, product.name
    ].some(value => value.toLowerCase().includes(query));

    return matchesQuery &&
      (!payment || transaction.payment === payment) &&
      (!date || transaction.date === date);
  });
}

function renderStats() {
  const revenue = transactions.reduce((sum, item) => sum + transactionTotal(item), 0);
  const units = transactions.reduce((sum, item) => sum + item.quantity, 0);
  const count = transactions.length;
  const average = count ? revenue / count : 0;

  $("totalRevenue").textContent = rupiah(revenue);
  $("totalTransactions").textContent = count;
  $("totalSold").textContent = units;
  $("averageTransaction").textContent = rupiah(average);
  $("chartRevenue").textContent = rupiah(revenue);
  $("paymentCount").textContent = count;
}

function renderTransactions() {
  const filtered = visibleTransactions();

  $("transactionBody").innerHTML = filtered.length
    ? filtered.map(transaction => {
        const product = getProduct(transaction.productId);
        return `
          <tr>
            <td><span class="transaction-id">${escapeHTML(transaction.id)}</span></td>
            <td>${formatDate(transaction.date)}</td>
            <td><span class="customer-name">${escapeHTML(transaction.customer)}</span>
              <span class="customer-sub">Pelanggan</span>
            </td>
            <td>${escapeHTML(product.name)}</td>
            <td>${transaction.quantity} unit</td>
            <td><span class="payment-pill">${escapeHTML(transaction.payment)}</span></td>
            <td><strong>${rupiah(transactionTotal(transaction))}</strong></td>
            <td><span class="status">Selesai</span></td>
          </tr>`;
      }).join("")
    : '<tr><td colspan="8" class="empty-row">Tidak ada transaksi yang cocok dengan filter.</td></tr>';

  $("resultCount").textContent = `Menampilkan ${filtered.length} dari ${transactions.length} transaksi`;
}

function renderChart() {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = dateOffset(index - 6);
    const total = transactions
      .filter(transaction => transaction.date === date)
      .reduce((sum, transaction) => sum + transactionTotal(transaction), 0);

    return { date, total };
  });

  const max = Math.max(...days.map(day => day.total), 1);

  $("salesChart").innerHTML = days.map(day => {
    const height = Math.max(day.total ? (day.total / max) * 100 : 3, 3);
    const label = new Date(`${day.date}T12:00:00`)
      .toLocaleDateString("id-ID", { day: "2-digit", month: "short" });

    return `
      <div class="chart-column">
        <div class="chart-bar" style="height:${height}%" data-value="${escapeHTML(rupiah(day.total))}" title="${escapeHTML(label)}: ${escapeHTML(rupiah(day.total))}"></div>
        <span class="chart-label">${escapeHTML(label)}</span>
      </div>`;
  }).join("");
}

function renderPayments() {
  const counts = Object.keys(paymentColors).map(payment => ({
    payment,
    count: transactions.filter(item => item.payment === payment).length
  }));

  const total = transactions.length;
  let running = 0;
  const segments = counts.map(item => {
    const share = total ? item.count / total * 100 : 0;
    const start = running;
    running += share;
    return `${paymentColors[item.payment]} ${start}% ${running}%`;
  });

  $("paymentDonut").style.background = total
    ? `conic-gradient(${segments.join(", ")})`
    : "#e9eaf2";

  $("paymentLegend").innerHTML = counts.map(item => `
    <div class="legend-row">
      <span class="legend-dot" style="background:${paymentColors[item.payment]}"></span>
      <span>${escapeHTML(item.payment)}</span>
      <strong>${total ? Math.round(item.count / total * 100) : 0}%</strong>
    </div>
  `).join("");
}

function renderTopProducts() {
  const summary = products.map(product => {
    const sold = transactions
      .filter(transaction => transaction.productId === product.id)
      .reduce((sum, transaction) => sum + transaction.quantity, 0);

    return { ...product, sold };
  }).sort((a, b) => b.sold - a.sold).slice(0, 3);

  $("topProducts").innerHTML = summary.map(product => `
    <article class="top-product">
      <div class="product-symbol">${product.icon}</div>
      <div><strong>${escapeHTML(product.name)}</strong>
        <small>${product.sold} unit terjual</small>
      </div>
    </article>
  `).join("");
}

function renderAll() {
  renderStats();
  renderTransactions();
  renderChart();
  renderPayments();
  renderTopProducts();
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function openModal() {
  $("transactionForm").reset();
  $("formError").textContent = "";
  updateFormTotal();
  $("formBackdrop").classList.add("open");
}

function closeModal() {
  $("formBackdrop").classList.remove("open");
}

function updateFormTotal() {
  const product = getProduct($("productSelect").value);
  const quantity = Number($("transactionForm").elements.quantity.value) || 0;
  $("formTotal").textContent = product && quantity > 0
    ? rupiah(product.price * quantity)
    : rupiah(0);
}

$("today").textContent = new Date().toLocaleDateString("id-ID", {
  weekday: "long", day: "numeric", month: "long", year: "numeric"
});

$("productSelect").innerHTML = '<option value="">Pilih produk</option>' +
  products.map(product =>
    `<option value="${product.id}">${escapeHTML(product.name)} — ${rupiah(product.price)}</option>`
  ).join("");

$("newTransaction").addEventListener("click", openModal);
$("newTransactionTop").addEventListener("click", openModal);
$("closeModal").addEventListener("click", closeModal);
$("cancelModal").addEventListener("click", closeModal);

$("formBackdrop").addEventListener("click", event => {
  if (event.target === $("formBackdrop")) closeModal();
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

$("productSelect").addEventListener("change", updateFormTotal);
$("transactionForm").elements.quantity.addEventListener("input", updateFormTotal);

$("transactionForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = $("transactionForm");
  const data = Object.fromEntries(new FormData(form).entries());
  const quantity = Number(data.quantity);
  const product = getProduct(data.product);

  if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10000) {
    $("formError").textContent = "Periksa produk dan jumlah unit yang dimasukkan.";
    return;
  }

  const id = `TRX-${1001 + Math.max(0, ...transactions.map(item => Number(item.id.slice(4)) - 1000))}`;

  transactions.unshift({
    id,
    date: dateOffset(0),
    customer: data.customer.trim(),
    productId: product.id,
    quantity,
    payment: data.payment
  });

  closeModal();
  renderAll();
  showToast(`Transaksi ${id} berhasil ditambahkan ke data demo.`);
});

["searchInput", "paymentFilter", "dateFilter"].forEach(id => {
  $(id).addEventListener(id === "searchInput" ? "input" : "change", renderTransactions);
});

$("resetFilters").addEventListener("click", () => {
  $("searchInput").value = "";
  $("paymentFilter").value = "";
  $("dateFilter").value = "";
  renderTransactions();
});

$("exportBtn").addEventListener("click", () => {
  const data = visibleTransactions();

  if (!data.length) {
    showToast("Tidak ada transaksi untuk diekspor.");
    return;
  }

  const headers = ["ID Transaksi", "Tanggal", "Pelanggan", "Produk", "Jumlah", "Metode Pembayaran", "Total"];
  const rows = data.map(transaction => [
    transaction.id,
    transaction.date,
    transaction.customer,
    getProduct(transaction.productId).name,
    transaction.quantity,
    transaction.payment,
    transactionTotal(transaction)
  ]);

  const cell = value => `"${String(value).replace(/"/g, '""')}"`;
  const csv = [headers, ...rows].map(row => row.map(cell).join(";")).join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "laporan-penjualan.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  showToast("Laporan CSV berhasil dibuat.");
});

renderAll();
