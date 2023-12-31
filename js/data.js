// Define Products
let productsDB = [
    {
        id: 1,
        category: "Mobile",
        name: "Xiaomi Redmi Note 9",
        price: "199",
        imageUrl: "images/51fAmmSJcUL._AC_UY218_.jpg",
        count : 1,
    },
    {
        id: 2,
        category: "Smartwatch",
        name: "Apple Watch Series 7",
        price: "399",
        imageUrl: "images/71XohCtGXHL._AC_UY218_.jpg",
        count : 1,
    },
    {
        id: 3,
        category: "Tablet",
        name: "iPad Pro (2021)",
        price: "799",
        imageUrl: "images/81MF389-9gS._AC_UY218_.jpg",
        count : 1,
    },
    {
        id: 4,
        category: "Laptop",
        name: "Dell XPS 13",
        price: "999",
        imageUrl: "images/710+gleyyaL._AC_UY218_.jpg",
        count : 1,
    },
    {
        id: 5,
        category: "Smartwatch",
        name: "Huawei Watch GT 3",
        price: "349",
        imageUrl: "images/61bWecCyfjL._AC_UY218_.jpg",
        count : 1,
    },
    {
        id: 6,
        category: "Tablet",
        name: "Huawei MatePad Pro",
        price: "599",
        imageUrl: "images/71QNWG1NklL._AC_UY218_.jpg",
        count : 1,
    },
    {
        id: 7,
        category: "Mobile",
        name: "Samsung Galaxy S21",
        price: "799",
        imageUrl: "images/61ZNIHIEUqL._AC_UY218_.jpg",
        count : 1,
    },
    {
        id: 8,
        category: "Laptop",
        name: "HP Spectre x360",
        price: "1099",
        imageUrl: "images/718ntMAOGIL._AC_UY218_.jpg",
        count : 1,
    },
    {
        id: 9,
        category: "Smartwatch",
        name: "Fitbit Versa 3",
        price: "249",
        imageUrl: "images/61CZSoSnVPL._AC_UY218_.jpg",
        count : 1,
    },
];
localStorage.setItem("products", JSON.stringify(productsDB));
