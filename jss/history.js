console.log("History JS Connected");

const historyList = document.getElementById("historyList");

let history = JSON.parse(localStorage.getItem("history")) || [];

if (history.length === 0) {
  historyList.innerHTML = "<li>No history found</li>";
} else {
  history.forEach(item => {
    // safety check (important)
    if (typeof item !== "object" || !item.text) return;

    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${item.text}</strong><br>
      <small>🕒 ${item.time}</small>
    `;

    // click history → search again
    li.style.cursor = "pointer";
    li.onclick = () => {
      window.location.href = `search.html?search=${encodeURIComponent(item.text)}`;
    };

    historyList.appendChild(li);
  });
}

// clear history function
function clearHistory() {
  localStorage.removeItem("history");
  location.reload();
}
