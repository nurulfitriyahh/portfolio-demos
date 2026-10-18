
const books = [
  { id: 1, title: "Dasar-Dasar Pemrograman Web", author: "Andi Pratama", category: "Teknologi", available: true, color: "#607c68", symbol: "WEB" },
  { id: 2, title: "Belajar Database Modern", author: "Rina Kurnia", category: "Teknologi", available: true, color: "#7286a4", symbol: "DB" },
  { id: 3, title: "Manajemen Bisnis Digital", author: "Dimas Saputra", category: "Bisnis", available: false, color: "#b28c69", symbol: "BIZ" },
  { id: 4, title: "Seni Berpikir Kreatif", author: "Nadia Putri", category: "Pendidikan", available: true, color: "#a18eaf", symbol: "IDEA" },
  { id: 5, title: "Algoritma dan Struktur Data", author: "Fajar Ramadhan", category: "Teknologi", available: true, color: "#688e9a", symbol: "ALG" },
  { id: 6, title: "Langkah Kecil Hari Ini", author: "Maya Anindita", category: "Novel", available: false, color: "#b77978", symbol: "READ" },
  { id: 7, title: "Strategi UMKM Naik Kelas", author: "Budi Santoso", category: "Bisnis", available: true, color: "#8a9870", symbol: "BIZ" },
  { id: 8, title: "Pengantar Sistem Informasi", author: "Dewi Lestari", category: "Pendidikan", available: true, color: "#8c8eaa", symbol: "SI" }
];

const loans = [
  { id: "PJM-001", member: "Andi Saputra", title: "Dasar-Dasar Pemrograman Web", date: "12 Okt 2026", status: "Dipinjam" },
  { id: "PJM-002", member: "Siti Rahma", title: "Manajemen Bisnis Digital", date: "11 Okt 2026", status: "Terlambat" },
  { id: "PJM-003", member: "Budi Santoso", title: "Belajar Database Modern", date: "10 Okt 2026", status: "Dipinjam" },
  { id: "PJM-004", member: "Dina Maharani", title: "Seni Berpikir Kreatif", date: "09 Okt 2026", status: "Dipinjam" }
];

const borrowed = [];
let nextBookId = 9;

document.getElementById("today").textContent =
  new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

function renderBooks() {
  const keyword = document.getElementById("search").value.toLowerCase().trim();
  const category = document.getElementById("category").value;
  const availability = document.getElementById("availability").value;

  const filtered = books.filter(book => {
    const matchText =
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword);

    const matchCategory =
      category === "Semua" || book.category === category;

    const status = book.available ? "Tersedia" : "Dipinjam";
    const matchAvailability =
      availability === "Semua" || status === availability;

    return matchText && matchCategory && matchAvailability;
  });

  document.getElementById("result-count").textContent =
    `Menampilkan ${filtered.length} dari ${books.length} buku`;

  document.getElementById("empty").hidden = filtered.length > 0;

  document.getElementById("book-grid").innerHTML = filtered.map(book => `
    <article class="book-card">
      <div class="book-cover" style="background:${book.color}">
        <span class="cover-symbol">${book.symbol}</span>
        <span class="cover-number">LIBRA COLLECTION</span>
      </div>
      <div class="book-info">
        <p class="book-category">${book.category}</p>
        <h3>${book.title}</h3>
        <p class="book-author">Oleh ${book.author}</p>
        <div class="book-bottom">
          <span class="availability ${book.available ? "available" : "borrowed"}">
            ${book.available ? "● Tersedia" : "● Dipinjam"}
          </span>
          <button class="borrow-btn"
            onclick="pinjamBuku(${book.id})"
            ${!book.available ? "disabled" : ""}>
            ${book.available ? "Pinjam Buku ↗" : "Tidak Tersedia"}
          </button>
        </div>
      </div>
    </article>
  `).join("");

  updateStats();
}

function updateStats() {
  const borrowedCount = books.filter(book => !book.available).length;

  document.getElementById("total-books").textContent =
    (1250 + Math.max(0, books.length - 8)).toLocaleString("id-ID");

  document.getElementById("borrowed-books").textContent =
    (86 + borrowed.length).toLocaleString("id-ID");

  document.getElementById("late-books").textContent =
    (4 + borrowed.filter(item => item.status === "Terlambat").length).toLocaleString("id-ID");

  document.getElementById("member-highlight").textContent = "324";
}

function pinjamBuku(id) {
  const book = books.find(item => item.id === id);

  if (!book || !book.available) {
    alert("Buku tidak tersedia untuk dipinjam.");
    return;
  }

  const member = prompt("Masukkan nama peminjam:");

  if (!member || !member.trim()) {
    alert("Peminjaman dibatalkan. Nama peminjam harus diisi.");
    return;
  }

  book.available = false;

  const loan = {
    id: `PJM-${String(loans.length + 1).padStart(3, "0")}`,
    member: member.trim(),
    title: book.title,
    date: new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }),
    status: "Dipinjam"
  };

  loans.unshift(loan);
  borrowed.push(loan);

  renderBooks();
  renderLoans();

  alert(`Simulasi peminjaman berhasil!\n\nBuku: ${book.title}\nPeminjam: ${member.trim()}`);
}

function renderLoans() {
  document.getElementById("loan-table").innerHTML = loans.map(loan => `
    <tr>
      <td class="loan-id">${loan.id}</td>
      <td>${loan.member}</td>
      <td>${loan.title}</td>
      <td>${loan.date}</td>
      <td>
        <span class="loan-status ${loan.status === "Terlambat" ? "late" : "active"}">
          ${loan.status}
        </span>
      </td>
    </tr>
  `).join("");
}

function tambahBuku() {
  const title = prompt("Masukkan judul buku:");
  if (!title || !title.trim()) return;

  const author = prompt("Masukkan nama penulis:");
  if (!author || !author.trim()) return;

  const category = prompt(
    "Masukkan kategori: Teknologi, Bisnis, Novel, atau Pendidikan"
  );

  const allowed = ["Teknologi", "Bisnis", "Novel", "Pendidikan"];
  const matched = allowed.find(
    item => item.toLowerCase() === (category || "").trim().toLowerCase()
  );

  if (!matched) {
    alert("Kategori tidak valid.");
    return;
  }

  const colors = ["#607c68", "#7286a4", "#b28c69", "#a18eaf"];

  books.push({
    id: nextBookId++,
    title: title.trim(),
    author: author.trim(),
    category: matched,
    available: true,
    color: colors[Math.floor(Math.random() * colors.length)],
    symbol: matched === "Teknologi" ? "IT" : matched.slice(0, 3).toUpperCase()
  });

  renderBooks();
  alert("Buku berhasil ditambahkan ke katalog demo.");
}

function exportPeminjaman() {
  const header = ["ID", "Peminjam", "Judul Buku", "Tanggal Pinjam", "Status"];

  const rows = loans.map(loan => [
    loan.id, loan.member, loan.title, loan.date, loan.status
  ]);

  const csv = [header, ...rows].map(row =>
    row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")
  ).join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "riwayat-peminjaman-demo.csv";
  link.click();

  URL.revokeObjectURL(url);
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

document.getElementById("search").addEventListener("input", renderBooks);
document.getElementById("category").addEventListener("change", renderBooks);
document.getElementById("availability").addEventListener("change", renderBooks);

renderBooks();
renderLoans();
    