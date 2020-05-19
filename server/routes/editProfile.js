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
        let query = `UPDATE usuarios SET nombre='${req.body.nombre}', apellido='${req.body.apellido}', password='${req.body.password}', email='${req.body.email}', tarjeta_titular="${req.body.titular}", tarjeta_dni="${req.body.dni}",\
         tarjeta_numero="${req.body.cardId}", tarjeta_ccv="${req.body.cardCod}", tarjeta_tipo_id=${req.body.tipo}, tarjeta_mes="${req.body.mesVencimiento}", tarjeta_anio="${req.body.anioVencimiento}" WHERE id_usuario='${req.body.id}'`;
         console.log(query)
        connection.query(query,function(err,rows,fields){
            if(err){
                console.log(err)
                res.status(500).send({mensaje: "El mail ya existe en el sistema"})
                return;
            }
            console.log(rows);
            res.json({newData: rows[0], mensaje:"Se actualizo correctamente"});
        })

    })

    module.exports = router;
