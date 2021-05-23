//import libraries
const express = require("express");
const app = express();
const morgan = require("morgan");

//import routes
const employees = require("./routes/employees");
const admins = require("./routes/admins");
const login = require("./routes/login");

//import middlewares
const cors = require("./middleware/cors");
const welcome = require("./middleware/welcome");
const notFound = require("./middleware/notFound");
const auth = require("./middleware/auth");

//use middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors);

//use routes
//public routes
app.get("/", welcome);
app.use("/login", login)
//private routes
app.use(auth);
app.use("/employees", employees);
app.use("/admins", admins);
app.use(notFound);

//run server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running . . .");
})