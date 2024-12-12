function toggleColorDropdown() {
    const colorList = document.querySelector('.color-list');
    colorList.classList.toggle('active');
}

function selectColor(color) {
    document.querySelector('.color-dropdown button').textContent = color;
    document.querySelector('.color-list').classList.remove('active');
}

function selectSize(button) {
    document.querySelectorAll('.size-options button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

function changeImage(imageSrc) {
    const mainImage = document.querySelector('.product-image img');
    mainImage.style.opacity = 0;
    setTimeout(() => {
        mainImage.src = imageSrc;
        mainImage.style.opacity = 1;
    }, 500);
}

function addToCart(productName, productPrice, quantity, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += parseInt(quantity);
    } else {
        cart.push({ name: productName, price: productPrice, quantity: parseInt(quantity), image: productImage });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showCartPopup({ name: productName, price: productPrice, quantity: quantity, image: productImage });
}

function showCartPopup(product) {
    const cartPopup = document.querySelector('.cart-popup');
    if (!cartPopup) return;

    document.getElementById('cart-product-name').textContent = product.name;
    document.getElementById('cart-product-price').textContent = product.price;
    document.getElementById('cart-product-image').src = product.image;
    document.getElementById('cart-quantity').textContent = `Jumlah: ${product.quantity}`;

    const subtotal = product.quantity * parseInt(product.price.replace(/[^\d]/g, ''));
    document.getElementById('cart-subtotal').textContent = 'Rp ' + subtotal.toLocaleString();

    // Menambahkan event listener untuk tombol + dan -
    const plusButton = document.getElementById('increase-quantity');
    const minusButton = document.getElementById('decrease-quantity');
    const quantityElement = document.getElementById('cart-quantity');
    
    // Tombol + menambah kuantitas
    plusButton.addEventListener('click', () => {
        product.quantity++;
        updateCart(product, quantityElement);
    });
    
    // Tombol - mengurangi kuantitas
    minusButton.addEventListener('click', () => {
        if (product.quantity > 1) {
            product.quantity--;
            updateCart(product, quantityElement);
        }
    });

    cartPopup.classList.add('active');
}

function updateCart(product, quantityElement) {
    document.getElementById('cart-quantity').textContent = `Jumlah: ${product.quantity}`;
    const subtotal = product.quantity * parseInt(product.price.replace(/[^\d]/g, ''));
    document.getElementById('cart-subtotal').textContent = 'Rp ' + subtotal.toLocaleString();

    // Update localStorage jika ada perubahan kuantitas
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = product.quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelector('.cart-popup-close').addEventListener('click', () => {
    const cartPopup = document.querySelector('.cart-popup');
    cartPopup.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', function () {
    const addToCartButton = document.querySelector('.add-to-cart');
    const quantityInput = document.getElementById('quantity');

    if (addToCartButton && quantityInput) {
        addToCartButton.addEventListener('click', function () {
           
            addToCart('Gracie Bag', 'Rp 350.000.000', quantityInput.value, '/media/tas10.jpg');
            addToCart('Joline Bag', 'Rp 280.000.000', quantityInput.value, '/media/tas2.jpg');
            addToCart('Eloise Bag', 'Rp 450.000.000', quantityInput.value, '/media/tas1.jpg');
        });
    }
});
