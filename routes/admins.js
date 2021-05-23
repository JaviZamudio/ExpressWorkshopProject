const express = require("express");
const admins = express.Router();
const db = require("../config/database");

//get all admins
admins.get("/", async (req, res) => {
    let query = "select * from admins";
    let rows = await db.query(query);

    res.json({code: 200, message: rows});
})

//add an employee
admins.post("/", async (req, res) => {
    let noAdmin = await db.query("Select Count (*) from admins");
    noAdmin = noAdmin[0]["Count (*)"] + 1;
    const {name, mail, password} = req.body;

    if(name && mail && password){
        let query = `INSERT INTO admins (id, name, mail, password)`;
        query += ` Values ("${noAdmin}", "${name}", "${mail}", "${password}")`;
        
        let rows = await db.query(query);
        
        if(rows.affectedRows == 1){
            res.status(200).json({code: 1, message: "Admin creado correctamente"});
        }
        else{
            console.log(query);
            console.log(rows);
            res.status(404).json({code: 2, message: "Hubo un error al crear el admin"});
        }   
    }
    else{
        res.status(404).json({code: 2, message: "Faltan datos por llenar"});
    }
})

//get employee by id
admins.get("/:id([0-9]{1,3})", async (req, res) => {
    const id = req.params.id;
    let query = "Select * from admins where id = " + id;

    const rows = await db.query(query);

    (rows[0]) ? res.status(200).json({code: 1, message: rows[0]}): res.status(404).json({code: 2, message: "No hay admins con ese id"});
})

//get employee by name
admins.get("/:name([A-Za-z]+)", async (req, res) => {
    const name = req.params.name.toLowerCase();

    let query = `Select * from admins where name = "${name}"`;

    const rows = await db.query(query);

    (rows[0]) ? res.status(200).json({code: 1, message: rows[0]}): res.status(404).json({code: 2, message: "No hay admins con ese nombre"});
})

//put employee by id
admins.put("/:id([0-9]{1,3})",  async (req, res) =>{
    const id = req.params.id;
    const {name, mail, password} = req.body;

    if(name && mail && password){
        let query = `Update admins set `;
        query += `name = "${name}", `;
        query += `mail = "${mail}", `;
        query += `password = "${password}" `;
        query += `where id = ${id}`;
        
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1){
            res.status(200).json({code: 200, message: "Admin actualizado correctamente"});
        }
        else{
            res.status(404).json({code: 404, message: `No se encontro el Admin con ese id`});
        }
    }
    else{
        res.status(404).json({code: 2, message: "Los datos deben estar completos"})
    }
})

//patch employee by id
admins.patch("/:id([0-9]{1,3})",  async (req, res) =>{
    let query = `Update admins set id = id`;

    const {name, mail, password} = req.body;

    if(name) query += `, name = "${name}"`;
    if(mail) query += `, mail = "${mail}"`;
    if(password) query += `, password = "${password}"`;
    query += ` where id = ${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        res.status(200).json({code: 200, message: "Admin actualizado correctamente"});
    }
    else{
        res.status(404).json({code: 404, message: `No se encontro el Admin con ese id`});
    }
})

//delete employee by id
admins.delete("/:id([0-9]{1,3})", async (req, res) => {
    let query = "Delete from admins where id = ";
    query += req.params.id;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        res.status(200).json({code: 200, message: "Admin borrado correctamente"});
    }
    else{
        res.status(404).json({code: 404, message: `No se encontro el Admin con ese id`});
    }
})

module.exports = admins;