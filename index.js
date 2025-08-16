let cart = [];
let cartVisible = false;

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}


function updateCart() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const total = document.getElementById('total');

  cartCount.textContent = cart.length;
  cartItems.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalPrice += item.price * item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ₹${item.price} 
      <div style="display:inline-block; margin-left:10px;">
        <button onclick="decreaseQuantity(${index})" style="padding:2px 6px;">-</button>
        <span style="margin:0 5px;">${item.quantity}</span>
        <button onclick="increaseQuantity(${index})" style="padding:2px 6px;">+</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  total.textContent = totalPrice;
}

function toggleCart() {
  const cartBox = document.getElementById('cart');
  cartVisible = !cartVisible;
  cartBox.style.display = cartVisible ? 'block' : 'none';
}


function buyNow() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  document.getElementById("buy-btn").style.display = "none";
  document.getElementById("proceed-btn").style.display = "inline-block";
}

function openPaymentPopup() {
  document.getElementById("payment-modal").style.display = "block";
}

function closePaymentPopup() {
  document.getElementById("payment-modal").style.display = "none";
}


document.getElementById("payment-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get purchased items & total amount
  let purchaseDetails = "";
  let totalAmount = 0;

  cart.forEach(item => {
    purchaseDetails += `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}\n`;
    totalAmount += item.price * item.quantity;
  });

  alert(`Payment successful! 🎉\n\nItems Purchased:\n${purchaseDetails}\nTotal Amount: ₹${totalAmount}`);

  // Close popup & reset cart
  closePaymentPopup();
  cart = [];
  updateCart();
  document.getElementById("buy-btn").style.display = "inline-block";
  document.getElementById("proceed-btn").style.display = "none";
});


function increaseQuantity(index) {
  cart[index].quantity++;
  updateCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    alert(`${cart[index].name} removed from cart!`);
    cart.splice(index, 1);
  }
  updateCart();
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  alert(`${name} added to cart!`);
  updateCart();
}

const productList = document.getElementById("productList");

function scrollLeft() {
  productList.scrollBy({ left: -250, behavior: "smooth" });
}

function scrollRight() {
  productList.scrollBy({ left: 250, behavior: "smooth" });
}
