
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Dashboard sistem informasi penjualan untuk memantau transaksi dan omzet.">
  <title>Sellora — Sistem Informasi Penjualan</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <aside class="sidebar" id="sidebar">
    <a class="brand" href="#dashboard">
      <span class="brand-mark">S</span>
      <span>sellora<small>SALES MANAGEMENT</small></span>
    </a>

    <p class="nav-label">MENU</p>
    <a class="nav-link active" href="#dashboard"><span>▦</span> Dashboard</a>
    <a class="nav-link" href="#transactions"><span>▤</span> Data Transaksi</a>
    <a class="nav-link" href="#products"><span>▣</span> Produk</a>
    <a class="nav-link" href="#transactions"><span>◷</span> Riwayat Penjualan</a>

    <div class="sidebar-bottom">
      <div class="avatar">AD</div>
      <div><strong>Admin Toko</strong><small>Administrator</small></div>
      <span class="online-dot"></span>
    </div>
  </aside>

  <main class="main" id="dashboard">
    <header class="topbar">
      <div class="topbar-title">
        <button id="menuToggle" class="menu-toggle" aria-label="Buka menu">☰</button>
        <div>
          <p class="eyebrow">RINGKASAN BISNIS</p>
          <h1>Dashboard Penjualan</h1>
        </div>
      </div>
      <div class="topbar-right">
        <div class="date-display"><span>◷</span><span id="today"></span></div>
        <div class="avatar avatar-blue">AD</div>
      </div>
    </header>

    <section class="welcome">
      <div>
        <p>SELAMAT DATANG KEMBALI</p>
        <h2>Pantau penjualan tokomu.</h2>
        <span>Kelola transaksi dan lihat performa bisnis dalam satu dashboard.</span>
      </div>
      <button class="btn btn-white" id="newTransactionTop">＋ Transaksi Baru</button>
      <div class="welcome-decoration">↗</div>
    </section>

    <section class="metrics">
      <article class="metric-card">
        <div class="metric-top"><span>Total Omzet</span><span class="metric-icon purple">Rp</span></div>
        <h2 id="totalRevenue">Rp0</h2>
        <p><span class="metric-caption">Total penjualan demo</span></p>
      </article>
      <article class="metric-card">
        <div class="metric-top"><span>Total Transaksi</span><span class="metric-icon blue">▤</span></div>
        <h2 id="totalTransactions">0</h2>
        <p><span class="metric-caption">Transaksi tercatat</span></p>
      </article>
      <article class="metric-card">
        <div class="metric-top"><span>Produk Terjual</span><span class="metric-icon orange">▣</span></div>
        <h2 id="totalSold">0</h2>
        <p><span class="metric-caption">Unit produk terjual</span></p>
      </article>
      <article class="metric-card">
        <div class="metric-top"><span>Rata-rata Transaksi</span><span class="metric-icon green">↗</span></div>
        <h2 id="averageTransaction">Rp0</h2>
        <p><span class="metric-caption">Nilai rata-rata per transaksi</span></p>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel chart-panel">
        <div class="panel-heading">
          <div><h2>Ringkasan Penjualan</h2><p>Performa omzet berdasarkan tanggal transaksi.</p></div>
          <span class="tag">DATA DEMO</span>
        </div>
        <div class="chart-summary">
          <div><small>Total omzet</small><strong id="chartRevenue">Rp0</strong></div>
          <div class="chart-legend"><span></span> Penjualan</div>
        </div>
        <div class="chart" id="salesChart" aria-label="Grafik penjualan"></div>
        <div class="chart-axis"><span>Awal periode</span><span>Akhir periode</span></div>
      </article>

      <article class="panel payment-panel">
        <div class="panel-heading"><div><h2>Metode Pembayaran</h2><p>Distribusi transaksi berdasarkan metode.</p></div></div>
        <div class="payment-chart-wrap">
          <div class="donut" id="paymentDonut"><div><strong id="paymentCount">0</strong><small>Transaksi</small></div></div>
        </div>
        <div id="paymentLegend" class="payment-legend"></div>
      </article>
    </section>

    <section class="panel transaction-panel" id="transactions">
      <div class="panel-heading transaction-heading">
        <div><h2>Transaksi Terbaru</h2><p>Daftar transaksi penjualan yang tercatat.</p></div>
        <button class="btn btn-primary" id="newTransaction">＋ Tambah Transaksi</button>
      </div>
      <div class="filters">
        <label class="search"><span>⌕</span><input id="searchInput" type="search" placeholder="Cari ID, pelanggan, atau produk..."></label>
        <select id="paymentFilter" aria-label="Filter metode pembayaran">
          <option value="">Semua pembayaran</option>
          <option value="Tunai">Tunai</option>
          <option value="Transfer Bank">Transfer Bank</option>
          <option value="QRIS">QRIS</option>
          <option value="E-Wallet">E-Wallet</option>
        </select>
        <input id="dateFilter" type="date" aria-label="Filter tanggal transaksi">
        <button class="btn btn-outline" id="resetFilters">Reset</button>
        <button class="btn btn-outline" id="exportBtn">↓ CSV</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>ID TRANSAKSI</th><th>TANGGAL</th><th>PELANGGAN</th>
            <th>PRODUK</th><th>JUMLAH</th><th>PEMBAYARAN</th><th>TOTAL</th><th>STATUS</th>
          </tr></thead>
          <tbody id="transactionBody"></tbody>
        </table>
      </div>
      <div class="table-footer"><span id="resultCount">Menampilkan 0 transaksi</span><span>Data simulasi · Bukan transaksi nyata</span></div>
    </section>

    <section class="panel product-panel" id="products">
      <div class="panel-heading"><div><h2>Produk Terlaris</h2><p>Produk berdasarkan jumlah unit terjual.</p></div><span class="tag">TOP PRODUCTS</span></div>
      <div id="topProducts" class="top-products"></div>
    </section>

    <footer><span>© 2026 Sellora Sales Management</span><span>Demo website untuk portofolio</span></footer>
  </main>

  <div class="backdrop" id="formBackdrop">
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="formTitle">
      <div class="modal-heading">
        <div><p class="eyebrow">INPUT PENJUALAN</p><h2 id="formTitle">Tambah Transaksi</h2></div>
        <button type="button" class="close-btn" id="closeModal" aria-label="Tutup">×</button>
      </div>
      <form id="transactionForm">
        <label>Nama pelanggan<input name="customer" required maxlength="80" placeholder="Nama pelanggan"></label>
        <label>Produk
          <select name="product" id="productSelect" required>
            <option value="">Pilih produk</option>
          </select>
        </label>
        <div class="form-row">
          <label>Jumlah unit<input name="quantity" type="number" min="1" max="10000" value="1" required></label>
          <label>Metode pembayaran
            <select name="payment" required>
              <option value="Tunai">Tunai</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="QRIS">QRIS</option>
              <option value="E-Wallet">E-Wallet</option>
            </select>
          </label>
        </div>
        <div class="total-preview"><span>Estimasi total transaksi</span><strong id="formTotal">Rp0</strong></div>
        <p class="form-error" id="formError"></p>
        <div class="modal-actions">
          <button type="button" class="btn btn-outline" id="cancelModal">Batal</button>
          <button type="submit" class="btn btn-primary">Simpan Transaksi</button>
        </div>
      </form>
    </section>
  </div>
  <div id="toast" class="toast" role="status"></div>
</body>
</html>
