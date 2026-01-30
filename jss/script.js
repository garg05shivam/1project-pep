console.log("JS Connected");

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const historyBtn = document.getElementById("historyBtn");

let allProducts = [];

// Fetch products
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    showProducts(allProducts);
  })
  .catch(err => {
    console.error(err);
    productList.innerHTML = "<p>Error loading products</p>";
  });

function showProducts(products) {
  productList.innerHTML = "";

  products.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.thumbnail}" width="150">
        <h3>${product.title}</h3>
        <p>₹ ${product.price}</p>
      </div>
    `;
  });
}

// Search button
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const value = searchInput.value.trim();
    if (!value) return;

   let history = JSON.parse(localStorage.getItem("history")) || [];

// clean old invalid history (strings etc.)
history = history.filter(item => typeof item === "object" && item.text);

// prevent duplicate search text
const alreadyExists = history.some(item => item.text === value);

if (!alreadyExists) {
  history.push({
    text: value,
    time: new Date().toLocaleString()
  });
}

localStorage.setItem("history", JSON.stringify(history));

    window.location.href = `search.html?search=${encodeURIComponent(value)}`;
  });
}

// View history button
if (historyBtn) {
  historyBtn.addEventListener("click", () => {
    window.location.href = "history.html";
  });
}

const suggestionsBox = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();
  suggestionsBox.innerHTML = "";

  if (!value || allProducts.length === 0) return;

  const matches = allProducts
    .filter(p => p.title.toLowerCase().includes(value))
    .slice(0, 5);

  if (matches.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  suggestionsBox.style.display = "block";

  matches.forEach(product => {
    const div = document.createElement("div");
    div.textContent = product.title;

    div.onclick = () => {
      searchInput.value = product.title;
      suggestionsBox.innerHTML = "";
      window.location.href = `search.html?search=${encodeURIComponent(product.title)}`;
    };

    suggestionsBox.appendChild(div);
  });
});

