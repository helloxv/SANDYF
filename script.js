let cart = {};

// Navigation smooth scroll
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Cart functionality
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const orderNowButton = document.getElementById('order-now');

    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
    cartCount.textContent = totalItems;

    cartItems.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'cart-item header';
    header.innerHTML = `
        <span>Item</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Subtotal</span>
        <span>Actions</span>
    `;
    cartItems.appendChild(header);

    let totalPrice = 0;
    Object.keys(cart).forEach(item => {
        if (cart[item].count > 0) {
            const price = cart[item].price * cart[item].count;
            totalPrice += price;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item}</span>
                <span>₱${cart[item].price.toFixed(2)}</span>
                <span>${cart[item].count}</span>
                <span>₱${price.toFixed(2)}</span>
                <div>
                    <button class="btn add-to-cart" data-item="${item}" data-price="${cart[item].price}">+</button>
                    <button class="btn remove-btn remove-from-cart" data-item="${item}">-</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        }
    });

    cartTotal.textContent = totalPrice.toFixed(2);
    orderNowButton.disabled = totalItems === 0;

    if (totalItems === 0) {
        cartEmpty.style.display = 'block';
        cartItems.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartItems.style.display = 'block';
    }
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.dataset.item;
        const price = parseFloat(button.dataset.price);
        cart[item] = { count: (cart[item]?.count || 0) + 1, price };
        updateCart();
    });
});

document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.dataset.item;
        if (cart[item] && cart[item].count > 0) {
            cart[item].count--;
            if (cart[item].count === 0) delete cart[item];
            updateCart();
        }
    });
});

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('active');
}

// Order Modal
const orderModal = document.getElementById('order-modal');
const orderForm = document.getElementById('order-form');
const orderFeedback = document.getElementById('order-feedback');

document.getElementById('order-now').addEventListener('click', () => {
    orderModal.classList.add('active');
});

function toggleOrderModal() {
    orderModal.classList.remove('active');
}

orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        toggleOrderModal();
    }
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    orderFeedback.classList.add('active');
    orderForm.reset();
    setTimeout(() => {
        orderFeedback.classList.remove('active');
        toggleOrderModal();
        cart = {};
        updateCart();
        toggleCart();
    }, 3000);
});

// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
}

document.getElementById('next-testimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

document.getElementById('prev-testimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Initialize cart
updateCart();
