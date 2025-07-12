const products = [
  {
    id: 1,
    name: "Phone",
    category: "electronics",
    price: 15000,
    image: "assets/phone.png"
  },
  {
    id: 2,
    name: "Headphones",
    category: "electronics",
    price: 2000,
    image: "assets/headphones.png"
  },
  {
    id: 3,
    name: "Shirt",
    category: "clothing",
    price: 800,
    image: "assets/shirt.png"
  },
  {
    id: 4,
    name: "Laptop",
    category: "electronics",
    price: 55000,
    image: "assets/laptop.png"
  },
  {
    id: 5,
    name: "Jeans",
    category: "clothing",
    price: 1200,
    image: "assets/jeans.png"
  },
  {
    id: 6,
    name: "Watch",
    category: "electronics",
    price: 3500,
    image: "assets/watch.png"
  },
  {
    id: 7,
    name: "Shoes",
    category: "clothing",
    price: 2200,
    image: "assets/shoes.png"
  },
  {
    id: 8,
    name: "Tablet",
    category: "electronics",
    price: 25000,
    image: "assets/tablet.png"
  }
];

let cart = [];

function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortOptions").value;

  let filtered = products.filter(p =>
    (!category || p.category === category) &&
    p.name.toLowerCase().includes(search)
  );

  if (sort === "priceLowHigh") filtered.sort((a, b) => a.price - b.price);
  if (sort === "priceHighLow") filtered.sort((a, b) => b.price - a.price);
  if (sort === "nameAsc") filtered.sort((a, b) => a.name.localeCompare(b.name));

  filtered.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const p = document.createElement("p");
    p.innerHTML = `${item.name} - ₹${item.price} 
      <button onclick="removeFromCart(${index})">❌</button>`;
    cartDiv.appendChild(p);
  });

  document.getElementById("totalPrice").innerText = total;
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  alert("Order placed successfully!");
  cart = [];
  renderCart();
}

document.getElementById("searchInput").addEventListener("input", renderProducts);
document.getElementById("categoryFilter").addEventListener("change", renderProducts);
document.getElementById("sortOptions").addEventListener("change", renderProducts);

renderProducts();
