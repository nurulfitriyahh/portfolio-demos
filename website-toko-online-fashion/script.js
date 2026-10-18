
const products = [
  {
    id: 1, name: "Essential Boxy Tee", category: "tops",
    price: 189000, tag: "BEST SELLER",
    image: "photo-1521572163474-6864f9cf17ab"
  },
  {
    id: 2, name: "Relaxed Linen Shirt", category: "tops",
    price: 329000, tag: "NEW",
    image: "photo-1598033129183-c4f50c736f10"
  },
  {
    id: 3, name: "Everyday Overshirt", category: "outerwear",
    price: 459000, tag: "ESSENTIAL",
    image: "photo-1591047139829-d91aecb6caea"
  },
  {
    id: 4, name: "Minimal Tote Bag", category: "accessories",
    price: 149000, tag: "POPULAR",
    image: "photo-1544816155-12df9643f363"
  },
  {
    id: 5, name: "Classic White Shirt", category: "tops",
    price: 279000, tag: "TIMELESS",
    image: "photo-1603252109303-2751441dd157"
  },
  {
    id: 6, name: "Urban Jacket", category: "outerwear",
    price: 599000, tag: "LIMITED",
    image: "photo-1551028719-00167b16eac5"
  },
  {
    id: 7, name: "Daily Cap", category: "accessories",
    price: 99000, tag: "ESSENTIAL",
    image: "photo-1588850561407-ed78c282e89b"
  },
  {
    id: 8, name: "Premium Basic Tee", category: "tops",
    price: 219000, tag: "NEW COLOR",
    image: "photo-1503341504253-dff4815485f1"
  }
];

const rupiah = amount =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);

const imageUrl = id =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

const productGrid = document.getElementById("productGrid");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const toast = document.getElementById("toast");

let cart = {};
let toastTimer;

function renderProducts(category = "all") {
  const visibleProducts = products.filter(product =>
    category === "all" || product.category === category
  );

  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img src="${imageUrl(product.image)}"
             alt="${product.name}" loading="lazy">
        <span class="product-tag">${product.tag}</span>
        <button class="add-button" data-add="${product.id}"
                aria-label="Tambah ${product.name} ke keranjang">+</button>
      </div>
      <div class="product-info">
        <div>
          <h3>${product.name}</h3>
          <p>N2E Studio / Ready to wear</p>
        </div>
        <span class="product-price">${rupiah(product.price)}</span>
      </div>
    </article>
  `).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  showToast("Produk berhasil ditambahkan ke bag.");
}

function changeQuantity(id, amount) {
  cart[id] = (cart[id] || 0) + amount;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  renderCart();
}

function renderCart() {
  const entries = products.filter(product => cart[product.id]);
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const subtotal = entries.reduce(
    (sum, product) => sum + product.price * cart[product.id], 0
  );

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTitleCount").textContent = `(${count})`;
  document.getElementById("cartSubtotal").textContent = rupiah(subtotal);

  if (!entries.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your bag is empty.<br>Yuk, temukan item favoritmu.</p>';
    return;
  }

  cartItems.innerHTML = entries.map(product => `
    <article class="cart-row">
      <img src="${imageUrl(product.image)}" alt="${product.name}">
      <div>
        <h3>${product.name}</h3>
        <p>${rupiah(product.price)}</p>
        <div class="quantity-controls">
          <button data-change="${product.id}" data-amount="-1"
                  aria-label="Kurangi jumlah">−</button>
          <span>${cart[product.id]}</span>
          <button data-change="${product.id}" data-amount="1"
                  aria-label="Tambah jumlah">+</button>
        </div>
      </div>
      <button class="remove-button" data-remove="${product.id}">Hapus</button>
    </article>
  `).join("");
}

document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  document.querySelectorAll(".filter").forEach(filter =>
    filter.classList.toggle("active", filter === button)
  );

  renderProducts(button.dataset.category);
});

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(Number(button.dataset.add));
});

cartItems.addEventListener("click", event => {
  const changeButton = event.target.closest("[data-change]");
  const removeButton = event.target.closest("[data-remove]");

  if (changeButton) {
    changeQuantity(
      Number(changeButton.dataset.change),
      Number(changeButton.dataset.amount)
    );
  }

  if (removeButton) {
    removeFromCart(Number(removeButton.dataset.remove));
  }
});

function openCart() {
  cartOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("closeCart").focus();
}

function closeCart() {
  cartOverlay.hidden = true;
  document.body.style.overflow = "";
  document.getElementById("openCart").focus();
}

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("closeBackdrop").addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !cartOverlay.hidden) closeCart();
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    showToast("Keranjangmu masih kosong.");
    return;
  }

  showToast("Checkout hanya simulasi untuk demo portofolio.");
});

renderProducts();
renderCart();
