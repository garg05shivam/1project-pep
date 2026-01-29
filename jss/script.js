const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

// Fetch products
fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(data => {
    allProducts = data.products;
    showProducts(allProducts);
  })
  .catch(error => {
    console.log("Error:", error);
    productList.innerHTML = "<p>Failed to load products.</p>";
  });

// Show products
function showProducts(list) {
  productList.innerHTML = "";

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

// Live search
searchInput.addEventListener("keyup", () => {
  const text = searchInput.value.toLowerCase();

  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(text)
  );

  showProducts(filtered);
});
