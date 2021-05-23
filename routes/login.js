const express = require("express");
const jwt = require("jsonwebtoken");
const login = express.Router();
const db = require("../config/database");

login.post("/", async (req,res) => {
    const {mail, password} = req.body;

    const query = `Select * from admins where mail = "${mail}" and password = "${password}"`;
    const rows = await db.query(query);
    if(rows[0]){
        const token = jwt.sign({
            id: rows[0].id,
            mail: rows[0].mail
        }, "debugkey");
        res.status(200).json({code: 200, message: token});
    }
    else{
        res.status(200).json({code: 401, message: "Uruario y/o contraseña incorrectos"});
    }
})

module.exports = login;