window.onload = init;

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

    document.querySelector("#put").addEventListener("click", () => {
        var id = document.querySelector("#id").value;
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

        if(id){
            var url = "http://localhost:3000/employees/" + id;
            
            axios.put(url, data, headers).then((res) => {
                const code = res.data.code;
                const message = res.data.message; 
                if(code == 1){
                    alert(message)
                    document.querySelector("#id").value = "";
                    document.querySelector("#name").value = "";
                    document.querySelector("#last_name").value = "";
                    document.querySelector("#telephone").value = "";
                    document.querySelector("#mail").value = "";
                    document.querySelector("#address").value = "";
                }
                else if(code == 2){
                    alert(message);
                    document.querySelector("#id").value = "";
                }
                else{
                    alert(message);
                }
            }).catch((err) => {
                //
            })
        }
    })
}