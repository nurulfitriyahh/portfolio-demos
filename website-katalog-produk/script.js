
const products = [
  {
    id: 1,
    name: "Essential Tote Bag",
    category: "Aksesori",
    price: 129000,
    color: "#89977c",
    symbol: "T"
  },
  {
    id: 2,
    name: "Classic Oversized Tee",
    category: "Fashion",
    price: 159000,
    color: "#c5a995",
    symbol: "F"
  },
  {
    id: 3,
    name: "Minimalist Backpack",
    category: "Aksesori",
    price: 289000,
    color: "#8b9ba0",
    symbol: "B"
  },
  {
    id: 4,
    name: "Everyday Hoodie",
    category: "Fashion",
    price: 249000,
    color: "#aaa0bd",
    symbol: "H"
  },
  {
    id: 5,
    name: "Ceramic Daily Mug",
    category: "Lifestyle",
    price: 89000,
    color: "#c9a66b",
    symbol: "M"
  },
  {
    id: 6,
    name: "Urban Sling Bag",
    category: "Aksesori",
    price: 179000,
    color: "#a5a58b",
    symbol: "S"
  }
];

let cart = [];

const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const resultCount = document.getElementById("result-count");
const emptyMessage = document.getElementById("empty");

function formatRupiah(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(price);
}

function renderProducts() {
  const keyword = searchInput.value.toLowerCase().trim();
  const category = categorySelect.value;
  const sort = sortSelect.value;

  let filtered = products.filter(product => {
    const matchName = product.name.toLowerCase().includes(keyword);
    const matchCategory =
      category === "Semua" || product.category === category;

    return matchName && matchCategory;
  });

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  resultCount.textContent = `${filtered.length} produk tersedia`;
  emptyMessage.hidden = filtered.length !== 0;

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-visual" style="background:${product.color}">
        <span>${product.symbol}</span>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <span class="price">${formatRupiah(product.price)}</span>
          <button class="add-btn" onclick="tambahKeranjang(${product.id})">
            + Tambah
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function tambahKeranjang(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  cart.push(product);
  document.getElementById("cart-count").textContent = cart.length;
  alert(`${product.name} ditambahkan ke keranjang demo.`);
}

function lihatKeranjang() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const names = cart.map(item => item.name).join("\n");

  alert(
    `Isi keranjang:\n${names}\n\n` +
    `Jumlah barang: ${cart.length}\n` +
    `Total: ${formatRupiah(total)}\n\n` +
    `Ini simulasi katalog, belum melakukan pembayaran.`
  );
}

searchInput.addEventListener("input", renderProducts);
categorySelect.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);

renderProducts();
