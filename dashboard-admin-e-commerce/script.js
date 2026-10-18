
const orders = [
  { id: "ORD-1028", name: "Andi Saputra", date: "18 Okt 2026", total: 459000, status: "Selesai" },
  { id: "ORD-1027", name: "Siti Rahma", date: "18 Okt 2026", total: 289000, status: "Diproses" },
  { id: "ORD-1026", name: "Budi Santoso", date: "17 Okt 2026", total: 598000, status: "Selesai" },
  { id: "ORD-1025", name: "Dina Maharani", date: "17 Okt 2026", total: 159000, status: "Diproses" },
  { id: "ORD-1024", name: "Rizky Pratama", date: "16 Okt 2026", total: 349000, status: "Dibatalkan" },
  { id: "ORD-1023", name: "Nadia Putri", date: "16 Okt 2026", total: 478000, status: "Selesai" }
];

const rupiah = value => new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
}).format(value);

document.getElementById("today").textContent =
  new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

function renderOrders() {
  const keyword = document.getElementById("order-search")
    .value.toLowerCase().trim();

  const filtered = orders.filter(order =>
    order.id.toLowerCase().includes(keyword) ||
    order.name.toLowerCase().includes(keyword) ||
    order.status.toLowerCase().includes(keyword)
  );

  document.getElementById("order-table").innerHTML =
    filtered.map(order => {
      let statusClass = "proses";

      if (order.status === "Selesai") statusClass = "selesai";
      if (order.status === "Dibatalkan") statusClass = "batal";

      return `
        <tr>
          <td class="order-id">${order.id}</td>
          <td>${order.name}</td>
          <td>${order.date}</td>
          <td>${rupiah(order.total)}</td>
          <td><span class="status ${statusClass}">${order.status}</span></td>
          <td>
            <button class="action-btn"
              onclick="lihatPesanan('${order.id}')">Detail</button>
          </td>
        </tr>
      `;
    }).join("");

  document.getElementById("order-count").textContent =
    `Menampilkan ${filtered.length} dari ${orders.length} pesanan demo.`;
}

function lihatPesanan(id) {
  const order = orders.find(item => item.id === id);
  if (!order) return;

  alert(
    `Detail Pesanan\n\n` +
    `ID: ${order.id}\n` +
    `Pelanggan: ${order.name}\n` +
    `Tanggal: ${order.date}\n` +
    `Total: ${rupiah(order.total)}\n` +
    `Status: ${order.status}`
  );
}

function exportCSV() {
  const headers = ["ID Pesanan", "Pelanggan", "Tanggal", "Total", "Status"];
  const rows = orders.map(order => [
    order.id, order.name, order.date, order.total, order.status
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(value =>
      `"${String(value).replace(/"/g, '""')}"`
    ).join(","))
    .join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data-pesanan-demo.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function tambahProduk() {
  const name = prompt("Masukkan nama produk baru:");

  if (!name || !name.trim()) return;

  const price = prompt("Masukkan harga produk (angka saja):");
  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    alert("Harga tidak valid.");
    return;
  }

  const formatted = rupiah(numericPrice);

  document.getElementById("product-total").textContent = "249";
  alert(
    `Produk "${name.trim()}" berhasil ditambahkan dalam simulasi.\n` +
    `Harga: ${formatted}\n\n` +
    `Data tidak disimpan ke database dan akan kembali seperti semula saat halaman dimuat ulang.`
  );
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

function logoutDemo() {
  alert("Ini adalah dashboard demo. Tidak ada sesi login yang aktif.");
}

const weeklySales = [
  { label: "Sen", value: 45 },
  { label: "Sel", value: 68 },
  { label: "Rab", value: 52 },
  { label: "Kam", value: 83 },
  { label: "Jum", value: 63 },
  { label: "Sab", value: 100 },
  { label: "Min", value: 75 }
];

const monthlySales = [
  { label: "Minggu 1", value: 58 },
  { label: "Minggu 2", value: 72 },
  { label: "Minggu 3", value: 64 },
  { label: "Minggu 4", value: 100 }
];

function renderChart() {
  const period = document.getElementById("period").value;
  const data = period === "week" ? weeklySales : monthlySales;

  document.getElementById("sales-chart").innerHTML = data.map((item, i) => `
    <div class="bar-group">
      <div class="bar ${i === data.length - 2 ? "highlight" : ""}"
        style="height:${item.value}%"
        title="${item.label}: indeks penjualan ${item.value}">
      </div>
      <span class="bar-label">${item.label}</span>
    </div>
  `).join("");

  document.getElementById("chart-total").textContent =
    period === "week" ? "Rp 8.450.000" : "Rp 24.580.000";
}

document.getElementById("order-search")
  .addEventListener("input", renderOrders);

document.getElementById("period")
  .addEventListener("change", renderChart);

renderOrders();
renderChart();
