console.log("JS Connected");

// Get elements
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let allProducts = [];

// Fetch products from API
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    showProducts(allProducts);
  })
  .catch(err => {
    console.error(err);
    productList.innerHTML = "Error loading products";
  });

// Display products
function showProducts(products) {
  productList.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" width="150">
      <h3>${product.title}</h3>
      <p>₹ ${product.price}</p>
    `;

    productList.appendChild(card);
  });
}

// Search button → redirect to search.html
searchBtn.addEventListener("click", () => {
  const value = searchInput.value.trim();
  if (value) {
    window.location.href = `search.html?search=${encodeURIComponent(value)}`;
  }
});