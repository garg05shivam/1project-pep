console.log("JS Connected"); // IMPORTANT

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let allProducts = [];

// Fetch API
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    console.log(data.products); // check data
    allProducts = data.products;
    showProducts(allProducts);
  })
  .catch(err => {
    console.error(err);
    productList.innerHTML = "Error loading products";
  });

function showProducts(products) {
  productList.innerHTML = "";

  products.forEach(product => {
    productList.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin:10px;">
        <img src="${product.thumbnail}" width="150">
        <h3>${product.title}</h3>
        <p>₹ ${product.price}</p>
      </div>
    `;
  });
}

// Search
searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(value)
  );
  showProducts(filtered);
});
