let cart = [];

const productGrid = document.getElementById('product-grid');
const cartIcon = document.getElementById('cart-icon');
const cartBadge = document.getElementById('cart-badge');
const cartMenu = document.getElementById('cart-menu');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const paymentMethod = document.getElementById('payment-method');
const cashPayment = document.getElementById('cash-payment');
const cashAmount = document.getElementById('cash-amount');
const changeDisplay = document.getElementById('change');
const processPayment = document.getElementById('process-payment');

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function loadProducts() {
    let products = JSON.parse(localStorage.getItem('products'));
    if (!products) {
        products = [
            { id: '1', name: 'Café Expresso', price: 5.00, stock: 10, category: 'bebidas' },
            { id: '2', name: 'Café com Leite', price: 6.00, stock: 15, category: 'bebidas' },
            { id: '3', name: 'Pão de Queijo', price: 3.00, stock: 20, category: 'salgados' },
        ];
        localStorage.setItem('products', JSON.stringify(products));
    }
    renderProducts(products);
}

function renderProducts(products) {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card';
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${formatCurrency(product.price)}</p>
            <button onclick="addToCart('${product.id}')">Adicionar ao Carrinho</button>
        `;
        productGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    let products = JSON.parse(localStorage.getItem('products'));
    let product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
        cart.push({ ...product, quantity: 1 });
        product.stock--;
        localStorage.setItem('products', JSON.stringify(products));
        updateCart();
    } else {
        alert('Produto fora de estoque');
    }
}

function updateCart() {
    cartBadge.innerText = cart.length;
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} - ${formatCurrency(item.price)} x ${item.quantity}</p>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    cartTotal.innerText = `Total: ${formatCurrency(total)}`;
}

function processPaymentHandler() {
    if (paymentMethod.value === 'cash') {
        const cashValue = parseFloat(cashAmount.value);
        const totalValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const change = cashValue - totalValue;
        if (change < 0) {
            alert('Valor em dinheiro insuficiente');
        } else {
            changeDisplay.innerText = `Troco: ${formatCurrency(change)}`;
            finalizeSale();
            // Limpar o campo de valor em dinheiro e o campo de troco após finalizar
            cashAmount.value = '';
            changeDisplay.innerText = '';
        }
    } else {
        finalizeSale();
    }
}


function finalizeSale() {
    alert('Pagamento processado com sucesso!');
    cart = [];
    updateCart();
    cartMenu.style.display = 'none';
}

paymentMethod.addEventListener('change', function() {
    if (paymentMethod.value === 'cash') {
        cashPayment.style.display = 'block';
    } else {
        cashPayment.style.display = 'none';
    }
});

processPayment.addEventListener('click', processPaymentHandler);

cartIcon.addEventListener('click', function() {
    cartMenu.style.display = cartMenu.style.display === 'none' || cartMenu.style.display === '' ? 'block' : 'none';
});

window.onload = function() {
    loadProducts();
    updateCart();
};
function processPaymentHandler() {
    if (paymentMethod.value === 'cash') {
        const cashValue = parseFloat(cashAmount.value);
        const totalValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const change = cashValue - totalValue;
        if (change < 0) {
            alert('Valor em dinheiro insuficiente');
        } else {
            changeDisplay.innerText = `Troco: ${formatCurrency(change)}`;
            finalizeSale();
        }
    } else {
        finalizeSale();
    }
}

