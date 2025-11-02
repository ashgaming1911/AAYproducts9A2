const products = [
    { id: 1, name: "Varna AAY", price: 1000, img: "Varna.jpg" },
    { id: 2, name: "Sannvi", price: 10000, img: "janvi.jpg" },
    { id: 3, name: "Nuwettha", price: 40000, img: "Nuwettha.jpg" },
    { id: 4, name: "sreastha", price: 30000, img: "sreastha.jpg" },
    { id: 5, name: "Ashrith", price: 2500000, img: "Ashrith.jpg" },
    { id: 6, name: "Harsha", price: 30000000, img: "Harsha.png" },
    { id: 7, name: "Aryan", price: 500000000, img: "Aryan.jpg" },
    { id: 8, name: "Asheq", price: 350000000, img: "Asheq.jpg" },
    { id: 9, name:"Ashmitha", price: 20000, img:"Ashmitha.jpg"}
  ];
  
  const productList = document.getElementById("product-list");
  const cartSection = document.getElementById("cart-section");
  const cartBtn = document.getElementById("cart-btn");
  const closeCart = document.getElementById("close-cart");
  const cartItemsEl = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const totalEl = document.getElementById("total");
  const purchaseBtn = document.getElementById("purchase-btn");
  
  let cart = [];
  
  // Display products
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
  
  // Add to cart
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
  
    if (item) {
      item.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    updateCart();
  }
  
  // Update cart display
  function updateCart() {
    cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
    cartItemsEl.innerHTML = "";
  
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} x${item.qty} - $${item.price * item.qty}
        <button onclick="removeItem(${item.id})">❌</button>
      `;
      cartItemsEl.appendChild(li);
    });
  
    totalEl.textContent = `Total: $${total}`;
  }
  
  // Remove item from cart
  function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
  }
  
  // Cart modal controls
  cartBtn.onclick = () => cartSection.classList.remove("hidden");
  closeCart.onclick = () => cartSection.classList.add("hidden");
  
  // Purchase
  purchaseBtn.onclick = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for your purchase!");
    cart = [];
    updateCart();
    cartSection.classList.add("hidden");
  };
  