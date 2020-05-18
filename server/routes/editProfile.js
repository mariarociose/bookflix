var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var connection = db.connection;

    router.post("/",function(req,res){
        console.log(req);
        console.log(req.body.id);
        //UPDATE contacts SET last_name = ‘pepe’ WHERE id = 1; 
        let query = `UPDATE usuarios SET nombre='${req.body.nombre}', apellido='${req.body.apellido}', password='${req.body.password}', email='${req.body.email}'WHERE id_usuario='${req.body.id}'`;

        connection.query(query,function(err,rows,fields){
            if(err){
                console.log(err)
                res.status(500).send("Hubo un error")
                return;
            }
            console.log(rows);
            res.json({newData: rows[0], mensaje:"Se actualizo correctamente"});
        })
    
    })
    
    module.exports = router;
        