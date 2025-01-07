const BASE_URL = "https://striveschool-api.herokuapp.com/api/product/";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdjZmIwZDdjMWUwYjAwMTUxNzIxYWYiLCJpYXQiOjE3MzYyNzA4NTEsImV4cCI6MTczNzQ4MDQ1MX0.lt8aoBsr6Wi_micOg88dqXS49-vhv3EK0VduA9Jb8BY"; // Sostituisci con il tuo token


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


if (productId) {
  loadProduct(productId); 
} else {
  document.querySelector("#delete-btn").style.display = "none"; 
}


async function loadProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}${id}`, {
      headers: {
        authorization: token,
      },
    });
    const product = await res.json();
    
    document.querySelector("#name").value = product.name;
    document.querySelector("#description").value = product.description;
    document.querySelector("#brand").value = product.brand;
    document.querySelector("#imageUrl").value = product.imageUrl;
    document.querySelector("#price").value = product.price;

    
    const deleteBtn = document.querySelector("#delete-btn");
    deleteBtn.style.display = "inline-block";
    deleteBtn.onclick = () => deleteProduct(id);
  } catch (error) {
    console.error("Error loading product:", error);
  }
}


async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}${id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting product: ${response.statusText}`);
    }

    alert("Product deleted!");
    window.location.href = "./index.html"; 
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}


document.querySelector("#product-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const description = document.querySelector("#description").value;
  const brand = document.querySelector("#brand").value;
  const imageUrl = document.querySelector("#imageUrl").value;
  const price = parseFloat(document.querySelector("#price").value);

  const product = {
    name,
    description,
    brand,
    imageUrl,
    price,
  };

  try {
    const method = productId ? "PUT" : "POST"; 
    const url = productId ? `${BASE_URL}${productId}` : BASE_URL;

    const res = await fetch(url, {
      method: method,
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      alert("Product saved!");
      window.location.href = "./index.html"; 
    } else {
      throw new Error("Failed to save product.");
    }
  } catch (error) {
    console.error("Error saving product:", error);
  }
});
