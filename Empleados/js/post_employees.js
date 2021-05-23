window.onload = init;

var token = localStorage.getItem("token");
var url = "http://localhost:3000/employees";
var headers = {
    headers: {
        "Authorization" : "bearer " + token
    }
}

function init(){
    if(!token) window.location = "login.html";    

    document.querySelector("#employees").addEventListener("click", () => {
        window.location = "employees.html";
    })

    document.querySelector("#logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location = "login.html";
    })

    document.querySelector("#post").addEventListener("click", () => {
        var name = document.querySelector("#name").value;
        var last_name = document.querySelector("#last_name").value;
        var telephone = document.querySelector("#telephone").value;
        var mail = document.querySelector("#mail").value;
        var address = document.querySelector("#address").value;
        
        var data = {
                name,
                last_name,
                telephone,
                mail,
                address
        }

        axios.post(url, data, headers).then((res) => {
            alert(res.data.message);
            document.querySelector("#name").value = "";
            document.querySelector("#last_name").value = "";
            document.querySelector("#telephone").value = "";
            document.querySelector("#mail").value = "";
            document.querySelector("#address").value = "";
        }).catch((err) => {
            alert("Todos los datos deben estar completos");
        })
    })
}