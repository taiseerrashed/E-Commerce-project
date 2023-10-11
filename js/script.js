// Define Variabls
let productsDom = document.querySelector(".products");
let products = productsDB;
let cartProductDivDom = document.querySelector(".carts-products div");
let shoppingCartIcon = document.querySelector(".shopping-cart");
let badgeDom = document.querySelector(".badge");
let cartProductMenu = document.querySelector(".carts-products");
let searchInput = document.getElementById("search");
let searchSelect = document.querySelector(".form-select");
// Event Listeners
searchSelect.addEventListener("change", searchByChange);
shoppingCartIcon.addEventListener("click", openCartMenu);

// Search by Change
function searchByChange() {
    const selectedOption = searchSelect.value;
    searchInput.value = "";
    searchInput.placeholder = selectedOption === "Search By Name" ? "Search by Name" : "Search by Category";
    searchInput.removeEventListener("input", searchByCategory);
    searchInput.removeEventListener("input", searchByName);
    searchInput.addEventListener("input", selectedOption === "Search By Name" ? searchByName : searchByCategory);
}
  
// Search by Name
function searchByName() {
    const searchText = searchInput.value.toLowerCase().trim();
    const filteredProducts = products.filter(item => item.name.toLowerCase().includes(searchText));
    displayFilteredProducts(filteredProducts);
}
  
// Search by Category
function searchByCategory() {
    const searchText = searchInput.value.toLowerCase().trim();
    const filteredProducts = products.filter(item => item.category.toLowerCase().includes(searchText));
    displayFilteredProducts(filteredProducts);
}

// Display Filtered Products
function displayFilteredProducts(filteredProducts) {
    let filteredProductsHtml = filteredProducts.map((item) => {
        return `
            <div class="product-item">
                <div class="image">
                    <img src="${item.imageUrl}" alt="mobile">
                </div><hr>
                <div class="product-item-info">
                    <p>${item.category}</p>
                    <h4>${item.name}</h4>
                    <div class="icons">
                        ${Array.from({ length: 5 }, () => `<i class="fas fa-star"></i>`).join("")}
                    </div>
                    <div class="price">${item.price}</div>
                </div>
                <div class="product-item-action">
                    <button class="add-to-cart" id="addCart"  onClick = "addedToCart(${item.id})">Add To Cart</button>
                    <i class="fas fa-heart fav" id ="addToFav" onClick = "addedToFav(${item.id})"></i>
                </div>            
            </div>
        `;
    });
    productsDom.innerHTML = filteredProductsHtml.join("");
}

// Display Products
let drawProducts;
(drawProducts = function (products = []){
    let y = products.map((item) =>{
        return `
            <div class="product-item">
                <div class="image">
                    <img src="${item.imageUrl}" alt="mobile">
                </div><hr>
                <div class="product-item-info">
                    <p>${item.category}</p>
                    <h4>${item.name}</h4>
                    <div class="icons">
                        ${Array.from({ length: 5 }, () => `<i class="fas fa-star"></i>`).join("")}
                    </div>
                    <div class="price">$${item.price}</div>
                </div>
                <div class="product-item-action">
                    <button class="add-to-cart" id="addCart"  onClick = "addedToCart(${item.id})">Add To Cart</button>
                    <i class="fas fa-heart fav" id ="addToFav" onClick = "addedToFav(${item.id})"></i>
                </div>            
            </div>
        `;
    });
    productsDom.innerHTML = y.join("");
 
})(JSON.parse(localStorage.getItem("products")) || products);

// Check if there is items in localstorage
let addedItem = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : [] ;
if(addedItem){
    addedItem.map((item) =>{
        cartProductDivDom.innerHTML += `
        <p>${item.name} <span class ="count">${item.count} 
            <i class="fas fa-plus " onClick="increaseCount(${item.id})"></i>
            <i class="fas fa-minus " onClick="decreaseCount(${item.id})"></i>
            </span>
        </p> `;
    });
    badgeDom.style.display = "block";
    badgeDom.innerHTML += addedItem.length;

    function drawCartProducts() {
        cartProductDivDom.innerHTML = "";
        addedItem.forEach((item) => {
          cartProductDivDom.innerHTML += `
            <p>${item.name} <span class ="count">${item.count} 
              <i class="fas fa-plus " onClick="increaseCount(${item.id})"></i>
              <i class="fas fa-minus " onClick="decreaseCount(${item.id})"></i>
            </span>
            </p> `;
        });
      
        // update count
        let cartProductItems = document.querySelectorAll(".carts-products div p");
        badgeDom.innerHTML = cartProductItems.length;
    }
}

// Add to cart
function addedToCart(id){
    if(localStorage.getItem("email")){
        let products = JSON.parse(localStorage.getItem("products")) || products;
        let product = products.find((item) => item.id === id);
        let isProductInCart = addedItem.some((i) => i.id === product.id);

        if (isProductInCart) {
            addedItem = addedItem.filter((p) => p.id !== product.id);
              
        } else {
            addedItem.push(product);
        }
      
        cartProductDivDom.innerHTML = "";
        addedItem.forEach((item) => {
        cartProductDivDom.innerHTML += `
            <p>${item.name} <span class ="count">${item.count} 
                <i class="fas fa-plus" onClick="increaseCount(${item.id})"></i>
                <i class="fas fa-minus" onClick="decreaseCount(${item.id})"></i>
                </span>
            </p>`
        });

        // Save Data
        localStorage.setItem("productsInCart", JSON.stringify(addedItem));

        // Add counter of Items
        let cartProductItems = document.querySelectorAll(".carts-products div p");
        badgeDom.style.display = "block";
        badgeDom.innerHTML = cartProductItems.length;
    } else{
        window.location = "login.html";
    }   
}
// Increase Count
function increaseCount(id) {
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
  
    productsInCart = productsInCart.map((item) => {
      if (item.id === id) {
        item.count++;
      }
      return item;
    });  
    localStorage.setItem("productsInCart" , JSON.stringify(productsInCart));

    addedItem = productsInCart;
    drawCartProducts();
}
// Decrease Count
function decreaseCount(id){
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
  
    productsInCart = productsInCart.map((item) => {
        if (item.id === id && item.count > 1) {
            item.count--;
        }
        return item;
    });
    localStorage.setItem("productsInCart" , JSON.stringify(productsInCart)); 

    addedItem = productsInCart;
    drawCartProducts();
}
// Get unique items in an array based on a filter type
function getUniqueArr(arr , filterType){
    let unique = arr
    .map((item) => item[filterType])
    .map((item, index, final) => final.indexOf(item) === index && index)
    .filter((item) => arr[item]).map((item) => arr[item]);

    return unique;
}

// Add to favourite
let favouritesItems = localStorage.getItem("productsInFav") ? JSON.parse(localStorage.getItem("productsInFav")) : [] ;
function addedToFav(id){
    if(localStorage.getItem("email")){
        let choosenItem = products.find((item) => item.id === id);
        favouritesItems = [...favouritesItems , choosenItem];
        let uniqueProducts = getUniqueArr(favouritesItems , "id");
        localStorage.setItem("productsInFav" , JSON.stringify(uniqueProducts));
    }
    else{
        window.location = "login.html";
    }   
}

// Change the button and icon style when added to cart/favourites
let addBtn = document.querySelectorAll(".add-to-cart");
addBtn.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("remove-cart");
        item.classList.toggle("add-to-cart");
        item.innerHTML = item.classList.contains("remove-cart") ? "Remove From Cart" : "Add To Cart";
    });
});

let addIconFav = document.querySelectorAll("#addToFav");
addIconFav.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("add-fav");
        item.classList.toggle("fav");
    });
});

// Open cart menu
function openCartMenu() {
    if (cartProductDivDom.innerHTML !== "") {
        cartProductMenu.style.display = cartProductMenu.style.display === "block" ? "none" : "block";
    }
}

// Display Scroll
let scrollBtn = document.querySelector("#scroll");
onscroll = function(){
    (this.scrollY >= 400)? scrollBtn.style.display = "block" : scrollBtn.style.display = "none";
}
scrollBtn.addEventListener("click" ,()=>{
    scroll({
        left : 0 ,
        top : 0 ,
        behavior : "smooth"
    })
})