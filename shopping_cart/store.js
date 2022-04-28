var removeCartItemButton =
  document.getElementsByClassName("cart-remove-button");
console.log(removeCartItemButton);
for (var i = 0; i < removeCartItemButton.length; i++) {
  var button = removeCartItemButton[i];
  button.addEventListener("click", removeCartItem);
}

var quantityInputs = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantityInputs.length; i++) {
  var input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

var addToCartButtons = document.getElementsByClassName('shop-items-button');
for( var i = 0; i < addToCartButtons.length; i++){
  var button = addToCartButtons[i]
  button.addEventListener('click', addToCartClicked)
}

document.getElementsByClassName('purchased-button')[0].addEventListener('click', purchaseCkicked)

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 0;
  }
  updateCartTotal();
}

function addToCartClicked(event){
  var button = event.target;
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('shop-items-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-items-price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('shop-items-image')[0].src
  console.log(title, price, imageSrc)
  addItemToCart( title, price, imageSrc)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-items-title')
  for(var i=0; i < cartItemNames.length; i++ ){
    if(cartItemNames[i].innerText == title){
      alert('This item is already added to your cart')
      return
    }
  }
  var cartRowContents = `
  <div class="cart-column">
    <img
      class="cart-items-image"
      src="${imageSrc}"
      width="100"
      height="100"
    />
    <span class="cart-items-title">${title}</span>
  </div>
  <span class="cart-item-price">${price}</span>
  <div class="cart-item-quantity">
    <input class="cart-quantity-input" type="number" value="1" />
    <button class="cart-remove-button" type="button">REMOVE</button>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('cart-remove-button')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-item-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("Rs", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "Rs." + total;
}

function purchaseCkicked(){
  alert('Thank you for purchasing items')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while(cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}