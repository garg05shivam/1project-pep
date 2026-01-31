console.log("JS Connected");

const productList = document.getElementById("productList");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const historyBtn = document.getElementById("historyBtn");
const suggestionsBox = document.getElementById("suggestions");

let allProducts = [];
let currentPage = 1;
const itemsPerPage = 6;

// Fetch products
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    currentPage = 1;
    showProducts(allProducts);
  })
  .catch(err => {
    console.error(err);
    productList.innerHTML = "<p>Error loading products</p>";
  });

//  Show products with pagination
function showProducts(products) {
  productList.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedProducts = products.slice(start, end);

  paginatedProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.cursor = "pointer";

    card.innerHTML = `
      <img src="${product.thumbnail}" width="150">
      <h3>${product.title}</h3>
      <p>₹ ${product.price}</p>
    `;

    card.onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };

    productList.appendChild(card);
  });

  renderPagination(products.length);
}

//  Render pagination buttons
function renderPagination(totalItems) {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPage) {
      btn.disabled = true;
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      showProducts(allProducts);
    });

    pagination.appendChild(btn);
  }
}

//  Search button (history logic)
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const value = searchInput.value.trim();
    if (!value) return;

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history = history.filter(item => typeof item === "object" && item.text);
    history = history.filter(item => item.text !== value);

    history.push({
      text: value,
      time: new Date().toLocaleString()
    });

    localStorage.setItem("history", JSON.stringify(history));

    window.location.href = `search.html?search=${encodeURIComponent(value)}`;
  });
}

//  View history
if (historyBtn) {
  historyBtn.addEventListener("click", () => {
    window.location.href = "history.html";
  });
}

//  Suggestions logic
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();
  suggestionsBox.innerHTML = "";

  if (!value || allProducts.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

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
      suggestionsBox.style.display = "none";

      let history = JSON.parse(localStorage.getItem("history")) || [];
      history = history.filter(item => typeof item === "object" && item.text);
      history = history.filter(item => item.text !== product.title);

      history.push({
        text: product.title,
        time: new Date().toLocaleString()
      });

      localStorage.setItem("history", JSON.stringify(history));

      window.location.href = `search.html?search=${encodeURIComponent(product.title)}`;
    };

    suggestionsBox.appendChild(div);
  });
});
