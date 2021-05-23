window.onload = init;

var url = "http://localhost:3000/employees/";
var token = localStorage.getItem("token");

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
        var params = document.querySelector("#params").value;

        if(params != ""){
            url += params;
            var table_body = document.querySelector("#table_body");
            axios.get(url, headers).then((res) => {
                displayEmployee(res.data.message);
                params.value = "";
            }).catch((err) => {
                //
            })
        }
        else{
            alert("El campo de texto no puede estar vacio");
        }
    })
}

function displayEmployee(employee){
    var table_body = document.querySelector("#table_body");

    var innerHTML = 
    `<tr>\
        <td></td>\
        <td>\
            <table border="1" align="center">\
                <thead>\
                    <tr>\
                        <th>ID</th>\
                        <th>Nombre</th>\
                        <th>Apellido</th>\
                        <th>Telefono</th>\
                        <th>E-mail</th>\
                        <th>Direccion</th>\
                    </tr>\
                </thead>\
                <tbody>\
                    <tr>\
                        <td>${employee.id}</td>\
                        <td>${employee.name}</td>\
                        <td>${employee.last_name}</td>\
                        <td>${employee.telephone}</td>\
                        <td>${employee.mail}</td>\
                        <td>${employee.address}</td>\
                    </tr>\
                </tbody>\
            </table>\
        </td>\
        <td></td>\
    </tr>`

    table_body.innerHTML = innerHTML;
}

