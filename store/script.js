/* ============================================
   SCRIPT.JS - Phone Accessories Store Website
   Handles "Add to Cart" and the Cart page,
   using localStorage to remember cart items.
   ============================================ */

// ----- ADD TO CART (used on products.html) -----
// name = product name, price = product price (a number)
function addToCart(name, price) {
  // Get the current cart from localStorage, or start a new empty one
  var cartData = localStorage.getItem("phoneStoreCart");
  var cart = [];

  if (cartData !== null) {
    cart = JSON.parse(cartData);
  }

  // Add the new item to the cart array
  cart.push({ name: name, price: price });

  // Save the updated cart back into localStorage
  localStorage.setItem("phoneStoreCart", JSON.stringify(cart));

  // Let the shopper know it was added
  alert(name + " was added to your cart!");
}

// ----- LOAD AND DISPLAY CART (used on cart.html) -----
function loadCart() {
  var cartTableBody = document.getElementById("cartItems");
  var cartTotalDisplay = document.getElementById("cartTotal");

  if (!cartTableBody) {
    return; // Not on the cart page, so do nothing
  }

  var cartData = localStorage.getItem("phoneStoreCart");
  var cart = [];

  if (cartData !== null) {
    cart = JSON.parse(cartData);
  }

  cartTableBody.innerHTML = ""; // Clear the table first
  var total = 0;

  if (cart.length === 0) {
    cartTableBody.innerHTML = "<tr><td colspan='3'>Your cart is empty.</td></tr>";
  } else {
    for (var i = 0; i < cart.length; i++) {
      var item = cart[i];
      total += item.price;

      // Build a table row for each cart item
      var row = document.createElement("tr");
      row.innerHTML =
        "<td>" + item.name + "</td>" +
        "<td>₦" + item.price.toLocaleString() + "</td>" +
        "<td><button class='btn' onclick='removeFromCart(" + i + ")'>Remove</button></td>";

      cartTableBody.appendChild(row);
    }
  }

  cartTotalDisplay.textContent = "Total: ₦" + total.toLocaleString();
}

// ----- REMOVE ONE ITEM FROM CART (used on cart.html) -----
function removeFromCart(index) {
  var cartData = localStorage.getItem("phoneStoreCart");
  var cart = [];

  if (cartData !== null) {
    cart = JSON.parse(cartData);
  }

  cart.splice(index, 1); // Remove the item at this position
  localStorage.setItem("phoneStoreCart", JSON.stringify(cart));

  loadCart(); // Refresh the displayed cart
}

// ----- CLEAR THE WHOLE CART (used on cart.html) -----
function clearCart() {
  localStorage.removeItem("phoneStoreCart");
  loadCart();
}

// When the cart page loads, display the saved cart
window.onload = function () {
  loadCart();
};
