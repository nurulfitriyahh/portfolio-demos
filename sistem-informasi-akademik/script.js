
const students = [
  { name: "Aditya Pratama", nim: "2310101001", prodi: "Sistem Informasi", semester: 5, status: "Aktif", color: "blue" },
  { name: "Siti Rahmawati", nim: "2310201002", prodi: "Informatika", semester: 5, status: "Aktif", color: "purple" },
  { name: "Muhammad Rizky", nim: "2310101003", prodi: "Sistem Informasi", semester: 5, status: "Aktif", color: "green" },
  { name: "Nadia Putri", nim: "2310301004", prodi: "Manajemen", semester: 3, status: "Aktif", color: "orange" },
  { name: "Fajar Ramadhan", nim: "2310401005", prodi: "Akuntansi", semester: 7, status: "Cuti", color: "blue" },
  { name: "Dinda Maharani", nim: "2310201006", prodi: "Informatika", semester: 3, status: "Aktif", color: "purple" }
];

const tableBody = document.getElementById("studentTable");
const searchInput = document.getElementById("searchInput");
const facultyFilter = document.getElementById("facultyFilter");
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const toast = document.getElementById("toast");

let toastTimer;

function initials(name) {
  return name.split(" ").slice(0, 2).map(part => part[0]).join("").toUpperCase();
}

function renderStudents() {
  const query = searchInput.value.trim().toLowerCase();
  const faculty = facultyFilter.value;

  const filtered = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(query) ||
      student.nim.toLowerCase().includes(query);

    const matchesFaculty =
      faculty === "all" || student.prodi === faculty;

    return matchesSearch && matchesFaculty;
  });

  tableBody.innerHTML = filtered.map(student => `
    <tr>
      <td>
        <div class="student-name">
          <span class="student-avatar">${initials(student.name)}</span>
          ${student.name}
        </div>
      </td>
      <td>${student.nim}</td>
      <td>${student.prodi}</td>
      <td>${student.semester}</td>
      <td><span class="status ${student.status === "Aktif" ? "" : "inactive"}">${student.status}</span></td>
    </tr>
  `).join("");

  emptyState.hidden = filtered.length > 0;
  resultCount.textContent = `Menampilkan ${filtered.length} dari ${students.length} mahasiswa`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

searchInput.addEventListener("input", renderStudents);
facultyFilter.addEventListener("change", renderStudents);

document.getElementById("exportButton").addEventListener("click", () => {
  const rows = [...tableBody.querySelectorAll("tr")];

  if (rows.length === 0) {
    showToast("Tidak ada data untuk diekspor.");
    return;
  }

  const headers = ["Nama", "NIM", "Program Studi", "Semester", "Status"];
  const csvRows = [headers, ...rows.map(row =>
    [...row.querySelectorAll("td")].map(cell =>
      cell.innerText.trim().replace(/\s+/g, " ")
    )
  )];

  const csv = "\uFEFF" + csvRows.map(row =>
    row.map(value => `"${value.replace(/"/g, '""')}"`).join(",")
  ).join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "data-mahasiswa-eduspace.csv";
  link.click();

  URL.revokeObjectURL(url);
  showToast("File CSV berhasil dibuat.");
});

const pageInfo = {
  dashboard: {
    title: "Dashboard Akademik",
    subtitle: "Pantau aktivitas akademik kampus dalam satu tempat."
  },
  mahasiswa: {
    title: "Data Mahasiswa",
    subtitle: "Cari dan filter daftar mahasiswa yang terdaftar."
  },
  jadwal: {
    title: "Jadwal Kuliah",
    subtitle: "Ringkasan jadwal perkuliahan dalam demo akademik."
  },
  nilai: {
    title: "Nilai Akademik",
    subtitle: "Lihat ringkasan performa akademik mahasiswa."
  },
  bantuan: {
    title: "Pusat Bantuan",
    subtitle: "Informasi penggunaan sistem akademik."
  }
};

function navigateToPage(page) {
  const info = pageInfo[page];
  if (!info) return;

  document.getElementById("pageTitle").textContent = info.title;
  document.getElementById("pageSubtitle").textContent = info.subtitle;
  document.getElementById("breadcrumbTitle").textContent = info.title;

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.page === page);
  });

  if (page === "mahasiswa") {
    document.getElementById("mahasiswa").scrollIntoView({ behavior: "smooth" });
  } else if (page === "jadwal") {
    document.getElementById("jadwal").scrollIntoView({ behavior: "smooth" });
  } else if (page === "nilai") {
    document.getElementById("nilai").scrollIntoView({ behavior: "smooth" });
  } else if (page === "dashboard") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    showToast("Ini adalah demo pusat bantuan.");
  }

  document.getElementById("sidebar").classList.remove("open");
}

document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    navigateToPage(link.dataset.page);
  });
});

document.getElementById("mobileMenu").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

document.getElementById("notificationButton").addEventListener("click", () => {
  showToast("Tidak ada notifikasi baru.");
});

document.getElementById("todayDate").textContent =
  "Tahun Akademik 2026/2027";

renderStudents();
