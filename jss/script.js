console.log("JS Connected");

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const historyBtn = document.getElementById("historyBtn");
const suggestionsBox = document.getElementById("suggestions");

let allProducts = [];

// 🔹 Fetch products
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

// 🔹 Show all products
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

// 🔹 Search button (UPDATED HISTORY LOGIC)
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const value = searchInput.value.trim();
    if (!value) return;

    let history = JSON.parse(localStorage.getItem("history")) || [];

    // remove invalid entries
    history = history.filter(item => typeof item === "object" && item.text);

    // 🔥 remove old entry if exists
    history = history.filter(item => item.text !== value);

    // 🔥 add new entry with updated time (goes to last)
    history.push({
      text: value,
      time: new Date().toLocaleString()
    });

    localStorage.setItem("history", JSON.stringify(history));

    window.location.href = `search.html?search=${encodeURIComponent(value)}`;
  });
}

// 🔹 View history
if (historyBtn) {
  historyBtn.addEventListener("click", () => {
    window.location.href = "history.html";
  });
}

// 🔹 Suggestions logic (unchanged, stable)
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

      // 🔥 update history on suggestion click also
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

function showProducts(products) {
  productList.innerHTML = "";

  products.forEach(product => {
    productList.innerHTML += `
      <div class="product-card" onclick="openProduct(${product.id})">
        <img src="${product.thumbnail}" width="150">
        <h3>${product.title}</h3>
        <p>₹ ${product.price}</p>
      </div>
    `;
  });
}

function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}
