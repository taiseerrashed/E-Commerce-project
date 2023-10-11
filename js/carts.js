let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");
let favouriteDom = document.querySelector(".favourites");
let totalPriceDiv = document.querySelector(".totalPrice") 
let totalPrice = 0

//display added products to cart page
function drawCartProducts(allProducts = []){
    totalPrice = 0
    if(JSON.parse(localStorage.getItem("productsInCart")).length === 0){
        noProductsDom.innerHTML = "There is no Items !!";
        totalPriceDiv.style.display ="none";
    }
    let products =JSON.parse(localStorage.getItem("productsInCart")) || allProducts;
    let y = products.map( (item) => {
        totalPrice += item.price * item.count;
        
        return `
            <div class="product-item">
                <div class="image">
                    <img src="${item.imageUrl}" alt="mobile">
                </div><hr>
                <div class="product-item-info">
                    <p>${item.category}</p>
                    <h4>${item.name}</h4>
                    
                    <div class="price">$${item.price}</div>
                </div>
                <div class="product-item-action">
                    <button class="remove-cart" id="removeFromCart" onClick ="removeFromCart(${item.id})">Remove</button>
                    <div>
                        <span class="count" >${item.count}</span>
                        <i class="fas fa-plus " onClick="increaseCount(${item.id})"></i>
                        <i class="fas fa-minus " onClick="decreaseCount(${item.id})"></i>
                    </div>
                </div>            
            </div>
        `;
    });
    productsDom.innerHTML = y.join("");
    displayTotalPrice();
}
drawCartProducts();

function removeFromCart(id){
    let productsInCart = localStorage.getItem("productsInCart");
    if(productsInCart){
        let items = JSON.parse(productsInCart);
        let filteredItems = items.filter((item)=> item.id !== id);
       
        localStorage.setItem("productsInCart" , JSON.stringify(filteredItems));
        drawCartProducts(filteredItems);
    }
}

// display favourite products
function drawFavProducts(allProducts = []){
    let favourits =JSON.parse(localStorage.getItem("productsInFav")) || allProducts;
    let y = favourits.map( (item) => {
        return `
            <div class="favourite-item">
                <div class="image">
                    <img src="${item.imageUrl}" alt="mobile">
                </div>
                <div class="favourite-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.category}</p>
                    
                    <i class="fas fa-heart" onClick = "removeFromFav(${item.id})"></i>
                </div>
                           
            </div>
        `;
    });
    favouriteDom.innerHTML = y.join("");
}
drawFavProducts();

function removeFromFav(id){
    let productsInFav = localStorage.getItem("productsInFav");
    if(productsInFav){
        let items = JSON.parse(productsInFav);
        let filteredItems = items.filter((item)=> item.id !== id);
       
        localStorage.setItem("productsInFav" , JSON.stringify(filteredItems));
        drawFavProducts(filteredItems);
    }
}

// display total price
function displayTotalPrice(){
    if(JSON.parse(localStorage.getItem("productsInCart")).length !== 0){
        totalPriceDiv.style.display= "block";
        totalPriceDiv.innerHTML = `<h3>Total Price =  $ ${totalPrice} </h3>`
    }
}
displayTotalPrice();

function increaseCount(id) {
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
  
    productsInCart = productsInCart.map((item) => {
      if (item.id === id) {
        item.count++;
      }
      return item;
    });
  
    localStorage.setItem("productsInCart" , JSON.stringify(productsInCart));
    drawCartProducts(productsInCart);
}
function decreaseCount(id){
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
    productsInCart = productsInCart.map((item) => {
        if (item.id === id) {
            if (item.count > 1) {
              item.count--;
            } else {
                productsInCart = productsInCart.filter((product) => {
                    return product.id !== id;
                });
            }
        }
        return item;
    });

    localStorage.setItem("productsInCart" , JSON.stringify(productsInCart));
    drawCartProducts(productsInCart);
}