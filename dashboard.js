document.addEventListener('DOMContentLoaded', () => {
    renderSalesChart();
    renderTotalSales();
    renderPaymentRank();
});

function renderSalesChart() {
    // Dados de exemplo para o gráfico de vendas por produto
    const products = ['Café', 'Bolo', 'Sanduíche', 'Salgado', 'Suco'];
    const salesData = [20, 15, 10, 8, 5]; // Quantidade de vendas de cada produto

    const ctx = document.getElementById('product-sales-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: products,
            datasets: [{
                label: 'Quantidade de Vendas',
                data: salesData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderTotalSales() {
   
    const totalSales = 5000; 

    const totalSalesElement = document.getElementById('total-sales-value');
    totalSalesElement.textContent = `Total de Vendas: R$ ${totalSales.toFixed(2)}`;
}

function renderPaymentRank() {
    
    const paymentMethods = ['Crédito', 'Débito', 'PIX', 'Dinheiro'];
    const paymentCounts = [30, 20, 15, 10];

    const paymentRankList = document.getElementById('payment-rank-list');
    paymentRankList.innerHTML = '';

    paymentMethods.forEach((method, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${method}: ${paymentCounts[index]} transações`;
        paymentRankList.appendChild(listItem);
    });
}
