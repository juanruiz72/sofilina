
// Carrito de compras persistente con cantidades y cálculo correcto
let cart = [];

// Cargar el carrito desde localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Actualizar el carrito en la interfaz
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear cart items display

    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        itemCount += item.quantity;
        total += item.price * item.quantity;
    });

    // Asegurarse de que el total sea un número
    if (isNaN(total) || total === Infinity) total = 0;

    cartCount.textContent = itemCount; // Update cart icon with total count
    cartTotalElement.textContent = total.toFixed(2); // Mostrar total correctamente
}

// Inicializar el carrito
loadCart();
updateCart();

// Agregar al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const name = productCard.dataset.name;
        const price = parseFloat(productCard.dataset.price);

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        saveCart();
        updateCart();
        alert(`${name} agregado al carrito`);
    });
});

// Vaciar el carrito
document.querySelector('.clear-cart').addEventListener('click', () => {
    cart = [];
    saveCart();
    updateCart();
});

// Asegurarse de que el carrito esté visible al hacer clic en el ícono del carrito
document.getElementById('cart-icon').addEventListener('click', (e) => {
    window.location.hash = 'cart'; // Redirige al carrito al hacer clic en el ícono
});
