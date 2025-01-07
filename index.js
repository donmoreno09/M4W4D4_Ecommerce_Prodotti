const BASE_URL = "https://striveschool-api.herokuapp.com/api/product/";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdjZmIwZDdjMWUwYjAwMTUxNzIxYWYiLCJpYXQiOjE3MzYyNzA4NTEsImV4cCI6MTczNzQ4MDQ1MX0.lt8aoBsr6Wi_micOg88dqXS49-vhv3EK0VduA9Jb8BY"; // Sostituisci con il tuo token


async function loadProducts() {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const products = await response.json();

    const productsContainer = document.querySelector("#products");

    
    if (products.length === 0) {
      productsContainer.innerHTML = "<p>No products available at the moment.</p>";
      return;
    }

    
    productsContainer.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("col-md-4", "mb-4");

      productCard.innerHTML = `
        <div class="card">
          <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>$${product.price}</strong></p>
            <a href="product.html?id=${product._id}" class="btn btn-primary">View Product</a>
          </div>
        </div>
      `;

      productsContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  console.log('Loading products...');
  loadProducts();
});
