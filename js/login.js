let email = document.querySelector("#email");
let password = document.querySelector("#pwd")
let loginBtn = document.querySelector("#submit");

let getEmail= localStorage.getItem("email");
let getPassword = localStorage.getItem("password");

loginBtn.addEventListener("click" , login)
function login(e){
    e.preventDefault();
    if(getEmail && getPassword){
        if(email.value == "" || password.value == ""){
            alert("Please Fill Data");
        }else if(getEmail && getEmail.trim().toLowerCase() === email.value.trim().toLowerCase() && getPassword === password.value){
            setTimeout (() => {
                window.location = "index.html"
            }, 1000)
        }else{
            alert("Email or password is wrong, Please enter correct data!");
        }
    }else{alert("You should register first!");}
    
}