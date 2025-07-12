let cart = [], cartCount = 0;

const cartCountEl = document.getElementById("cart-count"),
      cartModal = document.getElementById("cart-modal"),
      cartList = document.getElementById("cart-list"),
      cartTotal = document.getElementById("cart-total"),
      overlay = document.getElementById("overlay"),
      checkoutBtn = document.getElementById("checkout-btn"),
      checkoutPopup = document.getElementById("checkout-popup"),
      checkoutTotal = document.getElementById("checkout-total");

// Add to Cart
document.querySelectorAll(".add-cart").forEach(btn => {
  btn.onclick = () => {
    const card = btn.closest(".product-card");
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    cart.push({ name, price });
    updateCart();
    btn.textContent = "Added";
    btn.disabled = true;
  };
});

function updateCart() {
  cartCount = cart.length;
  cartCountEl.textContent = cartCount;
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, idx) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} – $${item.price.toFixed(2)} `;
    const remove = document.createElement("button");
    remove.textContent = "❌";
    remove.onclick = () => {
      cart.splice(idx, 1);
      updateCart();
    };
    li.appendChild(remove);
    cartList.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
}

// Modals
cartCountEl.onclick = () => showModal();
document.getElementById("close-cart").onclick = hideModal;
overlay.onclick = () => { hideModal(); hideCheckout(); };

function showModal() {
  cartModal.style.display = "block";
  overlay.style.display = "block";
}

function hideModal() {
  cartModal.style.display = "none";
  overlay.style.display = "none";
}

checkoutBtn.onclick = () => {
  checkoutTotal.textContent = cartTotal.textContent;
  checkoutPopup.style.display = "block";
  cartModal.style.display = "none";
  overlay.style.display = "block";
};

document.getElementById("close-checkout").onclick = hideCheckout;

function hideCheckout() {
  checkoutPopup.style.display = "none";
  overlay.style.display = "none";
}

// Checkout
document.getElementById("checkout-form").onsubmit = e => {
  e.preventDefault();
  alert(`Thanks ${e.target.name.value}! Your purchase of $${checkoutTotal.textContent} is confirmed.`);
  cart = [];
  updateCart();
  hideCheckout();
};

// Filter Buttons
document.querySelectorAll(".filters button").forEach(btn => {
  btn.onclick = () => {
    document.querySelector(".filters .active").classList.remove("active");
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".product-card").forEach(card => {
      const match = filter === "all" || card.dataset.category === filter;
      card.style.display = match ? "block" : "none";
    });
  };
});

// Dark mode toggle
const modeBtn = document.getElementById("mode-toggle");
modeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  modeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  document.querySelector("footer").classList.toggle("dark");
};
