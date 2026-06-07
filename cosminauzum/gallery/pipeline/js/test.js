//Ad Items To Cart On Button Click
(function () {
let total = [];
let cartItem;
let finalMoney;
    // Adding the Product Item
    const cartBtn = document.querySelectorAll(".product-button");
    cartBtn.forEach (function (btn) {
        btn.addEventListener('click', function(event) {

            // Fetch Image 
            let fullPath = event.target.parentElement.previousElementSibling.children[0].src;
            let pos = fullPath.indexOf("Niels") + 5;
            let partPath = fullPath.slice(pos);

            // Fetch Product Name
            let productName = event.target.previousElementSibling.previousElementSibling.textContent;
					             
            // Fetch Product Cost
            let productCost = event.target.previousElementSibling.textContent;
            let finalPrice = productCost.slice(2).trim();

            // Initialize Item Description
            const item = {};
                item.img = `..${partPath}`;
                item.name = productName;
                item.price = finalPrice;

            // Create the List Item
            cartItem = document.createElement('li');
            cartItem.classList.add('product-cart-item');
            cartItem.innerHTML = `
                <img src="${item.img}" alt="" class="cart-img">
                <div class="cart-text">
                    <h3> ${item.name} </h3>
                    <p class="price">$${item.price}</p>
                </div>
                <i class="fas fa-times remove-product">remove button</i> 
            `;

            // Insert Product Item Into Cart as a List Item
            const cartList = document.querySelector('.cart-list'); 
            cartList.appendChild(cartItem); 
            alert('Item added to cart.');

            // Remove "No Products in Cart" Text if there is Products
            let noProduct = document.querySelector('.no-product');
            const cartHeight = document.querySelector('.cart-list').offsetHeight;
            if (cartHeight >= 79) {
                noProduct.style.display = 'none';
            } else {
                noProduct.style.display = 'flex';
            }

            // Remove Product List on Remove Button Click -- !DOES NOT WORK! --
            const removeBtn = document.querySelectorAll('.remove-product')
            removeBtn.forEach (function (rBtn) {
                rBtn.addEventListener('click', removeCartItems);
            })
           
            // Update Total
            showTotals();

        });
    });

  function removeCartItems(e){
    let selectedItem = event.target.parentElement;

	finalMoney= (total)?(finalMoney -total.pop()).toFixed(2): 0;
    
    //Display Total Cart Items
    document.querySelector('.item-count').textContent = total.length;
    
    //Display into Total
    document.querySelector('.total-price h3').textContent = `$${finalMoney}`;

    selectedItem.remove();
  }

  // Showing the Total Price
  function showTotals () {
    total = [];
    const items = document.querySelectorAll('.price');

    // Fetch Prices As Numbers Into Array
    items.forEach (function (item) {
      itemCartPriceDollar = item.textContent;
      itemCartPrice = itemCartPriceDollar.slice(1); 
      total.push(parseFloat(itemCartPrice));
    }); 

    // Add the Prices
    const totalMoney = total.reduce(function (total, item) {
      total += item;
      return total;
    }, 0); 
    finalMoney = totalMoney.toFixed(2);

    // Display into Total
    document.querySelector('.total-price h3').textContent = `$${finalMoney}`;
    document.querySelector('.item-count').textContent = total.length;
  }

}) ();