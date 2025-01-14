const BASE_URL = "https://striveschool-api.herokuapp.com/api/product/";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdjZmIwZDdjMWUwYjAwMTUxNzIxYWYiLCJpYXQiOjE3MzYyNzA4NTEsImV4cCI6MTczNzQ4MDQ1MX0.lt8aoBsr6Wi_micOg88dqXS49-vhv3EK0VduA9Jb8BY";

// Get the product ID from the query string
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (!productId) {
  alert("No product ID found in the URL.");
  window.location.href = "./index.html";
}

async function loadProductDetails(id) {
  try {
    const response = await fetch(`${BASE_URL}${id}`, {
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }

    const product = await response.json();
    const productDetailsContainer = document.querySelector("#product-details");

    productDetailsContainer.innerHTML = `
      <div class="card">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
          <p class="card-text"><strong>Price:</strong> $${product.price}</p>
          <a href="./backoffice.html?id=${product._id}" class="btn btn-primary">Edit Product</a>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error loading product details:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadProductDetails(productId);
});
