//show cart

(function(){

	const cartInfo = document.getElementById("cart-info");
	const cart = document.getElementById("cart");

	cartInfo.addEventListener("click", function(){
 		cart.classList.toggle("show-cart");
	})
})();

(function(){

let total = [];
let cartItem;
let finalMoney;


const cartBtn = document.querySelectorAll(".store-item-icon");
cartBtn.forEach(function(btn){
btn.addEventListener('click', function(event){
//console.log(event.target);

if(event.target.parentElement.classList.contains('store-item-icon')){
		let fullPath = event.target.parentElement.previousElementSibling.src;
		let pos = fullPath.indexOf('img') + 3;
        let partPath = fullPath.slice(pos) ;



     const item = {};
	item.img = `img-cart${partPath}`;
        
	let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
	item.name = name;

	let price  = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
			
	let finalPrice = price.slice(1).trim();
 		item.price = finalPrice;

 	const cartItem = document.createElement("div");
	cartItem.classList.add("cart-item",
	"d-flex",
	"justify-content-between",
	"text-capitalize",
	"my-3"
	);
	cartItem.innerHTML= `
	<img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
           <div class="item-text">

            <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
             <span>$</span>
             <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
           </div>
          <a href="#" id="cart-item-remove" class="cart-item-remove">
         <i class="fas fa-trash"></i>
           </a>
          </div>`;

 const cart = document.getElementById('cart');
const total = document.querySelector('.cart-total-container');


cart.insertBefore(cartItem, total);
alert("item added to the cart");

 const removeBtn = document.querySelectorAll('.cart-item-remove')
            removeBtn.forEach (function (rBtn) {
                rBtn.addEventListener('click', removeCartItems);
            })
          
 	showTotals();
	}
	}); 
});

  function removeCartItems(e){
    let selectedItem = event.target.parentElement;

	finalMoney= (total)?(finalMoney -total.pop()).toFixed(2): 0;
    
    //Display Total Cart Items
    document.getElementById('item-count').textContent = total.length;
    
    //Display into Total
    document.getElementById('cart-total').textContent = finalMoney;

    selectedItem.remove();
  }


function showTotals(){
	
	const total = [];
	const items = document.querySelectorAll(".cart-item-price");

	items.forEach(function(item){
		total.push(parseFloat(item.textContent));
	});
	const totalMoney = total.reduce(function(total, item){
		total += item;
		return total;

	},0)
	const finalMoney =  totalMoney.toFixed(2);
	document.getElementById("cart-total").textContent = finalMoney;
	document.querySelector(".item-total").textContent=finalMoney;
	document.getElementById("item-count").textContent=total.length;
}


})();

// function removeItem() {
// 	var element = document.getElementById('cart');
// 	element.parentNode.removeChild(element);
// 	return false;
// }


var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



function myFunction() {
  document.getElementById("cart-item-remove").removeAttribute("cartItemS");
} 