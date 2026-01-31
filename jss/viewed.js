console.log("Viewed JS Connected");

const viewedList = document.getElementById("viewedList");
const clearBtn = document.getElementById("clearViewedBtn");

// Read viewed products from localStorage
let viewedProducts = JSON.parse(localStorage.getItem("visitedProducts")) || [];

// If no viewed products
if (viewedProducts.length === 0) {
  viewedList.innerHTML = "<p>No viewed products yet.</p>";
} else {
  viewedProducts.forEach(product => {
    // Safety check
    if (!product.id || !product.title) return;

    const card = document.createElement("div");
    card.className = "product-card";
    card.style.cursor = "pointer";

    card.innerHTML = `
      <img src="${product.thumbnail}" width="150">
      <h3>${product.title}</h3>
      <p>₹ ${product.price}</p>
      <small>Viewed on: ${product.time}</small>
    `;

    // Click → open product again
    card.onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };

    viewedList.appendChild(card);
  });
}

// Clear viewed products
clearBtn.addEventListener("click", () => {
  const confirmClear = confirm("Clear viewed products history?");
  if (confirmClear) {
    localStorage.removeItem("visitedProducts");
    viewedList.innerHTML = "<p>No viewed products yet.</p>";
  }
});
