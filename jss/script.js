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

/* =========================
   FETCH PRODUCTS
========================= */
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    currentPage = 1;
    updatePage();
  })
  .catch(err => {
    console.error(err);
    productList.innerHTML = "<p>Error loading products</p>";
  });

/* =========================
   UPDATE PAGE
========================= */
function updatePage() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  showProducts(allProducts.slice(start, end));
  renderPagination(allProducts.length);
}

/* =========================
   SHOW PRODUCTS
========================= */
function showProducts(products) {
  productList.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>₹ ${product.price}</p>
    `;

    card.onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };

    productList.appendChild(card);
  });
}

/* =========================
   PAGINATION (PREV / NEXT)
========================= */
function renderPagination(totalItems) {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // PREV BUTTON
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "← Prev";
  prevBtn.className = "nav-btn";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    updatePage();
  };
  pagination.appendChild(prevBtn);

  // PAGE NUMBERS
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPage) btn.disabled = true;

    btn.onclick = () => {
      currentPage = i;
      updatePage();
    };

    pagination.appendChild(btn);
  }

  // NEXT BUTTON
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next →";
  nextBtn.className = "nav-btn";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    updatePage();
  };
  pagination.appendChild(nextBtn);
}

/* =========================
   SEARCH BUTTON (HISTORY)
========================= */
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

/* =========================
   VIEW SEARCH HISTORY
========================= */
if (historyBtn) {
  historyBtn.addEventListener("click", () => {
    window.location.href = "history.html";
  });
}

/* =========================
   SEARCH SUGGESTIONS
========================= */
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
