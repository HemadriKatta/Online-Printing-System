/*Custom Design */

function loadFile(event) {
    var image = document.getElementById('upload-output');
    image.src = URL.createObjectURL(event.target.files[0]);
}




let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

cartIcon.onclick = ()=>{
    cart.classList.add('active');
};

closeCart.onclick = ()=>{
    cart.classList.remove('active');
};


if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded',ready);
}else{
    ready();
}


function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for(var i=0; i<removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    var quantityInputs= document.getElementsByClassName('cart-quantity');
    for(var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }
    //Add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for(var i=0; i<addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Now
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}

function buyButtonClicked(){
    alert("Order Placed Successfully");
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <=0){
        input.value = 1;
    }
    updatetotal();
}

//Add to cart
function addCartClicked(event) {
    // Check if the uploaded design is available
    var uploadedImage = document.getElementById('upload-output');
    if (uploadedImage.src !== '') {
        productImg = uploadedImage.src;
        var button = event.target;
        var shopProducts = button.parentElement;
        var title = shopProducts.getElementsByClassName('upload-title')[0].innerText;
        var price = shopProducts.getElementsByClassName('price')[0].innerText;
        
    }else{
        var button = event.target;
        var shopProducts = button.parentElement;
        var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
        var price = shopProducts.getElementsByClassName('price')[0].innerText;
        var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    }

    

    addProductToCart(title, price, productImg);
    updatetotal();
}


function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames= cartItems.getElementsByClassName('cart-product-title');
    for(var i=0; i<cartItemsNames.length; i++){
        if(cartItemsNames[i].innerHTML == title){
            alert("Already Added");
            
            return;
        }
    }
    var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <label for="size">Size:</label>
                            <select class="size">
                                <option value="small">12x15</option>
                                <option value="medium">16x20</option>
                                <option value="large">20x24</option>
                            </select>
                            <label for="material">Material:</label>
                            <select class="material">
                                <option value="coated">Coated</option>
                                <option value="uncoated">Uncoated</option>
                                <option value="glossy">Glossy</option>
                                <option value="matte">Matte</option>
                            </select>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class='bx bxs-trash-alt cart-remove' ></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click',removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
}


//Update total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i=0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];


        var sizeElement = cartBox.querySelector('select.size')
        var materialElement = cartBox.querySelector('select.material');

        var sizePrices={
            'small' : 200,
            'medium' : 350,
            'large' : 500
        };

        var materialPrices={
            'coated' : 100,
            'uncoated' :50,
            'glossy' : 200,
            'matte' :150
        }

        var selectedSize = sizeElement.value;
        var selectedMaterial = materialElement.value;

        var sizePrice = sizePrices[selectedSize];
        var materialPrice = materialPrices[selectedMaterial];



        var price = parseFloat(priceElement.innerText.replace('₹',''));
        
        var quantity = quantityElement.value;
        
        total = total + (sizePrice+ materialPrice + price) * quantity;
        
    }
        
        document.getElementsByClassName("total-price")[0].innerText = '₹'+total;
    
}


// Pagination

document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product-box');
    const itemsPerPage = 8;
    const numPages = Math.ceil(products.length / itemsPerPage);
    let currentPage = 1;

    function showPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        products.forEach((product, index) => {
            if (index >= startIndex && index < endIndex) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    function createPaginationLinks() {
        const paginationContainer = document.querySelector('.pagination');

        // Previous button
        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.textContent = '« Previous';
        prevButton.classList.add('prev');
        prevButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });
        paginationContainer.appendChild(prevButton);

        // Page links
        for (let i = 1; i <= numPages; i++) {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = i;

            link.addEventListener('click', function(event) {
                event.preventDefault();
                currentPage = i;
                showPage(currentPage);
            });

            paginationContainer.appendChild(link);
        }

        // Next button
        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.textContent = 'Next »';
        nextButton.classList.add('next');
        nextButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (currentPage < numPages) {
                currentPage++;
                showPage(currentPage);
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    createPaginationLinks();
    showPage(1); // Show the first page by default
});




function searchImages() {
    // Get input value and convert to lowercase
    var input, filter, productBoxes, titles, i;
    input = document.getElementById('searchInput').value.toLowerCase();
    // Get all product boxes
    productBoxes = document.querySelectorAll('.product-box');
    
    // Loop through all product boxes
    for (i = 0; i < productBoxes.length; i++) {
        // Get title text and convert to lowercase
        titles = productBoxes[i].getElementsByClassName('product-title')[0].innerText.toLowerCase();
        // If title matches input, display block, else, display none
        if (titles.indexOf(input) > -1) {
            productBoxes[i].style.display = "";
        } else {
            productBoxes[i].style.display = "none";
        }
    }
}