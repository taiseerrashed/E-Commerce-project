let fname = document.querySelector("#fname");
let lname = document.querySelector("#lname");
let email = document.querySelector("#email");
let password = document.querySelector("#pwd");
let registerBtn = document.querySelector("#submit");

registerBtn.addEventListener("click", register);

function register(e){
    e.preventDefault();
    if(fname.value == "" || lname.value == "" || email.value =="" || password.value == ""){
        alert("Please fill data");
    }else{
        localStorage.setItem("firstname", fname.value);
        localStorage.setItem("lastname", lname.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);

        setTimeout(() =>{
            window.location = "login.html";
        }, 1000);
    }
}