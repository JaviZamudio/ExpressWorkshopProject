window.onload = init;

function init(){
    if(!localStorage.getItem("token")) window.location = "login.html";


    document.querySelector("#logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location = "login.html";
    })

    document.querySelector("#employees").addEventListener("click", () => {
        window.location = "employees.html";
    })

    document.querySelector("#admins").addEventListener("click", () => {
        window.location = "admins.html";
    })
}