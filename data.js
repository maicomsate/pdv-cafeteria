let products = JSON.parse(localStorage.getItem('products'));

if (!products) {
    products = [
        { id: '1', name: 'Café Expresso', price: 5.00, stock: 10, category: 'bebidas' },
        { id: '2', name: 'Café com Leite', price: 6.00, stock: 15, category: 'bebidas' },
        { id: '3', name: 'Pão de Queijo', price: 3.00, stock: 20, category: 'salgados' },
       
    ];
    localStorage.setItem('products', JSON.stringify(products));
}
