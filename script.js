document.addEventListener('DOMContentLoaded', () => {
    // Get product and cart elements
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const productCards = document.querySelectorAll('.product-card');

    // Function to update cart display
    function updateCart() {
        // Update cart button
        cartBtn.textContent = `Cart (${cart.length})`;

        // Update cart items in modal
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} - ${item.price} x ${item.quantity}`;
            total += parseFloat(item.price.slice(1)) * item.quantity;
            cartItemsContainer.appendChild(cartItem);
        });
        document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to add item to cart
    function addToCart(productId) {
        const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('p').textContent;

        // Check if the product is already in the cart
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    }

    // Add event listener for 'Add to Cart' buttons
    productCards.forEach(card => {
        const productId = card.getAttribute('data-id');
        card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(productId));
    });

    // Show cart modal
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    // Close cart modal
    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Checkout functionality (just a placeholder)
    checkoutBtn.addEventListener('click', () => {
        alert('Checkout functionality is coming soon!');
    });

    // Initial cart update
    updateCart();
});
