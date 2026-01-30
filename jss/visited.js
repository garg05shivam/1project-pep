const container = document.getElementById("visitedList");

const visited = JSON.parse(localStorage.getItem("visitedProducts")) || [];

if (visited.length === 0) {
  container.innerHTML = "<p>No visited products yet.</p>";
} else {
  visited.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.thumbnail}" width="150">
      <h3>${p.title}</h3>
      <p>₹ ${p.price}</p>
      <small>Visited: ${p.time}</small>
    `;

    card.onclick = () => {
      window.location.href = `product.html?id=${p.id}`;
    };

    container.appendChild(card);
  });
}
const clearBtn = document.getElementById("clearVisitedBtn");

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    const confirmClear = confirm("Clear all recently viewed products?");
    if (confirmClear) {
      localStorage.removeItem("visitedProducts");
      document.getElementById("visitedList").innerHTML =
        "<p>No visited products.</p>";
    }
  });
}

