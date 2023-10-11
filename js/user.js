let userInfo = document.querySelector("#user_info");
let userData = document.querySelector("#user");
let links = document.querySelector("#links");
let logOutBtn = document.querySelector("#logout");

if(localStorage.getItem("firstname") && localStorage.getItem("email")){
    links.remove();
    userInfo.style.display = "flex";
    userInfo.style.flexDirection = "row"
    userData.innerHTML= "Welcome " + localStorage.getItem("firstname");
}

logOutBtn.addEventListener("click", function(){
    localStorage.clear();
    setTimeout(()=>{
        window.location = "register.html";
    } , 1000 )
});