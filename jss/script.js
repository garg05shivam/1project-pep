// Get elements
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let allProducts = []; // will store products from API

// 1. Get data from API
fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(data => {
    // API gives: { products: [ ... ] }
    allProducts = data.products;
    showProducts(allProducts); // show all when page loads
  })
  .catch(error => {
    console.log("Error:", error);
    productList.innerHTML = "<p>Failed to load products.</p>";
  });

// 2. Function to display products
function showProducts(list) {
  productList.innerHTML = ""; // clear old items

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" class="product-img">
      <h3 class="product-name">${product.title}</h3>
      <p class="product-price">₹ ${product.price}</p>
    `;

    productList.appendChild(card);
  });
}

// 3. Function to search/filter
function filterProducts() {
  const text = searchInput.value.toLowerCase();

  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(text)
  );

  showProducts(filtered);
}

// 4. Events
searchBtn.addEventListener("click", filterProducts);
searchInput.addEventListener("keyup", filterProducts); // live search while typing