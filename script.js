// Sample Product Data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM Elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

// Retrieve Cart from Session Storage
const getCartFromSession = () => {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// Save Cart to Session Storage
const saveCartToSession = (cart) => {
  sessionStorage.setItem("cart", JSON.stringify(cart));
};

// Render Product List
const renderProductList = () => {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(product));
    li.appendChild(addButton);
    productList.appendChild(li);
  });
};

// Render Shopping Cart
const renderCart = () => {
  cartList.innerHTML = ""; // Clear existing cart items
  const cart = getCartFromSession();
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
};

// Add Item to Cart
const addToCart = (product) => {
  const cart = getCartFromSession();
  cart.push(product);
  saveCartToSession(cart);
  renderCart();
};

// Clear Cart
const clearCart = () => {
  sessionStorage.removeItem("cart");
  renderCart();
};

// Initialize Page
const init = () => {
  renderProductList();
  renderCart();
  clearCartButton.addEventListener("click", clearCart);
};

// Run Initialization
document.addEventListener("DOMContentLoaded", init);
