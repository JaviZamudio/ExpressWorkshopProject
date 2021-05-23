window.onload = init;

function login(){

    const mail = document.querySelector("#mail").value;
    const password = document.querySelector("#password").value;

    console.log({mail,password});
    axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: {
            mail: mail,
            password: password
        }
    }).then(function(res){
        if(res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "employees.html";
        }
        else{
            alert("mail y/o contraseña incorrectos");
        }
    }).catch(err => {
        alert("Ha ocurrido un error interno inesperado :(")
    })
}

function init(){
    if(localStorage.getItem("token")) window.location.href = "employees.html";

    document.querySelector("#login").addEventListener("click", login)
}