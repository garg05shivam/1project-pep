// Get container
const productDetails = document.getElementById("productDetails");

// Get product id from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// If no product id found
if (!productId) {
  productDetails.innerHTML = "<p>Product not found</p>";
} else {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {

      // ✅ SAVE VISITED PRODUCT
      saveVisitedProduct(product);

      // ✅ IMAGE GALLERY
      const imagesHTML = product.images
        .map(img => `<img src="${img}" class="gallery-img" alt="${product.title}">`)
        .join("");

      // ✅ SHOW PRODUCT DETAILS
      productDetails.innerHTML = `
        <div class="product-detail-card">

          <div class="image-gallery">
            ${imagesHTML}
          </div>

          <div class="details">
            <h2>${product.title}</h2>

            <p class="price">₹ ${product.price}</p>

            <p><strong>Discount:</strong> ${product.discountPercentage}%</p>
            <p><strong>Rating:</strong> ⭐ ${product.rating}</p>
            <p><strong>Stock:</strong> ${
              product.stock > 0 ? "In Stock" : "Out of Stock"
            }</p>

            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Category:</strong> ${product.category}</p>

            <h4>Description</h4>
            <p>${product.description}</p>
          </div>

        </div>
      `;
    })
    .catch(() => {
      productDetails.innerHTML = "<p>Error loading product</p>";
    });
}


// SAVE VISITED PRODUCT FUNCTION

function saveVisitedProduct(product) {
  let visited = JSON.parse(localStorage.getItem("visitedProducts")) || [];

  // Remove old entry if already exists
  visited = visited.filter(item => item.id !== product.id);

  // Add as most recent
  visited.push({
    id: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    time: new Date().toLocaleString()
  });

  // Keep only last 5 visited products
  if (visited.length > 5) {
    visited.shift();
  }

  localStorage.setItem("visitedProducts", JSON.stringify(visited));
}
