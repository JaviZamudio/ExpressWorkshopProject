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

    axios.get(url, headers).then((res) => {
        displayEmployees(res.data.message);
    }).catch((err) => {
        //
    })
}

function displayEmployees(employees){
    var table_body = document.querySelector("#table_body");

    var innerHTML = "";

    for (const employee of employees) {
        const {id, name, last_name, telephone, mail, address} = employee;
        innerHTML += `<tr>`;
        innerHTML += `<td>${id}</td>`;
        innerHTML += `<td>${name}</td>`;
        innerHTML += `<td>${last_name}</td>`;
        innerHTML += `<td>${telephone}</td>`;
        innerHTML += `<td>${mail}</td>`;
        innerHTML += `<td>${address}</td>`;
        innerHTML += "</tr>";
    }

    table_body.innerHTML = innerHTML;
}