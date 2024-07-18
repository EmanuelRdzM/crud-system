const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"USER",
    password:"YOUR_PASSWORD",
    database:"Your_DATABASE",
});

db.connect(error =>{
    if (error) {
        console.error('Error connecting to the database:', error.stack);
        return;
    }
    console.log('Connected to the database');
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query(
        'INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',
        [nombre,edad,pais,cargo,anios],
        (err,result)=>{
            if(err){
                console.log("error: "+err);
            }else{
                res.send("Empleado registrado con exito");
            }
        }
    );
});

app.get("/empleados",(req,res)=>{
    db.query(
        'SELECT * FROM empleados',
        (err,result)=>{
            if(err){
                console.log("error: "+err);
            }else{
                res.send(result);
            }
        }
    );
});

app.listen(3001,()=>{
    console.log('Corriendo en el purto 3001');
})