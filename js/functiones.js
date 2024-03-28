//Menu
const iconoMenu = document.querySelector('#icono-menu'),
    menu = document.querySelector('#menu');

iconoMenu.addEventListener('click', (e) =>{
    menu.classList.toggle('active');
    document.body.classList.toggle('opacity');

    const rutaActual = e.target.getAttribute('src');

    if(rutaActual == 'img/menu-icon.png') {
        e.target.setAttribute ('src', 'img/menu-icon.png');
    }else {
        e.target.setAttribute ('src', 'img/menu-icon.png');
    }
});

//Carrito
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add('active')
}

closeCart.onclick = () => {
    cart.classList.remove('active')
}

if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else {
    ready ();
}

function ready () {
    var reemoveCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < reemoveCartButtons.length; i++) {
        var button = reemoveCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantitiy");
        for(var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener("change", quantityChanged)
        }
        var addCart = document.getElementsByClassName("add-cart");
        for(var i = 0; i < addCart.length; i++) {
            var button = addCart[i];
            button.addEventListener("click", addCartClicked);
        }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    saveCartItem();
}

function quantityChanged(event) {
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartItem();
    updateCartIcon ();
}


function addCartClicked (event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('products-title')[0].innerText
    var price = shopProducts.getElementsByClassName('products-price')[0].innerText
    var productImg = shopProducts.getElementsByClassName('products-img')[0].src
    addProductToCart(title, price, productImg);
    updatetotal();
    saveCartItem();
    updateCartIcon ();
}

function addProductToCart (title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsName = cartItems.getElementsByClassName('cart-product-title');
    for(var i = 0; i <cartItemsName.length; i++){
        if (cartItemsName[i].innerText == title) {
            alert("Se agrego con exito al carrito");
            return;
        }
    }
    var cartBoxContent = `
    <img src="${productImg}" alt="tenis" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
         <div class="cart-price">${price}</div>
    <input type="number" name="" id="" value="1" class="cart-quantitiy">
 </div>
 <i class="bx bx-trash-alt cart-remove" ></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantitiy')[0]
    .addEventListener('change', quantityChanged);
    saveCartItem();
    updateCartIcon ();

}

function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantitiy")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total += price * quantity;

    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    localStorage.setItem('cartTotal', total)
}

function saveCartItem (){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItems = [];

    for (var i = 0; i <cartBoxes.length; i++) {
        cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var priceElement = cart.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantitiy')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0];

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartItems () {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for(var i = 0; i <cartItems.length; i++){
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName('cart-box');
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName('cart-quantitiy')[0];
            quantityElement.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem('cartTotal');
    if (cartTotal) {
        document.getElementsByClassName('total-price')[0].innerText = "$" + cartTotal;
    }
}

function updateCartIcon () {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var quantity = 0;

    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('cart-quantitiy')[0];
        quantity += parseInt(quantityElement.value);
    }
    var cartIcon = document.querySelector('#cart-icon');
    cartIcon.setAttribute('data-quantitiy', quantity);
}