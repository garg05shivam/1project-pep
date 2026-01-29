let param = new URLSearchParams(window.location.search);
let search = param.get("search");

if (!search) {
  console.log("No search query found");
  return;
}

let productList = document.getElementById("product-list-container");

fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(data => {
    const products = data.products;

    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase().trim())
    );

    filteredProducts.forEach(product => {
      const productItem = document.createElement("div");
      productItem.className = "product-item";
      productItem.innerHTML = `
        <img src="${product.images[0]}" alt="${product.title}" style="max-width:100px;">
        <h3 class="product-title">${product.title}</h3>
        <h2 class="product-price">₹ ${product.price}</h2>
      `;
      productList.appendChild(productItem);
    });
  });
