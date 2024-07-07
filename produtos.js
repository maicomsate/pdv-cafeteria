const productList = document.getElementById('product-list');
const addProductForm = document.getElementById('add-product-form');

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    renderProductList(products);
}

function renderProductList(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Preço: ${formatCurrency(product.price)}</p>
            <p>Estoque: ${product.stock}</p>
            <p>Categoria: ${product.category}</p>
            <button onclick="editProduct('${product.id}')">Editar</button>
            <button onclick="deleteProduct('${product.id}')">Excluir</button>
        `;
        productList.appendChild(productItem);
    });
}

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const category = document.getElementById('product-category').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const newProduct = {
        id: String(Date.now()),
        name,
        price,
        stock,
        category
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
    addProductForm.reset();
}

function editProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find(p => p.id === productId);
    if (product) {
        const name = prompt('Nome do produto', product.name);
        const price = parseFloat(prompt('Preço do produto', product.price));
        const stock = parseInt(prompt('Estoque do produto', product.stock));
        const category = prompt('Categoria do produto', product.category);

        product.name = name;
        product.price = price;
        product.stock = stock;
        product.category = category;

        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    }
}

function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem('products'));
    products = products.filter(p => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

addProductForm.addEventListener('submit', addProduct);

window.onload = function() {
    loadProducts();
};
