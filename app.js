document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadBuyers();
  });
  
  function saveData(type) {
    let data = JSON.parse(localStorage.getItem(type)) || [];
    const form = document.querySelector(`#${type}-form`);
    const formData = new FormData(form);
    let entry = {};
    formData.forEach((value, key) => entry[key] = value);
    entry.id = Date.now();
    data.push(entry);
    localStorage.setItem(type, JSON.stringify(data));
    form.reset();
    if (type === 'products') loadProducts();
    else loadBuyers();
  }
  
  function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    const productList = document.getElementById("product-list");
    productList.innerHTML = products.map(product => `
        <p>${product.name} - ${product.category} - $${product.price}
            <button class="delete-btn" onclick="deleteItem('products', ${product.id})">Delete</button>
        </p>`).join('');
  }
  
  
  function loadBuyers() {
    let buyers = JSON.parse(localStorage.getItem("buyers")) || [];
    const buyerList = document.getElementById("buyer-list");
    buyerList.innerHTML = buyers.map(buyer => `
        <p>${buyer.name} - ${buyer.email} - ${buyer.phone}
            <button class="delete-btn" onclick="deleteItem('buyers', ${buyer.id})">Delete</button>
        </p>`).join('');
  }
  
  
  function deleteItem(type, id) {
    let data = JSON.parse(localStorage.getItem(type)) || [];
    data = data.filter(item => item.id !== id);
    localStorage.setItem(type, JSON.stringify(data));
    if (type === 'products') loadProducts();
    else loadBuyers();
  }
  
  function searchData() {
    const query = document.getElementById("search-input").value.toLowerCase();
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let buyers = JSON.parse(localStorage.getItem("buyers")) || [];
    let filteredProducts = products.filter(p => p.name.toLowerCase().includes(query));
    let filteredBuyers = buyers.filter(b => b.name.toLowerCase().includes(query));
    document.getElementById("product-list").innerHTML = filteredProducts.length ? 
        filteredProducts.map(p => `<p>${p.name} - ${p.category} - $${p.price}</p>`).join('') : '<p>No products found.</p>';
    document.getElementById("buyer-list").innerHTML = filteredBuyers.length ? 
        filteredBuyers.map(b => `<p>${b.name} - ${b.email}</p>`).join('') : '<p>No buyers found.</p>';
  }
  
  function resetSearch() {
    document.getElementById("search-input").value = "";
    loadProducts();
    loadBuyers();
  }