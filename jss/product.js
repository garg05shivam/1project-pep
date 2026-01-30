const productDetails = document.getElementById("productDetails");

// get product id from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
  productDetails.innerHTML = "<p>Product not found</p>";
} else {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      productDetails.innerHTML = `
        <div class="product-detail-card">
          <img src="${product.thumbnail}" alt="${product.title}">
          <div class="details">
            <h2>${product.title}</h2>
            <p class="price">₹ ${product.price}</p>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p>${product.description}</p>
          </div>
        </div>
      `;
    })
    .catch(() => {
      productDetails.innerHTML = "<p>Error loading product</p>";
    });
}
