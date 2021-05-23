const e = require("express");
const express = require("express");
const employees = express.Router();
const db = require("../config/database");

//get all employees
employees.get("/", async (req, res) => {
    let query = "select * from employees";
    let rows = await db.query(query);

    res.json({code: 200, message: rows});
})

//add an employee
employees.post("/", async (req, res) => {
    let noEmployee = await db.query("Select Count (*) from employees");
    noEmployee = noEmployee[0]["Count (*)"] + 1;
    const {name, last_name, telephone, mail, address} = req.body;

    if(name && last_name && telephone && mail && address){
        let query = `INSERT INTO employees (id, name, last_name, telephone, mail, address)`;
        query += ` Values ("${noEmployee}", "${name}", "${last_name}", "${telephone}", "${mail}", "${address}")`;
        
        let rows = await db.query(query);
        
        if(rows.affectedRows == 1){
            res.status(200).json({code: 1, message: "Usuario creado correctamente"});
        }
        else{
            res.status(200).json({code: 4, message: "Hubo un error al crear el usuario"});
        }   
    }
    else{
        res.status(200).json({code: 3, message: "Faltan datos por llenar"});
    }
})

//get employee by id
employees.get("/:id([0-9]{1,3})", async (req, res) => {
    const id = req.params.id;
    let query = "Select * from employees where id = " + id;
    const rows = await db.query(query);

    (rows[0]) ? res.status(200).json({code: 1, message: rows[0]}): res.status(200).json({code: 2, message: "No hay empleados con ese id"});
})

//get employee by name
employees.get("/:name([A-Za-z]+)", async (req, res) => {
    const name = req.params.name.toLowerCase();

    let query = `Select * from employees where name = "${name}"`;

    const rows = await db.query(query);

    (rows[0]) ? res.status(200).json({code: 1, message: rows[0]}): res.status(200).json({code: 2, message: "No hay empleados con ese nombre"});
})

//put employee by id
employees.put("/:id([0-9]{1,3})",  async (req, res) =>{
    const id = req.params.id;
    const {name, last_name, telephone, mail, address} = req.body;

    if(name && last_name && telephone && mail && address){
        let query = `Update employees set `;
        query += `name = "${name}", `;
        query += `last_name = "${last_name}", `;
        query += `telephone = "${telephone}", `;
        query += `mail = "${mail}", `;
        query += `address = "${address}" `;
        query += `where id = ${id}`;
        
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1){
            res.status(200).json({code: 1, message: "Empleado actualizado correctamente"});
        }
        else{
            res.status(200).json({code: 2, message: `No se encontro el empleado con ese id`});
        }
    }
    else{
        res.status(200).json({code: 3, message: "Los datos deben estar completos"})
    }
})

//patch employee by id
employees.patch("/:id([0-9]{1,3})",  async (req, res) =>{
    let query = `Update employees set id = id`;

    const {name, last_name, telephone, mail, address} = req.body;

    if(name) query += `, name = "${name}"`;
    if(last_name) query += `, last_name = "${last_name}"`;
    if(telephone) query += `, telephone = "${telephone}"`;
    if(mail) query += `, mail = "${mail}"`;
    if(address) query += `, address = "${address}"`;
    query += ` where id = ${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        res.status(200).json({code: 1, message: "empleado actualizado correctamente"});
    }
    else{
        res.status(200).json({code: 2, message: `No se encontro el empleado con ese id`});
    }
})

//delete employee by id
employees.delete("/:id([0-9]{1,3})", async (req, res) => {
    let query = "Delete from employees where id = ";
    query += req.params.id;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        res.status(200).json({code: 1, message: "empleado borrado correctamente"});
    }
    else{
        res.status(200).json({code: 2, message: `No se encontro el empleado con ese id`});
    }
})

module.exports = employees;